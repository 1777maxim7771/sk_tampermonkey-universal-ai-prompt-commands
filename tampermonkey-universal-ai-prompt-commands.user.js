// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands SK
// @namespace    local.tampermonkey.universal.ai.prompt.commands.sk
// @version      1.0.0
// @description  Nahrádza krátke príkazy SK1-SK10 pripravenými AI promptmi v AI chatoch.
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // Slovenská verzia. Nahrádza sa iba presný príkaz úplným promptom.
    const COMMANDS = {
        'SK1': `Prelož poskytnutý text do slovenčiny úplne a presne. Zachovaj význam, poradie informácií, mená, dátumy, sumy, čísla dokumentov, organizácie a dôležité formulácie. Nepridávaj vlastné závery a neskracuj obsah.`,
        'SK2': `Zhrň poskytnutý text po slovensky podľa významu a kontextu. Vysvetli, o čo ide, kto komu píše, aká je hlavná téma a aké žiadosti, rozhodnutia, dátumy, lehoty, sumy alebo dôležité detaily sú uvedené.`,
        'SK3': `Vytvor po slovensky veľmi krátké tematické zhrnutie tohto listu, striktne v jednom riadku. Uveď odosielateľa, tému, čo sa oznamuje alebo požaduje a aké dátumy, lehoty, sumy, dokumenty alebo kroky sú dôležité.`,
        'SK4': `Prelož poskytnutý text do jednoduchej a zrozumiteľnej nemčiny na úrovni A2-B1. Formuluj text zdvorilo, úradne a gramaticky správne. Zachovaj význam, mená, dátumy, sumy, adresy, organizácie a dôležité detaily.`,
        'SK5': `Oprav poskytnutý slovenský text. Urob ho gramaticky správny, jasný, logický a prirodzený, ale zachovaj pôvodný význam. Odstráň chyby, opakovania a nevhodné formulácie. Nepridávaj fakty, ktoré v pôvodnom texte nie sú.`,
        'SK6': `Napíš krátku, zdvorilú a oficiálnu odpoveď na tento list v slovenčine. Reaguj vecne a konkrétne, bez zbytočných viet. Ak je potrebné, potvrď prijatie, požiadaj o upresnenie, uveď dokumenty alebo oznám požadované informácie.`,
        'SK7': `Vysvetli po slovensky jednoduchými slovami, čo tento text znamená. Analyzuj kontext, kto píše, komu, k akej téme, čo sa požaduje, čo treba urobiť a aké dátumy, lehoty, sumy, dokumenty alebo podmienky sú dôležité.`,
        'SK8': `Vyber z textu všetky dôležité fakty a štruktúrovane ich uveď po slovensky. Samostatne uveď osoby, organizácie, adresy, dátumy, lehoty, sumy, čísla dokumentov, požiadavky, rozhodnutia, povinnosti, spomenuté dokumenty a ďalšie kroky. Nevymýšľaj informácie.`,
        'SK9': `Vytvor po slovensky jasný zoznam potrebných krokov podľa tohto textu. Uveď, čo treba urobiť, aké dokumenty pripraviť, komu odpovedať, kam sa obrátiť, aké lehoty dodržať a na čo si dať pozor. Zoraď kroky podľa priority.`,
        'SK10': `Na základe poskytnutého textu napíš zdvorilý oficiálny list v jednoduchej nemčine na úrovni A2-B1. Zachovaj mená, dátumy, sumy, adresy, organizácie, čísla dokumentov a okolnosti. List rozdeľ na oslovenie, krátke vysvetlenie, hlavnú žiadosť a záver. Ukonči: Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea', 'input[type="text"]', 'input[type="search"]', '[contenteditable="true"]', '[contenteditable="plaintext-only"]', '[role="textbox"]'];
    function isEditableElement(element) { if (!element || !element.matches) return false; if (element.disabled || element.readOnly) return false; const tagName = element.tagName ? element.tagName.toLowerCase() : ''; const inputType = (element.getAttribute('type') || '').toLowerCase(); if (tagName === 'input' && !['text', 'search'].includes(inputType)) return false; return EDITABLE_SELECTORS.some(selector => element.matches(selector)); }
    function findEditableElement(target) { if (!target) return null; if (isEditableElement(target)) return target; if (target.closest) { const element = target.closest(EDITABLE_SELECTORS.join(',')); if (isEditableElement(element)) return element; } return null; }
    function getText(element) { const tagName = element.tagName ? element.tagName.toLowerCase() : ''; return tagName === 'textarea' || tagName === 'input' ? element.value || '' : element.innerText || element.textContent || ''; }
    function normalizeCommand(text) { return String(text || '').trim().replace(/\s+/g, '').toUpperCase(); }
    function dispatchInputEvents(element, text) { try { element.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'insertReplacementText', data: text })); } catch (error) { element.dispatchEvent(new Event('input', { bubbles: true })); } element.dispatchEvent(new Event('change', { bubbles: true })); }
    function setCursorToEnd(element) { element.focus(); if ('selectionStart' in element) { const length = element.value.length; element.setSelectionRange(length, length); return; } const range = document.createRange(); const selection = window.getSelection(); range.selectNodeContents(element); range.collapse(false); selection.removeAllRanges(); selection.addRange(range); }
    function replaceText(element, newText) { const tagName = element.tagName ? element.tagName.toLowerCase() : ''; element.focus(); if (tagName === 'textarea' || tagName === 'input') { element.value = newText; } else { try { const range = document.createRange(); const selection = window.getSelection(); range.selectNodeContents(element); selection.removeAllRanges(); selection.addRange(range); document.execCommand('insertText', false, newText); } catch (error) { element.textContent = newText; } } setCursorToEnd(element); dispatchInputEvents(element, newText); }
    function showNotification(message) { const oldBox = document.getElementById('tm-ai-prompt-commands-notification'); if (oldBox) oldBox.remove(); const box = document.createElement('div'); box.id = 'tm-ai-prompt-commands-notification'; box.textContent = message; box.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:999999;background:#111;color:#fff;padding:12px 18px;border-radius:10px;font:14px Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.35);max-width:420px;line-height:1.4'; document.body.appendChild(box); setTimeout(() => box.remove(), 2200); }
    function checkAndReplace(target) { const editable = findEditableElement(target); if (!editable) return; const command = normalizeCommand(getText(editable)); if (!Object.prototype.hasOwnProperty.call(COMMANDS, command)) return; replaceText(editable, COMMANDS[command]); showNotification(`Príkaz ${command} bol nahradený pripraveným AI promptom`); }
    document.addEventListener('input', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('keyup', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('paste', event => setTimeout(() => checkAndReplace(event.target), 50), true);
})();
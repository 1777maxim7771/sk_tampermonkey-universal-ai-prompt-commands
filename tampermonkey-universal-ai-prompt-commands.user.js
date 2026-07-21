// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands SK
// @namespace    local.tampermonkey.universal.ai.prompt.commands.sk
// @version      1.0.0
// @description  Tampermonkey skript na nahradenie krátkych príkazov pripravenými AI promptmi v AI chatoch.
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // Localized commands: replacement occurs only for an exact command.
    const COMMANDS = {
        'SK1': `Prelož celý poskytnutý text přesně do slovenčiny. Zachovaj význam, pořadí informací, jména, data, částky, čísla dokumentů, organizace a důležité formulace. Nepřidávej závěry, nezkracuj a neměň obsah.`,

        'SK2': `Zhrň poskytnutý text v slovenčine podle významu a kontextu. Vysvětli téma, účastníky a hlavní obsah. Samostatně uveď požadavky, žádosti, rozhodnutí, data, lhůty, částky a důležité podrobnosti. Piš jednoduše a stručně.`,

        'SK3': `Vytvor v slovenčine krátké tematické shrnutí dopisu přesně na jeden řádek. Uveď odesílatele, téma, sdělení či požadavek a důležitá data, lhůty, částky, dokumenty nebo kroky.`,

        'SK4': `Prelož poskytnutý text do jednoduché a srozumitelné němčiny na úrovni A2-B1. Text má být zdvořilý, úřední a gramaticky správný. Zachovaj význam, data, jména, částky, adresy, organizace a podrobnosti.`,

        'SK5': `Oprav poskytnutý slovenský text. Uprav jej gramaticky, srozumitelně a logicky, ale zachovej původní význam. Odstraň chyby, opakování a nevhodné formulace. U dopisu použij zdvořilý a úřední tón. Nepřidávej fakta.`,

        'SK6': `Napíš krátkou, zdvořilou a úřední odpověď na tento dopis v jednoduché němčině úrovně A2-B1. Odpověz věcně a správně formuluj potvrzení či žádosti o dokumenty nebo vysvětlení. Ukonči: Mit freundlichen Grüßen`,

        'SK7': `Vysvětli jednoduchými slovy v slovenčine, co text znamená. Uveď, kdo píše, akej veci sa týka, co chce, co je třeba udělat a jaké jsou důležité lhůty, termíny, částky, dokumenty nebo podmínky. Urči, zda jde o požadavek, varování, rozhodnutí či informaci.`,

        'SK8': `Získej z textu všechny důležité skutečnosti a uspořádej je v slovenčine: osoby, organizace, adresy, data, lhůty, částky, čísla dokumentů, požadavky, rozhodnutí, povinnosti, dokumenty a další kroky. Nic nevymýšlej; při chybějícím údaji napiš „neuvedeno“.`,

        'SK9': `Sestav v slovenčine jasný seznam kroků podle textu. Uveď potřebné dokumenty, komu odpovědět, kam se obrátit, termíny a důležité body. Rozděl: naléhavé, důležité, může počkat. Uveď otázky k objasnění.`,

        'SK10': `Na základě textu napiš zdvořilý úřední dopis v jednoduché němčině úrovně A2-B1. Zachovaj všechna důležitá fakta. Struktura: oslovení, situace, hlavní žádost nebo sdělení, případná žádost o potvrzení či vysvětlení, závěr. Ukonči: Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea','input[type="text"]','input[type="search"]','[contenteditable="true"]','[contenteditable="plaintext-only"]','[role="textbox"]'];
    function isEditableElement(element) {
        if (!element || !element.matches || element.disabled || element.readOnly) return false;
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        const inputType = (element.getAttribute('type') || '').toLowerCase();
        if (tagName === 'input' && !['text','search'].includes(inputType)) return false;
        return EDITABLE_SELECTORS.some(selector => element.matches(selector));
    }
    function findEditableElement(target) {
        if (!target) return null;
        if (isEditableElement(target)) return target;
        const element = target.closest ? target.closest(EDITABLE_SELECTORS.join(',')) : null;
        return isEditableElement(element) ? element : null;
    }
    function getText(element) {
        const tagName = element?.tagName?.toLowerCase() || '';
        return tagName === 'textarea' || tagName === 'input' ? (element.value || '') : (element?.innerText || element?.textContent || '');
    }
    function normalizeCommand(text) { return text.trim().replace(/\s+/g, '').toUpperCase(); }
    function dispatchInputEvents(element,text) {
        try { element.dispatchEvent(new InputEvent('input',{bubbles:true,cancelable:true,inputType:'insertReplacementText',data:text})); }
        catch (_) { element.dispatchEvent(new Event('input',{bubbles:true})); }
        element.dispatchEvent(new Event('change',{bubbles:true}));
    }
    function replaceText(element,newText) {
        const tagName=element.tagName?.toLowerCase() || ''; element.focus();
        if (tagName==='textarea' || tagName==='input') { element.value=newText; element.setSelectionRange(newText.length,newText.length); dispatchInputEvents(element,newText); return; }
        try { const range=document.createRange(), selection=window.getSelection(); range.selectNodeContents(element); selection.removeAllRanges(); selection.addRange(range); document.execCommand('insertText',false,newText); }
        catch (_) { element.textContent=newText; }
        dispatchInputEvents(element,newText);
    }
    function showNotification(message) {
        document.getElementById('tampermonkey-universal-ai-prompt-commands-notification')?.remove();
        const box=document.createElement('div'); box.id='tampermonkey-universal-ai-prompt-commands-notification'; box.textContent=message;
        Object.assign(box.style,{position:'fixed',right:'20px',bottom:'20px',zIndex:'999999',background:'#111',color:'#fff',padding:'12px 18px',borderRadius:'10px',fontSize:'14px',fontFamily:'Arial, sans-serif',boxShadow:'0 4px 12px rgba(0,0,0,.35)',maxWidth:'420px',lineHeight:'1.4'});
        document.body.appendChild(box); setTimeout(()=>box.remove(),2200);
    }
    function checkAndReplace(target) {
        const editable=findEditableElement(target); if (!editable) return;
        const command=normalizeCommand(getText(editable)); if (!Object.prototype.hasOwnProperty.call(COMMANDS,command)) return;
        replaceText(editable,COMMANDS[command]); showNotification("Príkaz {cmd} bol nahradený pripraveným promptom".replace('{cmd}',command));
    }
    document.addEventListener('input',event=>setTimeout(()=>checkAndReplace(event.target),20),true);
    document.addEventListener('keyup',event=>setTimeout(()=>checkAndReplace(event.target),20),true);
    document.addEventListener('paste',event=>setTimeout(()=>checkAndReplace(event.target),50),true);
})();

// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands SK
// @namespace    local.tampermonkey.universal.ai.prompt.commands.sk
// @version      1.1.0
// @description  Slovenská verzia: nahrádza univerzálne spúšťače Q1-Q10 pripravenými AI promptmi pre rýchle zadávanie v AI chatoch
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function(){'use strict';
/* Účel: rýchlejšia práca s ChatGPT, Gemini, Claude, Copilot a ďalšími AI chatmi. Q1-Q10 sú univerzálne spúšťače a možno ich zmeniť na vlastné slová alebo frázy. */
const COMMANDS={
'Q1':`Prelož poskytnutý text úplne a presne do slovenčiny.
Zachovaj význam, poradie informácií, mená, dátumy, sumy, čísla dokumentov, názvy organizácií a dôležité formulácie.
Nepridávaj vlastné závery, text neskracuj a nemeň obsah.`,
'Q2':`Zhrň poskytnutý text po slovensky podľa významu a kontextu.
Vysvetli, o čom text je, kto komu píše, aká je hlavná téma a aké požiadavky, žiadosti, rozhodnutia, dátumy, lehoty, sumy alebo dôležité detaily sú uvedené.`,
'Q3':`Vytvor krátke tematické zhrnutie listu po slovensky presne v jednom riadku.
Uveď odosielateľa, tému, čo sa oznamuje alebo požaduje a aké dátumy, lehoty, sumy, dokumenty alebo kroky sú dôležité.`,
'Q4':`Prelož poskytnutý text do jednoduchej a zrozumiteľnej nemčiny na úrovni A2-B1.
Text má byť zdvorilý, oficiálny a gramaticky správny.
Zachovaj pôvodný význam, dátumy, mená, sumy, adresy, organizácie a dôležité detaily.`,
'Q5':`Oprav poskytnutý slovenský text.
Urob ho gramaticky správny, jasný a logický, ale zachovaj pôvodný význam.
Odstráň chyby, opakovania, nevhodné formulácie a príliš hovorové časti.
Nepridávaj fakty, ktoré nie sú v pôvodnom texte.`,
'Q6':`Napíš krátku, zdvorilú a oficiálnu odpoveď na tento list po slovensky.
Odpoveď má byť jasná a vecná, bez zbytočných viet.
Ak treba potvrdiť prijatie, objasniť dokumenty, požiadať o vysvetlenie alebo oznámiť informáciu, formuluj to správne.`,
'Q7':`Vysvetli po slovensky jednoduchými slovami, čo tento text znamená.
Analyzuj kontext: kto píše, v akej veci, čo sa požaduje, čo treba urobiť a aké lehoty, dátumy, sumy, dokumenty alebo podmienky sú dôležité.`,
'Q8':`Vyber z poskytnutého textu všetky dôležité fakty a štruktúruj ich po slovensky.
Uveď osobitne: osoby, organizácie, adresy, dátumy, lehoty, sumy, čísla dokumentov, požiadavky, rozhodnutia, povinnosti, spomenuté dokumenty a ďalšie kroky.
Nevymýšľaj informácie. Ak niečo chýba, napíš: neuvedené.`,
'Q9':`Vytvor po slovensky jasný zoznam krokov, ktoré treba na základe tohto textu vykonať.
Urči, čo treba urobiť, aké dokumenty pripraviť, komu odpovedať, kam sa obrátiť, aké lehoty dodržať a na čo si dať pozor.
Rozdeľ kroky podľa priority: naliehavé, dôležité, možné neskôr.`,
'Q10':`Vytvor na základe poskytnutého textu zdvorilý oficiálny list v nemčine.
List má byť jednoduchý, zrozumiteľný a správny, úroveň A2-B1.
Zachovaj všetky dôležité fakty: mená, dátumy, sumy, adresy, organizácie, čísla dokumentov a okolnosti.
Na konci uveď: Mit freundlichen Grüßen`};
const S=['textarea','input[type="text"]','input[type="search"]','[contenteditable="true"]','[contenteditable="plaintext-only"]','[role="textbox"]'];
function ie(e){if(!e||!e.matches)return false;if(e.disabled||e.readOnly)return false;const t=e.tagName?e.tagName.toLowerCase():'';const y=(e.getAttribute('type')||'').toLowerCase();if(t==='input'&&!['text','search'].includes(y))return false;return S.some(s=>e.matches(s));}
function fe(t){if(!t)return null;if(ie(t))return t;if(t.closest){const e=t.closest(S.join(','));if(ie(e))return e;}return null;}
function gt(e){const t=e.tagName?e.tagName.toLowerCase():'';return(t==='textarea'||t==='input')?(e.value||''):(e.innerText||e.textContent||'');}
function nc(x){return String(x||'').trim().replace(/\s+/g,'').toUpperCase();}
function end(e){e.focus();const t=e.tagName?e.tagName.toLowerCase():'';if(t==='textarea'||t==='input'){const l=e.value.length;e.setSelectionRange(l,l);return;}const r=document.createRange(),s=window.getSelection();r.selectNodeContents(e);r.collapse(false);s.removeAllRanges();s.addRange(r);}
function ev(e,text){try{e.dispatchEvent(new InputEvent('input',{bubbles:true,cancelable:true,inputType:'insertReplacementText',data:text}));}catch(_){e.dispatchEvent(new Event('input',{bubbles:true}));}e.dispatchEvent(new Event('change',{bubbles:true}));}
function rt(e,text){const t=e.tagName?e.tagName.toLowerCase():'';e.focus();if(t==='textarea'||t==='input'){e.value=text;end(e);ev(e,text);return;}try{const r=document.createRange(),s=window.getSelection();r.selectNodeContents(e);s.removeAllRanges();s.addRange(r);document.execCommand('insertText',false,text);}catch(_){e.textContent=text;}end(e);ev(e,text);}
function note(m){const o=document.getElementById('tampermonkey-universal-ai-prompt-commands-notification');if(o)o.remove();const b=document.createElement('div');b.id='tampermonkey-universal-ai-prompt-commands-notification';b.textContent=m;b.style.cssText='position:fixed;right:20px;bottom:20px;z-index:999999;background:#111;color:#fff;padding:12px 18px;border-radius:10px;font:14px Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.35)';document.body.appendChild(b);setTimeout(()=>b.remove(),2200);}
function cr(t){const e=fe(t);if(!e)return;const c=nc(gt(e));if(!Object.prototype.hasOwnProperty.call(COMMANDS,c))return;rt(e,COMMANDS[c]);note(`Spúšťač ${c} bol nahradený pripraveným AI promptom`);}
document.addEventListener('input',e=>setTimeout(()=>cr(e.target),20),true);document.addEventListener('keyup',e=>setTimeout(()=>cr(e.target),20),true);document.addEventListener('paste',e=>setTimeout(()=>cr(e.target),50),true);
})();
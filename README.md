# Tampermonkey Universal AI Prompt Commands SK

**Tampermonkey Universal AI Prompt Commands SK** je userscript pre rozšírenie **Tampermonkey**. Pomáha rýchlejšie pracovať s AI chatmi ako ChatGPT, Gemini, Claude, Copilot a ďalšími webmi s textovým poľom.

Skript nahrádza krátke príkazy ako `SK1`, `SK3` alebo `SK10` dlhými pripravenými AI promptmi.

---

## Na čo slúži

Slúži na rýchle vkladanie promptov pre preklad, zhrnutie, analýzu listov, extrakciu faktov, oficiálne odpovede a prípravu textov.

---

## Ako funguje

Ak pole obsahuje presný známy príkaz, napríklad:

```text
SK1
```

nahradí sa úplným promptom. Bežný text sa nemení.

---

## Príklady

- `SK1` — presný preklad do slovenčiny.
- `SK3` — zhrnutie listu v jednom riadku.
- `SK8` — extrakcia dátumov, súm, osôb, organizácií a dokumentov.
- `SK10` — oficiálny list v jednoduchej nemčine A2-B1.

---

## Kde použiť

ChatGPT, Google Gemini, Claude, Microsoft Copilot a ďalšie weby s textovým poľom.

```javascript
// @match        *://*/*
```

Skript funguje na rôznych weboch, ale nahrádza iba presné príkazy.

---

## Pred inštaláciou

Najprv nainštalujte rozšírenie **Tampermonkey**. Umožňuje inštalovať a spúšťať súbory `.user.js`.

---

## Rýchla inštalácia cez Raw

1. Nainštalujte Tampermonkey.
2. Otvorte tento Raw odkaz:

```text
https://raw.githubusercontent.com/1777maxim7771/sk_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Potvrďte inštaláciu v Tampermonkey.
4. Otestujte `SK1` v AI chate.

---

## Inštalácia z GitHubu

Otvorte `tampermonkey-universal-ai-prompt-commands.user.js`, kliknite na **Raw** a potvrďte v Tampermonkey.

---

## Import cez URL

Tampermonkey → Dashboard → Utilities → Import from URL → vložte Raw odkaz.

---

## Ručná inštalácia

Tampermonkey → Create a new script → zmažte šablónu → vložte obsah `.user.js` → uložte pomocou **Ctrl + S**.

---

## Prečo Tampermonkey rozpozná skript

Vďaka hlavičke `// ==UserScript==` a prípone `.user.js`. Skript sa inštaluje do **Tampermonkey**, nie do GitHubu ani na konkrétny web.

---

## Príkazy

- `SK1` — preklad do slovenčiny.
- `SK2` — zhrnutie po slovensky.
- `SK3` — zhrnutie listu v jednom riadku.
- `SK4` — preklad do nemčiny A2-B1.
- `SK5` — oprava slovenského textu.
- `SK6` — krátka oficiálna odpoveď.
- `SK7` — jednoduché vysvetlenie.
- `SK8` — extrakcia dôležitých faktov.
- `SK9` — zoznam potrebných krokov.
- `SK10` — oficiálny list v nemčine.

---

## Kontrola

Napíšte `SK1`. Ak sa nahradí úplným promptom, skript funguje.

---

## Možné problémy

Skontrolujte, či Tampermonkey a skript sú zapnuté, stránka je obnovená a príkaz je napísaný samostatne.

---

## Súbor skriptu

```text
tampermonkey-universal-ai-prompt-commands.user.js
```

---

## Cieľ projektu

Zrýchliť opakovanú prácu s AI chatmi pomocou krátkych príkazov, ktoré vkladajú úplné prompty.
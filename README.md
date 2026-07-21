# Tampermonkey Universal AI Prompt Commands SK

Slovenská verzia Tampermonkey skriptu na rýchlejšiu prácu s chatmi umelej inteligencie.

Skript nahrádza univerzálne spúšťače `Q1–Q10` pripravenými AI promptmi. Tieto spúšťače nie sú viazané na jazyk: používateľ môže `Q1`, `Q2` a ďalšie nahradiť vlastnými slovami, príkazmi alebo frázami.

## Na čo slúži

Slúži na rýchle vkladanie promptov do ChatGPT, Gemini, Claude, Copilot a ďalších AI chatov. Namiesto opakovaného písania dlhého zadania stačí napísať `Q1` a skript vloží celý prompt.

## Ako funguje

Skript sleduje aktívne textové pole. Ak celý obsah poľa presne zodpovedá jednému zo spúšťačov `Q1–Q10`, nahradí sa pripraveným promptom.

```text
Q1
```

sa nahradí promptom na preklad do slovenčiny.

```text
Q8
```

sa nahradí promptom na vybratie dôležitých faktov.

Bežný text sa nemení. Napríklad `Q1 ďalší text` nebude nahradený.

## Vlastné spúšťače

Spúšťače možno zmeniť v kóde v objekte `COMMANDS`.

```javascript
'Q1': `...`
```

môže byť napríklad:

```javascript
'PRELOZ': `...`
```

`Q1–Q10` sú iba predvolené univerzálne spúšťače.

## Kde používať

- ChatGPT
- Google Gemini
- Claude
- Microsoft Copilot
- iné weby s textovým poľom

Skript obsahuje:

```javascript
// @match        *://*/*
```

## Požiadavka pred inštaláciou

V prehliadači musí byť najskôr nainštalované rozšírenie **Tampermonkey**. Skript sa inštaluje do Tampermonkey, nie do GitHubu ani do konkrétneho webu. GitHub slúži iba na uloženie súboru `.user.js`.

## Rýchla inštalácia

1. Nainštalujte Tampermonkey.
2. Otvorte Raw odkaz:

```text
https://raw.githubusercontent.com/1777maxim7771/sk_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Potvrďte inštaláciu v Tampermonkey.
4. Otvorte AI chat a napíšte `Q1`.

## Inštalácia cez GitHub

Otvorte súbor `tampermonkey-universal-ai-prompt-commands.user.js`, kliknite na **Raw** a potvrďte inštaláciu v Tampermonkey.

## Import cez URL

V Tampermonkey otvorte **Dashboard → Utilities → Import from URL**, vložte Raw odkaz a potvrďte.

## Ručná inštalácia

Vytvorte nový skript v Tampermonkey, vložte kód zo súboru `.user.js` a uložte.

## Prečo Tampermonkey skript rozpozná

Tampermonkey rozpozná hlavičku `// ==UserScript==` a príponu `.user.js`.

## Predvolené príkazy

- `Q1` — preklad do slovenčiny.
- `Q2` — zhrnutie textu.
- `Q3` — zhrnutie listu v jednom riadku.
- `Q4` — preklad do jednoduchej nemčiny A2-B1.
- `Q5` — oprava slovenského textu.
- `Q6` — krátka oficiálna odpoveď.
- `Q7` — jednoduché vysvetlenie textu.
- `Q8` — vybratie dôležitých faktov.
- `Q9` — zoznam potrebných krokov.
- `Q10` — oficiálny list v nemčine.

## Kontrola

Napíšte `Q1` v AI chate. Ak skript funguje, `Q1` sa nahradí celým promptom.

## Možné problémy

Skontrolujte, či je skript zapnutý, stránka bola obnovená, `Q1` je zadané bez ďalšieho textu, Tampermonkey má na webe povolenie a kurzor je v editovateľnom poli.

## Cieľ projektu

Zrýchliť opakovanú prácu s AI chatmi: preklad, zhrnutie, analýzu listov, oficiálne odpovede a spracovanie dokumentov.

# Claude Code Remote Control

Korte referentie voor het op afstand bedienen van een lokale Claude Code sessie vanaf je telefoon, tablet of een andere browser. Handig voor werken aan dit project (apdigital.nl) terwijl je niet achter je werkpc zit.

Volledige docs: https://docs.claude.com/en/docs/claude-code/remote-control

## Wat het is

Remote Control verbindt [claude.ai/code](https://claude.ai/code) of de Claude mobiele app met een Claude Code sessie die lokaal draait op je laptop. Je begint een taak op je werkpc en pakt hem op vanaf je telefoon op de bank, of vanuit een browser op een andere computer.

Belangrijk: de sessie blijft de hele tijd lokaal draaien. Je filesystem, MCP servers, project config (CLAUDE.md, vercel.json, etc.) blijven beschikbaar. De web of mobiele interface is alleen een venster op die lokale sessie.

## Vereisten

- Claude Code v2.1.51 of hoger (`claude --version`)
- Pro, Max, Team of Enterprise plan (API keys worden niet ondersteund)
- Ingelogd via `/login` op claude.ai
- `claude` minimaal een keer in deze project-folder uitgevoerd, zodat workspace trust geaccepteerd is

## Sessie starten

Vanuit de project-folder (`C:/Users/alexa/Desktop/apdigital-website`):

```bash
claude remote-control
```

Dit zet een lokale server op die wacht op verbindingen. Je krijgt een sessie-URL te zien en kan `spacebar` indrukken voor een QR-code (handig om snel je telefoon te koppelen).

Variant: bestaande interactieve sessie remote maken:

```bash
claude --remote-control "AP Digital website"
```

Of vanuit een lopende sessie het slash command:

```text
/remote-control AP Digital website
```

## Verbinden vanaf telefoon/tablet/andere browser

Drie manieren:

1. **Sessie-URL openen** in welke browser dan ook -> direct naar de sessie op claude.ai/code
2. **QR-code scannen** met de Claude app -> sessie opent op je telefoon
3. **claude.ai/code of Claude app openen** en de sessie kiezen uit de lijst (computer-icoon met groen bolletje = online)

App-link nodig? Type `/mobile` in Claude Code voor een QR-code naar de iOS of Android app.

## Push notificaties

Met Remote Control actief kan Claude push notificaties naar je telefoon sturen, bijvoorbeeld als een lange taak klaar is of als hij een beslissing van je nodig heeft. Zet aan via `/config` -> **Push when Claude decides**.

Vereist Claude Code v2.1.110 of hoger en de Claude app ingelogd op hetzelfde account.

## Praktijk: werken aan apdigital.nl onderweg

Use-case voor dit project: vanaf de bank een tekst-tweak op een blog of stadspage doen en direct laten deployen.

1. Op je laptop (in de project-folder): `claude remote-control`
2. QR-code scannen met je telefoon
3. Op je telefoon prompten, bijvoorbeeld "fix de typo in blog-website-laten-maken-arnhem.html regel 42"
4. Na merge naar `main` deployt Vercel automatisch naar apdigital.nl

De laptop moet wel aan blijven staan en online zijn. Bij meer dan 10 minuten netwerk-onderbreking sluit de sessie zichzelf.

## Verschil met Claude Code on the web

| | Remote Control | Claude Code on the web |
|---|---|---|
| Waar draait Claude | jouw machine | Anthropic cloud |
| Lokale files/config | beschikbaar | niet beschikbaar (alleen repo) |
| Vereist | laptop aan + online | niets lokaal |
| Use case | lopend werk voortzetten | nieuwe taak zonder setup |

Voor dit project meestal Remote Control gebruiken, want de meeste taken raken lokale files (Vercel CLI, demo-folders, screenshots in `img/`).

## Beperkingen

- Eén remote sessie per Claude Code proces (behalve in server mode met `--spawn`)
- Lokaal proces moet blijven draaien (terminal of VS Code open)
- Netwerk-uitval > 10 min = sessie eindigt
- Sommige commands werken alleen lokaal: `/mcp`, `/plugin`, `/resume`

## Troubleshooting

**"Remote Control requires a claude.ai subscription"**  
Niet ingelogd via claude.ai. Run `claude auth login`. Als `ANTHROPIC_API_KEY` in je environment staat, eerst unset.

**"Remote credentials fetch failed"**  
Run met `--verbose` voor details. Meestal netwerk/proxy issue of niet ingelogd.

**Sessie reconnect lukt niet na sleep**  
Laptop is langer dan 10 min offline geweest. Run `claude remote-control` opnieuw.

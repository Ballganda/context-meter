# context-meter

A Claude Code mod that shows how many tokens of context the session is using, right under the chat input, as `ctx 62k` with a colored marker:

| Marker | Context tokens |
| --- | --- |
| 🟢 / green ▰ | under 75k |
| 🟡 / yellow ▰ | 75k – 140k |
| 🔴 / red ▰ | over 140k |
| ⚪ / gray ▰ | no reading yet (new or just-compacted session) |

The zones are absolute token counts, not a share of the model's window.

- **Desktop app:** shown on the status line under the prompt, e.g. `ctx 143k 🔴`.
- **Terminal:** appended to the hint line under the prompt, e.g. `? for shortcuts · ctx 143k ▰`, with the ▰ colored.

## Install

At the prompt of a terminal Claude Code session:

```
/plugin install ctx --marketplace Ballganda/context-meter
```

Or from a shell:

```bash
claude plugin install ctx --marketplace Ballganda/context-meter
```

In the desktop app: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `Ballganda/context-meter`, then **Add plugin**.

Answer `y` to add the marketplace, then pick a scope (user scope makes it run in every session).

## License

CC0 1.0 — see [LICENSE](LICENSE).

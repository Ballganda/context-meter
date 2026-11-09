# context-meter

A Claude Code mod that shows how full the session's context window is, in the space around the chat input.

## Language

**Context Meter**:
The compact readout of context usage shown beside the chat input, e.g. `ctx 62k ▰`.
_Avoid_: context bar, usage band

**Context Tokens**:
The input tokens the last model response was answered over, the figure the meter reports.
_Avoid_: context usage, fill, size

**Fill Zone**:
The band the Context Tokens fall in — green (under 75k), yellow (75k–140k), red (over 140k) — measured in absolute tokens, not as a share of the window. With no reading yet (a fresh or just-compacted session) the meter shows `ctx —` and a gray block, which is no zone. Where the block can't be colored (the desktop app's plain-text status line) the zones show as 🟢 🟡 🔴, and no reading as ⚪.
_Avoid_: threshold, level, percent

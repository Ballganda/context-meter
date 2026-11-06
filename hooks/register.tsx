import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Meter } from '../types'

const meter = atom({ plugin: 'ctx', key: 'meter' } as const, null)

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`

// Fill Zone, in absolute Context Tokens: green < 75k, yellow 75k–140k, red > 140k.
const zoneColor = (tokens: number | undefined) =>
  tokens === undefined ? 'inactive' : tokens < 75_000 ? 'success' : tokens <= 140_000 ? 'warning' : 'error'

// Plain-text stand-in for the colored ▰, for surfaces that draw no PromptHint (desktop).
const zoneEmoji = (tokens: number | undefined) =>
  tokens === undefined ? '⚪' : tokens < 75_000 ? '🟢' : tokens <= 140_000 ? '🟡' : '🔴'

type Ui = { session: { surfaces: () => Promise<readonly string[]> }; ui: { status: (t: string | undefined) => void } }

// The status line is drawn on every surface, so only use it where the hint line isn't (no terminal).
const pinStatus = async ($: Ui, m: Meter | null) => {
  const surfaces = await $.session.surfaces()
  if (surfaces.includes('terminal')) return $.ui.status(undefined)
  const tokens = m?.tokens
  $.ui.status(`${tokens === undefined ? '—' : fmt(tokens)} ${zoneEmoji(tokens)}`)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const { context } = await $.session.usage()
    const m: Meter = { tokens: context.tokens, window: context.window, percent: context.percent }
    await update($, meter, () => m)
    await pinStatus($, m)
    return next(e)
  })

  on('session.measure', async ($, e, next) => {
    if (e.changed.includes('context')) {
      const { tokens, window, percent } = e.context
      const m: Meter = { tokens, window, percent }
      await update($, meter, () => m)
      await pinStatus($, m)
    }
    return next(e)
  })

  on('ui.render', { component: 'PromptHint' }, async ($, e, next) => {
    const m = await read($, meter)
    const tokens = m?.tokens
    const { Box, Text } = $.ui.resolve(e)
    const hint = e.props.hint.trim()

    return (
      <Box>
        {hint ? <Text dimColor>{hint} · </Text> : null}
        <Text dimColor>ctx {tokens === undefined ? '—' : fmt(tokens)} </Text>
        <Text color={zoneColor(tokens)}>▰</Text>
      </Box>
    )
  })
}

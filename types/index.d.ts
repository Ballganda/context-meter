export type Meter = { tokens?: number; window: number; percent?: number }

declare module 'claude-code' {
  interface PluginState {
    'ctx': { meter: Meter | null }
  }
}

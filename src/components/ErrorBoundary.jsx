import { Component } from 'react'

// Global safety net: if any component throws during render or in an effect,
// show a recoverable error screen instead of unmounting the entire app.
// A navigation (or "Reload") click remounts the tree, so users recover
// without touching the browser refresh button.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info?.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="glass rounded-2xl max-w-md w-full p-8 text-center">
            <h1 className="font-display text-2xl mb-2">Something went wrong</h1>
            <p className="text-fg-secondary text-sm mb-6">
              The page hit an unexpected error. You can try reloading it — your session is safe.
            </p>
            <pre className="text-xs text-fg-muted bg-subtle/30 rounded-lg p-3 mb-6 overflow-auto max-h-32 text-left whitespace-pre-wrap">
              {String(this.state.error?.message || this.state.error)}
            </pre>
            <button
              onClick={() => this.setState({ error: null })}
              className="px-4 py-2 rounded-full border border-signal text-signal-bright bg-signal/10 hover:bg-signal/20 focus-ring"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

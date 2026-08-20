import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <div className="font-mono text-signal-bright text-sm mb-3">404</div>
      <h1 className="font-display text-3xl mb-4">This page isn't in the sitemap.</h1>
      <p className="text-fg-muted mb-8">Check the URL, or head back somewhere that exists.</p>
      <Link to="/" className="inline-flex px-5 py-2.5 rounded-lg bg-signal text-white text-sm font-medium focus-ring">
        Back to home
      </Link>
    </div>
  )
}

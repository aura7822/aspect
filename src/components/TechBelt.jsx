const techs = [
  'React', 'Next.js', 'Node.js', 'Python', 'Go', 'Rust', 'TypeScript', 'PostgreSQL',
  'Docker', 'Kubernetes', 'GraphQL', 'Redis', 'PyTorch', 'Solidity', 'Swift', 'Kotlin',
  'AWS', 'MQTT', 'gRPC', 'Firebase',
]

export default function TechBelt() {
  const loopItems = [...techs, ...techs]
  return (
    <div className="overflow-hidden py-6 border-y border-subtle-2">
      <div className="flex w-max marquee-track">
        {loopItems.map((name, i) => (
          <span
            key={i}
            className="mx-4 font-mono text-sm text-fg-muted px-4 py-2 rounded-full border border-subtle whitespace-nowrap"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

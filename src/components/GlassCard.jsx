import clsx from 'clsx'

export default function GlassCard({ children, className, as: Tag = 'div', ...rest }) {
  return (
    <Tag className={clsx('glass rounded-2xl', className)} {...rest}>
      {children}
    </Tag>
  )
}

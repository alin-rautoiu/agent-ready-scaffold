type NarrativeBandProps = {
  steps: readonly string[]
  active: number
}

export function NarrativeBand({ steps, active }: NarrativeBandProps) {
  return (
    <div className="narrative-band">
      {steps.map((label, index) => (
        <span
          key={label}
          className={`narrative-step${index === active ? ' narrative-step--active' : ''}`}
        >
          {label}
          {index < steps.length - 1 ? <span className="narrative-arrow">→</span> : null}
        </span>
      ))}
    </div>
  )
}

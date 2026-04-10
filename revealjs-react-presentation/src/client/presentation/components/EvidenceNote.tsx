type EvidenceVariant = 'repo' | 'anecdotal' | 'note'

type EvidenceNoteProps = {
  label?: string
  variant?: EvidenceVariant
  primary: string
  secondary?: string
}

export function EvidenceNote({
  label = 'Repo',
  variant = 'repo',
  primary,
  secondary,
}: EvidenceNoteProps) {
  return (
    <p className="evidence-note">
      <span className={`evidence-badge evidence-badge--${variant}`}>{label}</span>
      <span>{primary}</span>
      {secondary ? (
        <>
          {' '}
          | <span>{secondary}</span>
        </>
      ) : null}
    </p>
  )
}

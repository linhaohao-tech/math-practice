import { PlayButton } from './PlayButton'

interface LeaveConfirmProps {
  onStay: () => void
  onLeave: () => void
}

export function LeaveConfirm({ onStay, onLeave }: LeaveConfirmProps) {
  return (
    <div className="w-full rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 text-center playful-shadow-sm">
      <p className="font-display text-lg font-bold text-amber-900">
        Leave this round early?
      </p>
      <p className="mt-2 text-sm font-semibold text-amber-800">
        Your progress on this deck won&apos;t be saved, but your stats so far are kept.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <PlayButton variant="primary" onClick={onStay}>
          Keep Playing
        </PlayButton>
        <PlayButton variant="ghost" onClick={onLeave}>
          Go Home
        </PlayButton>
      </div>
    </div>
  )
}

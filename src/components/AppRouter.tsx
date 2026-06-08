import { useSession } from '../context/SessionContext'
import { PageShell } from './ui/PageShell'
import { PracticeScreen } from './screens/PracticeScreen'
import { ReviewScreen } from './screens/ReviewScreen'
import { SetupScreen } from './screens/SetupScreen'
import { StatsScreen } from './screens/StatsScreen'

const shellAccents = {
  SETUP: 'sky',
  PRACTICE: 'mint',
  REVIEW: 'coral',
  STATS: 'grape',
} as const

export function AppRouter() {
  const { state } = useSession()
  const accent = shellAccents[state.currentView] ?? 'sky'

  let screen = <SetupScreen />
  switch (state.currentView) {
    case 'PRACTICE':
      screen = <PracticeScreen />
      break
    case 'REVIEW':
      screen = <ReviewScreen />
      break
    case 'STATS':
      screen = <StatsScreen />
      break
    case 'SETUP':
    default:
      screen = <SetupScreen />
      break
  }

  return (
    <PageShell accent={accent}>
      {screen}
    </PageShell>
  )
}

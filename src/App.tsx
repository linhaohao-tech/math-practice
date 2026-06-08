import { AppRouter } from './components/AppRouter'
import { SessionProvider } from './context/SessionContext'

export default function App() {
  return (
    <SessionProvider>
      <AppRouter />
    </SessionProvider>
  )
}

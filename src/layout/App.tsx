import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import '../styles/styles.css'

function App() {
  return (
    <>
      <NavBar />
      <main style={{marginTop: '5em'}}>
          <Outlet />
      </main>
    </>
  )     
}

export default App
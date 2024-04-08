import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Home from '../pages/home'
import '../styles/styles.css'

function App() {
  return (
    <>
      <NavBar />
      <main style={{marginTop: '5em'}}>
          {location.pathname === '/' ? <Home /> : (<Outlet />)}
      </main>
    </>
  )
}

export default App
import { NavLink } from "react-router-dom";

export default function NavBar(){
    return (
      <nav className="nav--bar">
        <div className="nav--left">
          <NavLink to={'/'}>
            <img className="logo" src="/assets/images/logo.png"></img>
          </NavLink>
        </div>
        <div className="nav--right">
          <NavLink className='nav--link' to={'/articles'}><h1 className="nav--title">Articles</h1></NavLink>
          <NavLink className='nav--link' to={'/items'}><h1 className="nav--title">Items</h1></NavLink>
          <NavLink className='nav--link' to={'/creatures'}><h1 className="nav--title">Creatures</h1></NavLink>
        </div>
      </nav>
    )
}
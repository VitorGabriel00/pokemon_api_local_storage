import { Link } from "react-router-dom";
import "./navBarra.css"

function Nav() {
  return (
    <>
      <nav className="navBar">
        <ul className="navLista">
          <li className="navItem"><Link to="/" className="navLink">Home</Link></li>
          <li className="navItem"><Link to="/favoritos" className="navLink">Favoritos</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;

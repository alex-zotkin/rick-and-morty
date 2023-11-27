import { NavLink, Link } from "react-router-dom";
import "../css/Header.css";
import logo from "../imgs/logo-black 1.svg"
import burger from "../imgs/burger.svg"
import close_burger from "../imgs/close_burger.svg"

import useMatchMedia from 'use-match-media-hook'
import { useState } from "react";

const queries = [
    '(max-width: 950px)',
]

function Header(){
    const [mobile] = useMatchMedia(queries)
    const [menuOpen, setMenuOpen] = useState(false)
    
    function changeMenu(){
        setMenuOpen(!menuOpen)
    }

    return (
        <header>
            <center>
                <Link to="/"><img src={logo} onClick={() => setMenuOpen(false)}/></Link>

                {
                    mobile
                    ?  
                    <> 
                        <img src={menuOpen ? close_burger : burger} onClick={changeMenu}/>

                        {menuOpen
                            ? <nav className="mobile_menu">
                                <NavLink to="/" onClick={changeMenu}>Characters</NavLink>
                                <NavLink to="/locations" onClick={changeMenu}>Locations</NavLink>
                                <NavLink to="/episodes" onClick={changeMenu}>Episodes</NavLink>
                            </nav>
                        :<></>
                        }
                    </>
                    
                    : <nav>
                        <NavLink to="/">Characters</NavLink>
                        <NavLink to="/locations">Locations</NavLink>
                        <NavLink to="/episodes">Episodes</NavLink>
                    </nav>
                }

                
            </center>
        </header>
    );

}

export default Header;
import { NavLink } from "@remix-run/react"
import carritoImg from "../../public/img/carrito.png";

function Navegacion() {
    return (
        <nav className="navegacion">
            <NavLink
                to="/"
            >Inicio</NavLink>

            <NavLink
                to="/guitarras"
            >Tienda</NavLink>

            <NavLink
                to="/nosotros"
            >Nosotros</NavLink>

            <NavLink
                to="/posts"
            >Blog</NavLink>

            <NavLink
                to="/carrito"
                className="enlace-carrito"
            >
                <img src={carritoImg} alt="Imagen carrito" />
            </NavLink>
        </nav>
    )
}

export default Navegacion

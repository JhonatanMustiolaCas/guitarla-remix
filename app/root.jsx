import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
} from "@remix-run/react";
import Header from "./components/header";
import styles from "./styles/index.css";
import Footer from "./components/footer";
import { useEffect, useState } from "react";




export function meta() {
    return [
        { title: "GuitarLA - Remix" },
        { name: "viewport", content: "width=device-width,initial-scale=1" },
    ];
}

export function links() {
    return [
        {
            rel: "stylesheet",
            href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
        },
        {
            rel: "stylesheet",
            href: styles
        },
    ]
}


export default function App() {

    const carritoLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito")) ?? [] : [];
    const [carrito, setCarrito] = useState(carritoLS);

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito])

    const agregarCarrito = (guitarra) => {
        if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
            // Actualizar registro
            const carritoActualizado = carrito.map(guitarraState => {
                if (guitarraState.id === guitarra.id) {
                    // Reescribir guitarra
                    guitarraState.cantidad = guitarra.cantidad;
                }

                return guitarraState;
            })
            // Actualizar carrito
            setCarrito(carritoActualizado);

        } else {
            // Registro nuevo
            setCarrito([...carrito, guitarra]);
        }


    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if (guitarraState.id === guitarra.id) {
                // Reescribir guitarra
                guitarraState.cantidad = guitarra.cantidad;
            }

            return guitarraState;
        })

        setCarrito(carritoActualizado);
    }

    const eliminarGuitarra = guitarraId => {
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== guitarraId);
        setCarrito(carritoActualizado);
    }

    return (
        <Document>
            <Outlet
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document>
    )
}

function Document({ children }) {
    return (
        <html lang="es">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />

                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}


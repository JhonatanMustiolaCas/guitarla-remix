import { useOutletContext } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import styles from "../styles/carrito.css";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";


export function meta() {
    return [
        { title: "GuitarLA - Resumen de Compra" },
        { description: "Venta de guitarras, compra guitarras" },
    ];
}


export function links() {

    return [
        {
            rel: "stylesheet",
            href: styles
        }
    ];
}

export default function Carrito() {

    const [total, setTotal] = useState(0);
    const [totalArticulos, setTotalArticulos] = useState(0);

    const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext();

    useEffect(() => {
        const calculoTotal = carrito.reduce((total, articulo) => total + (articulo.cantidad * articulo.precio), 0);
        setTotal(calculoTotal);

        const calculoTotalArticulos = carrito.reduce((totalArticulos, articulo) => (totalArticulos + articulo.cantidad), 0);
        setTotalArticulos(calculoTotalArticulos);

    }, [carrito]);



    return (
        <ClientOnly fallback={<Spinner />}>
            {
                () => (
                    <main className="contenedor">
                        <h1 className="heading">Carrito de Compras</h1>

                        <div className="contenido">

                            <div className="carrito">
                                <h2>Artículos</h2>
                                {carrito.length === 0 ? "Carrito Vacío" : (
                                    carrito.map(articulo => (
                                        <div key={articulo?.id} className="articulo">
                                            <div>
                                                <img src={articulo?.imagen} alt={`Imagen ${articulo?.nombre}`} />
                                            </div>

                                            <div>
                                                <p className="nombre">{articulo?.nombre}</p>

                                                <p>Cantidad:</p>
                                                <select
                                                    value={articulo?.cantidad}
                                                    className="seleccion"
                                                    onChange={e => actualizarCantidad({
                                                        cantidad: +e.target.value,
                                                        id: articulo?.id
                                                    })}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>


                                                <p className="precio">${articulo?.precio}</p>
                                                <p className="subtotal">Subtotal: <span>${articulo?.precio * articulo.cantidad}</span></p>
                                            </div>

                                            <button
                                                type="button"
                                                className="btn_eliminar"
                                                onClick={() => eliminarGuitarra(articulo?.id)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            <aside className="resumen">
                                <h3>Resumen del Pedido</h3>
                                <p>Artículos Neto: {carrito.length}</p>
                                <p>Total Artículos: {totalArticulos}</p>
                                <p>Total a Pagar: ${total}</p>
                            </aside>
                        </div>
                    </main>

                )
            }
        </ClientOnly>
    )
}

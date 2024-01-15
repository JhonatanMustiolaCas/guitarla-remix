import { Link, isRouteErrorResponse, useLoaderData, useOutletContext, useRouteError } from "@remix-run/react";
import { getGuitarra } from "../models/guitarras.server";
import { useState } from "react";


// Menejo de errores
export function ErrorBoundary() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {

        return (
            <p className="error">
                {error.status} - {error.statusText}
                <Link className="error-enlace" to="/">Volver a la página principal</Link>
            </p>
        )
    }
    return (
        <>
            <p className="error">Error desconocido</p>
            <Link className="error-enlace" to="/">Volver a la página principal</Link>
        </>
    )
}


export async function loader({ params }) {

    const { guitarraUrl } = params;
    const guitarra = await getGuitarra(guitarraUrl);

    // comprobar si no existe guitarra
    if (guitarra.data.length === 0) {
        throw new Response("", {
            status: 404,
            statusText: "Guitarra no encontrada",
            data: {}
        })
    }

    return guitarra.data[0];
}

export function meta({ data }) {

    if (!data || Object.keys(data).length === 0) {
        return [
            { title: `GuitarLA | Guitarra no encontrada` },
            { description: 'Guitarras, venta de guitarras, guitarra no encontrada' },
        ];
    }

    return [
        { title: `GuitarLA - ${data.nombre}` },
        { description: `Guitarras, venta de guitarras, guitarra ${data.nombre}` },
    ];
}




function Guitarra() {

    const { agregarCarrito } = useOutletContext();

    const [cantidad, setCantidad] = useState(0);

    const guitarra = useLoaderData();
    const { nombre, descripcion, imagen, precio } = guitarra.attributes;

    const handleSubmit = e => {
        e.preventDefault();

        if (cantidad < 1) {
            alert("cantidad 0");
            return;
        }

        const guitarraSeleccionada = {
            id: guitarra.id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad
        };

        agregarCarrito(guitarraSeleccionada);
    }

    return (
        <div className="guitarra">
            <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen ${nombre}`} />

            <div className="contenido">
                <h3>{nombre}</h3>
                <p className="texto">{descripcion[0].children[0].text}</p>
                <p className="precio">${precio}</p>

                <form
                    className="formulario"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="cantidad">Cantidad</label>
                    <select
                        id="cantidad"
                        onChange={e => setCantidad(parseInt(e.target.value))}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <input
                        type="submit"
                        value="Agregar al carrito"
                    />
                </form>
            </div>
        </div>
    )
}

export default Guitarra



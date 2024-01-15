import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "../models/guitarras.server";
import ListadoGuitarras from "../components/listado-guitarras";



export async function loader() {

    const guitarras = await getGuitarras();
    return guitarras.data;
}

export function meta() {
    return [
        { title: "GuitarLA - Tienda de Guitarras" },
        { description: "GuitarLA - Nuestra colleción de guitarras" },
    ];
}


function Guitarras() {
    const guitarras = useLoaderData();

    return (
        <div className="tienda contenedor">
            <ListadoGuitarras guitarras={guitarras} />
        </div>
    )
}

export default Guitarras

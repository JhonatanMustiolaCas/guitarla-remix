import { useRouteError, isRouteErrorResponse, Link, useLoaderData } from "@remix-run/react";
import { getPost } from "../models/posts.server";
import { formatearFecha } from "../utils/helpers";
import styles from "../styles/blog.css"


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

    const { postUrl } = params;
    const post = await getPost(postUrl);

    // comprobar si no existe post
    if (post.data.length === 0) {
        throw new Response("", {
            status: 404,
            statusText: "Post no encontrado",
            data: {}
        })
    }

    return post.data[0].attributes;
}


export function links() {
    return [
        {
            rel: "stylesheet",
            href: styles
        }
    ]
}


export function meta({ data }) {

    if (!data || Object.keys(data).length === 0) {
        return [
            { title: `GuitarLA | Post no encontrado` },
            { description: 'Posts sobre guitarras, aprende de guitarras, guitarra no encontrada' },
        ];
    }

    return [
        { title: `GuitarLA - ${data.titulo}` },
        { description: `Blog de música y venta de guitarras, post ${data.titulo}` },
    ];
}

function Post() {

    const post = useLoaderData();
    const { contenido, imagen, titulo, url, publishedAt } = post;

    return (
        <article className="post mt-3">
            <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen ${titulo}`} />

            <div className="contenido">
                <h3>{titulo}</h3>
                <p className="fecha">{formatearFecha(publishedAt)}</p>
                <p className="texto">
                    {
                        contenido.map((parrafo, i) => (
                            <p key={i}>
                                {parrafo.children[0].text}
                            </p>
                        ))
                    }
                </p>
            </div>
        </article>
    )
}

export default Post
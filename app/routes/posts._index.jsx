import { useLoaderData } from "@remix-run/react";
import { getPosts } from "../models/posts.server"
import styles from "../styles/blog.css"
import ListadoPosts from "../components/listado-posts";


export async function loader() {
    const posts = await getPosts();
    return posts.data;
}


export function links() {
    return [
        {
            rel: "stylesheet",
            href: styles
        }
    ]
}

export function meta() {

    return [
        { title: `GuitarLA - Nuestro Blog` },
        { description: `Blog de música y venta de guitarras` },
    ];
}


function Blog() {

    const posts = useLoaderData();

    return (
        <div className="">
            <ListadoPosts posts={posts} />
        </div>
    )
}

export default Blog

import imagen from "../../public/img/nosotros.jpg";
import styles from "../styles/nosotros.css";


export function meta() {
    return [
        { title: "GuitarLA - Sobre Nosotros" },
        { description: "Venta de guitarras, blog de música" },
    ];
}


export function links() {
    return [
        {
            rel: "stylesheet",
            href: styles
        },
        {
            rel: "preload",
            href: imagen,
            as: "image"
        }
    ]
}


function Nosotros() {
    return (
        <main className="contenedor nosotros">
            <h2 className="heading">Nosotros</h2>

            <div className="contenido">
                <img src={imagen} alt="imagen nosotros" />

                <div>
                    <p>Quisque sodales eleifend hendrerit. Mauris vitae urna vitae dolor mattis dignissim nec sit amet leo. Cras a iaculis lorem. Phasellus finibus erat malesuada, interdum ex in, pellentesque mauris. Vestibulum molestie odio est, a condimentum tellus euismod ac. Nunc non quam nec nulla condimentum efficitur. Proin fringilla mi nec ligula porttitor pharetra. Cras nec ultrices quam, eu dignissim lorem. In hac habitasse platea dictumst.</p>

                    <p>Etiam dictum nulla mi. Suspendisse potenti. Vestibulum vel finibus felis. Nam in ex eget massa dictum molestie. Cras massa sapien, egestas vel libero sed, placerat pretium risus. Pellentesque vitae diam vulputate, eleifend nunc a, tempor nulla. Sed molestie urna in est feugiat, et varius dui feugiat. Curabitur vestibulum id risus in blandit. Cras in nulla commodo, faucibus nisl quis, dictum lacus. Mauris egestas, orci id ornare efficitur, neque orci rhoncus nibh, non congue lacus leo eu neque.</p>
                </div>
            </div>
        </main>
    )
}

export default Nosotros

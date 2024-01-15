
export default function Curso({ curso }) {
    const { contenido, imagen, titulo } = curso;
    console.log(contenido)
    return (
        <section className="curso">
            <style jsx="true">
                {`
                    .curso {
                        background-image: linear-gradient(to right, rgb(0 0 0/.6), rgb(0 0 0/.7), rgb(0 0 0/.8), rgb(0 0 0/.9)), url(${imagen.data.attributes.url});                        
                    }
                `}
            </style>

            <div className="contenedor curso-grid">
                <div className="contenido">
                    <h2 className="heading">{titulo}</h2>
                    <p className="texto">{contenido[0].children[0].text}</p>
                </div>
            </div>
        </section>
    )
}

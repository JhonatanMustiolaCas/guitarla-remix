import Guitarra from "./guitarra"

export default function ListadoGuitarras({ guitarras }) {
    return (
        <>
            <h2 className="heading">Nuestra Colección</h2>
            <div className="guitarras-grid">
                {
                    guitarras?.length && (
                        guitarras.map(guitarra => (
                            <Guitarra
                                key={guitarra?.id}
                                guitarra={guitarra.attributes}
                            />
                        ))

                    )
                }
            </div>
        </>
    )
}

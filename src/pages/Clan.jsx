import { useParams } from "react-router-dom";

function Clan() {
    const { tag } = useParams();
    return (
        <>
            <p>Clan tag: {tag}</p>
        </>
    )
}

export default Clan
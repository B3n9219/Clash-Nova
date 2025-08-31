import {useRouteError} from "react-router-dom";
import styles from "./ErrorPage.module.css"

function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <div className={styles.error}>
            <h1>Oops!</h1>
            <p>Something went wrong...</p>
            <p>{error.statusText || error.message || "Page not found"}</p>
            <Link to={"/"}>Back to home</Link>
        </div>
    )
}

export default ErrorPage
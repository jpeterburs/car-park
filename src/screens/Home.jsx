import { Link } from "react-router-dom";


const Home = () => {
    return(
        <div>
            <Link className="btn btn-info" to="/Einfahrt">Einfahrt</Link>
            <Link className="btn btn-info" to="/Ausfahrt">Ausfahrt</Link>
        </div>
    )
}


export default Home;
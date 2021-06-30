import { Link } from "react-router-dom";


const Home = () => {
    return(
      <div style={{ "margin": "10em", "padding": "2em", "text-align": "center" }}>
        <h1>Parkautomat</h1>

        <h2>1 &euro; pro Stunde</h2>

        <br />

        <Link className="btn btn-info" to="/Einfahrt">Einfahrt</Link>
        <Link className="btn btn-info" to="/Ausfahrt">Ausfahrt</Link>
      </div>
    )
}


export default Home;

import { Link } from "react-router-dom";


const Home = () => {
    return(
      <div style={{ "padding": "40vh", "text-align": "center" }}>
        <h1>Parkautomat</h1>

        <br />

        <Link className="btn info" to="/Einfahrt">Einfahrt</Link>
        <Link className="btn info" to="/Ausfahrt">Ausfahrt</Link>
      </div>
    )
}


export default Home;

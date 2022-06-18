import "../../styles/home.scss";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-main">
      <img
        src="https://m.media-amazon.com/images/M/MV5BMTM1ZDAxNTktNjVkNi00NGQ0LTg3ZWItOTBiZTFiNzFkMmYwXkEyXkFqcGdeQXVyMTI0MDY5NzI@._V1_FMjpg_UX1000_.jpg"
        alt="Team Image"
        className="team-img"
      />
      <div className="welcome-container">
        <p className="welcome-msg">
          You'll have an unforgettable customer experience!
        </p>
        <p className="welcome-msg">We guarantee it.</p>
        <Link to={"/shop"}>
          <button className="shop-btn">Shop Now</button>
        </Link>
      </div>
    </div>
  );
}

import { type FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <div className="home">
      Home
      <Link to={"/admin"}>Admin</Link>
    </div>
  );
};

export default Home;

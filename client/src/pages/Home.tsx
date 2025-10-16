import { type FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <div>
      Home
      <Link to={"/admin"}></Link>
    </div>
  );
};

export default Home;

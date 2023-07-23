import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <div>
      <h1>Clean Commute</h1>
      <div>
        <Link to="/login">
          <button type="button" className="btn btn-primary btn-lg">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button type="button" className="btn btn-primary btn-lg">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainMenu;

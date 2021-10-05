import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar px-2 navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
          {user ? (
            <>
              <NavLink className="nav-item nav-link" to="/profile">
                Welcome {user.name} <i className="fa fa-user-circle"></i>
              </NavLink>

              <NavLink className="nav-item nav-link" to="/logout">
                Logout <i className="fa fa-sign-out"></i>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

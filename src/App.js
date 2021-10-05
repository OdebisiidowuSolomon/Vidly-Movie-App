import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";
import "./App.css";
import auth from "./services/authService";

class App extends React.Component {
  state = {};
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute
              user={user}
              path="/movies/:id"
              component={MovieForm}
            />

            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;

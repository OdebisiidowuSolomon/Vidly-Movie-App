import Joi from "joi-browser";
import { toast } from "react-toastify";
import auth from "../services/authService";
import { register } from "../services/userService";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (err) {
      if (err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
        toast.error("User is already registered!.");
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register ")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;

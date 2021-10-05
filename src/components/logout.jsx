import React from "react";
import auth from "../services/authService";

import { toast } from "react-toastify";
import "./common/logout.css";

export default class Logout extends React.Component {
  componentDidMount = () => {
    auth.logout();
    window.location = "/";
    toast("Logout Successful");
  };

  render() {
    return <div className="loader">Loading...</div>;
  }
}

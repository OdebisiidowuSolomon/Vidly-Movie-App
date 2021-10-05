import httpService from "./httpService";
import jwtDecode from "jwt-decode";
import { register } from "../services/userService";

const apiEndpoint = "/auth";
const tokenKey = "token";

export async function login(username, password) {
  const { data: jwt } = await httpService.post(apiEndpoint, {
    email: username,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  console.log("getJwt");
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export async function loginWithJwt(jwt) {
  return localStorage.setItem(tokenKey, jwt);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

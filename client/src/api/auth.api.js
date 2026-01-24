import { http } from "./http";

export const login = (email, password) =>
    http("/auth/login", {
        method: "POST",
        body: { email, password },
        auth: false
    });


export const register = (name, email,password) =>
    http("/auth/register", {
        method: "POST",
        body: {name, email,password},
        auth: false
    });

export const getMe = () => http("/auth/me");

export const logoutUser = () => {
  localStorage.removeItem("token");
};
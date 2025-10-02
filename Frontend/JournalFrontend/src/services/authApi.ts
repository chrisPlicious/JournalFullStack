import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface RegisterDto {
  userName: string;
  email: string;
  password: string;
}

export interface LoginDto {
  userName: string;
  password: string;
}

export interface UserDto {
  userName: string;
  email: string;
}

export interface TokenDto {
  token: string;
  expiration: string;
  user: UserDto;
}

export const registerUser = async (data: RegisterDto) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  return res.data;
};

export const loginUser = async (data: LoginDto) => {
  const res = await axios.post<TokenDto>(`${API_URL}/auth/login`, data);
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }
  return res.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await axios.get<UserDto>(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

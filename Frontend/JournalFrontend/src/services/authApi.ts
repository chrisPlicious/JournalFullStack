import api from "./api";

export interface LoginDto {
  UserName: string;
  Password: string;
}

export interface RegisterDto {
  UserName: string;
  Email: string;
  Password: string;
}

export interface TokenDto {
  Token: string;
  Expiration: string;
  User: {
    UserName: string;
    Email: string;
  };
}

export interface UserDto {
  UserName: string;
  Email: string;
}

// Login
export const login = async (data: LoginDto): Promise<TokenDto> => {
  const res = await api.post("/auth/login", data);
  const token = res.data.token ?? res.data.Token;
  if (token) localStorage.setItem("token", token);
  return res.data;
};
// Register
export const register = async (data: RegisterDto): Promise<UserDto> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// Logout
export const logout = async (): Promise<string> => {
  const res = await api.post("/auth/logout");
  return res.data;
};

// Get current user
export const getCurrentUser = async (): Promise<UserDto> => {
  const res = await api.get("/auth/me");
  return res.data;
};

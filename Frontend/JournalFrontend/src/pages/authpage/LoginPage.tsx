import React, { useState } from "react";
import { loginUser } from "../../services/authApi"; // matches your folder structure
import { useNavigate, Link } from "react-router-dom";

// Shadcn UI components
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser({ userName, password });
      navigate("/home"); // redirect after login
    } catch (err: any) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        className="p-8 bg-white rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/register">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import { registerUser } from "../../services/authApi";
import { useNavigate, Link } from "react-router-dom";

// Shadcn UI components
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const RegisterPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ userName, email, password });
      navigate("/login"); // redirect after successful registration
    } catch (err: any) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        className="p-8 bg-white rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Sign Up
        </Button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

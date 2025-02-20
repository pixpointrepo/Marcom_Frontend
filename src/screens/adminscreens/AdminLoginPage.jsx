import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Import useAuth hook

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(username)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store token in context and redirect to dashboard
        login(data.token); // Assuming the response contains a `token` field
        navigate("/dashboard");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Welcome Admin/Editors</h2>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="username">Username (Email)</Label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 text-gray-500" size={18} />
                <Input
                  id="username"
                  className="pl-8"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 text-gray-500" size={18} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-8 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

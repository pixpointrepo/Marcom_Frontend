import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import AuthContext from "../../context/AuthContext"
import { adminLogin } from "../../services/api";

 
export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      setLoading(true);
      const response = await adminLogin(email,password);

      const data = await response.data;
      if (data.token) {
        login(data.token);
        // // navigate to admin home page
        // navigate('/dashboard');
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error('Login error: ', error);
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error')); 
    }finally{
      setLoading(false);
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
              <Label htmlFor="email">email (Email)</Label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 text-gray-500" size={18} />
                <Input
                  id="email"
                  className="pl-8"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
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
                   placeholder="Enter your password"
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

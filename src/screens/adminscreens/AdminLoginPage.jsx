import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Alert } from "../../components/ui/alert";
import { Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data) => {
    setLoginError("");
    if (data.username !== "admin" || data.password !== "password") {
      setLoginError("Invalid username or password");
      return;
    }
    alert("Login successful");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Welcome Admin/Editors</h2>
          {loginError && <Alert className="mb-4 text-red-600">{loginError}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 text-gray-500" size={18} />
                <Input
                  id="username"
                  {...register("username", { required: "Username is required" })}
                  className="pl-8"
                />
              </div>
              {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 text-gray-500" size={18} />
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="pl-8"
                />
              </div>
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

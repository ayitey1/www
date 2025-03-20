import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FormErrors {
  username?: string;
  password?: string;
}

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8081/api/login", {
        username: formData.username,
        password: formData.password,
      });
      console.log(response.data)
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Successfully signed in!");
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="shadow-lg w-96 p-6">
          <CardHeader>
            <CardTitle className="text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange} disabled={isLoading} />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              
              <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} disabled={isLoading} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <FcGoogle className="mr-2" /> Log In with Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center">
            <Link to="/signup" className="text-blue-600 hover:text-blue-500">Don't have an account? Sign up</Link>
            <Button variant="link" className="text-gray-600" onClick={() => navigate("/forgot-password")}>Forgot your password?</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;

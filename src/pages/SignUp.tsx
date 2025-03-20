import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface User {
  fullName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const existingUsers = localStorage.getItem('users') ? 
        JSON.parse(localStorage.getItem('users') || '[]') : [];
      
      if (existingUsers.some((u: User) => u.email === formData.email)) {
        toast.error("An account with this email already exists");
        setIsLoading(false);
        return;
      }

      const newUser: User = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };
      
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

      localStorage.setItem('user', JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        isLoggedIn: true
      }));

      toast.success("Account created successfully!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Signup error:", error);
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
    <div
      style={{
        backgroundImage: "url('/images/ap.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
       <div className=" left-10 text-white">
        <img src="/images/logo.png" alt="WorkHive Logo" className="w-32 mb-4" />
        <h1 className="text-3xl font-light-bold text-align:left tracking-tight">Empower Your Career...</h1>
        <p className="text-base text-align:left font-light">Discover a world of opportunities with meaningful internships</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <Card className="border-0 shadow-lg bg-white rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-900">Create an account</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Join WorkHive to start your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={`border ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={isLoading}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  disabled={isLoading}
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>
              <div>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>
            <div className="text-center my-4 text-gray-500">Or</div>
            <Button className="w-full flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FcGoogle className="mr-2" /> Sign up with Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center space-x-1">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;

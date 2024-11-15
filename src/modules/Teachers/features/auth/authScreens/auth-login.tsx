  // import { Image } from "lucide-react"
  import { Button } from "@/components/ui/button";
  import { useForm, SubmitHandler } from "react-hook-form";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Link, useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import axios from "axios";
  import { jwtDecode } from "jwt-decode";
  import { useDispatch } from "react-redux";
  import { setUserData } from "@/modules/admins/store/authSlice"; 
  import Cookies from 'universal-cookie';
import { useState } from "react";


  
  

  interface FormData {
    email: string;
    password: string;
  }

  interface DecodedToken {
    fullName: string;
    id: number;
    userRole: string;
    isActive: boolean;
    isSuperuser: boolean;
    exp: number;
    iat: number;
  }
  

  export const description =
    "A login page with two columns. The first column has the login form with email and password. There's a Forgot your password link and a link to sign up if you do not have an account. The second column has a cover image.";

  export default function AuthLogin() {
    const cookies = new Cookies;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<FormData>({ mode: "onChange" });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
      setLoading(true);
      try {
        const response = await axios.post("http://thousi.localhost:3000/api/auth/login/", data);
        const accessToken = response.data.data?.accessToken;
        const refreshToken = response.data.data?.refreshToken;
    
        if (accessToken && refreshToken) {
          // Set cookies for tokens
          cookies.set("accessToken", accessToken);
          cookies.set("refreshToken", refreshToken);
    
          // Decode the token to get user data
          const decoded = jwtDecode<DecodedToken>(accessToken);
          console.log("Decoded Token Data:", decoded);
    
          // Dispatch user data to Redux store 
          dispatch(
            setUserData({
              fullName: decoded.fullName,
              id: decoded.id,
              userRole: decoded.userRole,
              isActive: decoded.isActive,
              isAuthenticated: true,
            })
          );
    
          // Check user role and navigate accordingly
          if (decoded.userRole === "teacher") {
            navigate("teacher/*");
          } else {
            // Handle other roles if needed
              // Example route for other roles
          }
    
          toast.success(response.data.message);
          console.log(response.data);
        } else {
          // If accessToken or refreshToken is missing, navigate to login page
          navigate("/");
          toast.error("Authentication failed. Please try again.");
        }
      } catch (error: any) {
        toast.error(error.response?.data?.error || "An error occurred");
        console.error("Error:", error);
        // Navigate to login page on error
        navigate("/");
      }finally {
        setLoading(false);
      }
    };
    

    return (
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[575px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to log in to your account
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Please enter your email",
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", { required: "This field is required" })}
                  />
                  {errors.password && (
                    <span className="text-xs text-rose-700">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={!isValid || loading}>
                {loading ? (
                  <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full border-white border-t-transparent"></div>
                ) : (
                  "Login"
                )}
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button> 
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          {/* Uncomment and add an image source if needed */}
          {/* <Image
            src=""
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          /> */}
        </div>
      </div>
    );
  }

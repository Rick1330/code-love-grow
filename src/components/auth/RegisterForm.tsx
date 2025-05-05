
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { GoogleLogin } from '@react-oauth/google';

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    fatherName: z.string().min(2, {
      message: "Father's name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export function RegisterForm() {
  const { register, googleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "Elshaday",
      fatherName: "Mengesha",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // Combine first name and father name to create the full name
    const fullName = `${data.firstName} ${data.fatherName}`;
    await register(fullName, data.email, data.password);
    setIsLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log("Google signup success:", credentialResponse);
      if (credentialResponse.credential) {
        await googleLogin(credentialResponse.credential);
      }
    } catch (error) {
      console.error("Google signup error:", error);
    }
  };

  const handleGoogleError = () => {
    console.error("Google signup failed");
  };

  return (
    <div className="relative z-10">
      {/* Glass card effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-tssk-teal/10 blur-xl rounded-2xl"></div>
      
      <div className="relative backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border border-white/20 shadow-xl rounded-2xl p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-tssk-teal bg-clip-text text-transparent">Join us today</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Create your account to get started</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Elshaday"
                        className="h-12 text-base bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 focus:border-tssk-teal focus:ring-2 focus:ring-tssk-teal/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fatherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300">Father's Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mengesha"
                        className="h-12 text-base bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 focus:border-tssk-teal focus:ring-2 focus:ring-tssk-teal/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      className="h-12 text-base bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 focus:border-tssk-teal focus:ring-2 focus:ring-tssk-teal/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••"
                        className="h-12 text-base bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 focus:border-tssk-teal focus:ring-2 focus:ring-tssk-teal/20 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••"
                        className="h-12 text-base bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 focus:border-tssk-teal focus:ring-2 focus:ring-tssk-teal/20 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-purple-600 to-tssk-teal hover:from-purple-700 hover:to-tssk-teal-dark text-white transition-all duration-300 shadow-lg hover:shadow-tssk-teal/20 hover:scale-[1.01]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Sign Up
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
            
            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700"></div>
              <span className="text-xs text-slate-400">or continue with</span>
              <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700"></div>
            </div>
            
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="signup_with"
                shape="rectangular"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

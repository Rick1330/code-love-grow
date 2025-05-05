
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
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { GoogleLogin } from '@react-oauth/google';
import { ForgotPasswordForm } from "./ForgotPasswordForm";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const { login, googleLogin } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const success = await login(data.email, data.password);
      if (!success) {
        // Error message is handled by the login function
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log("Google login success:", credentialResponse);
      setIsGoogleLoading(true);
      
      if (credentialResponse.credential) {
        const success = await googleLogin(credentialResponse.credential);
        if (!success) {
          // Error message is handled by the googleLogin function
        }
      } else {
        throw new Error("No credential received from Google");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Google Login Failed",
        description: "Unable to authenticate with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
    toast({
      title: "Google Login Failed",
      description: "Authentication with Google was cancelled or failed.",
      variant: "destructive",
    });
  };

  if (showForgotPassword) {
    return <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="relative z-10">
      {/* Glass card effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-tssk-teal/10 to-purple-500/10 blur-xl rounded-2xl"></div>
      
      <div className="relative backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border border-white/20 shadow-xl rounded-2xl p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-tssk-teal to-purple-600 bg-clip-text text-transparent">Welcome back</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to continue your journey</p>
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300">Email</FormLabel>
                  <FormControl>
                    <Input 
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
                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      className="text-xs text-tssk-teal hover:text-tssk-teal-dark mt-1 hover:underline transition-all"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-tssk-teal to-purple-500 hover:from-tssk-teal-dark hover:to-purple-600 text-white transition-all duration-300 shadow-lg hover:shadow-tssk-teal/20 hover:scale-[1.01]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
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
              {isGoogleLoading ? (
                <div className="h-12 w-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-tssk-teal"></div>
                </div>
              ) : (
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  useOneTap
                  text="signin_with"
                  shape="rectangular"
                />
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}


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
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
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
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await register(data.name, data.email, data.password);
    setIsLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log("Google signup success:", credentialResponse);
      // In a real implementation, you would send this token to your backend
      // await authAPI.googleLogin({ token: credentialResponse.credential });
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
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
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
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-purple-600 to-tssk-teal hover:from-purple-700 hover:to-tssk-teal-dark text-black dark:text-white transition-all duration-300 shadow-lg hover:shadow-tssk-teal/20 hover:scale-[1.01]"
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
            
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                className="bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
                  <path fill="currentColor" d="M11.9999 12.223C11.9999 14.223 10.2091 15.801 8.22303 15.801C6.23699 15.801 4.44611 14.223 4.44611 12.223C4.44611 10.223 6.23699 8.80078 8.22303 8.80078C10.2091 8.80078 11.9999 10.223 11.9999 12.223ZM15.1115 8.80078C14.1387 8.80078 13.3339 9.52699 13.3339 10.4232V14.0228C13.3339 14.9189 14.1387 15.6451 15.1115 15.6451C16.0843 15.6451 16.8891 14.9189 16.8891 14.0228V10.4232C16.8891 9.52699 16.0843 8.80078 15.1115 8.80078ZM19.5553 8.80078C18.8381 8.80078 18.2561 9.33909 18.2561 10V14.446C18.2561 15.1069 18.8381 15.6452 19.5553 15.6452C20.2725 15.6452 20.8545 15.1069 20.8545 14.446V10C20.8545 9.33909 20.2725 8.80078 19.5553 8.80078Z" />
                </svg>
              </Button>
              
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  shape="rectangular"
                  size="large"
                  useOneTap
                />
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
                  <path fill="currentColor" d="M21.5182 15.6951C21.2928 16.2391 21.0388 16.7555 20.7334 17.2511C20.2871 17.9839 19.9355 18.4979 19.6804 18.7931C19.2817 19.2547 18.8557 19.5403 18.4009 19.6508C18.0861 19.7266 17.7376 19.7539 17.3557 19.7329C16.974 19.7118 16.5998 19.6454 16.2332 19.5335C15.8663 19.4208 15.5199 19.2923 15.1933 19.1477C14.8663 19.0025 14.5518 18.8427 14.2489 18.6676C13.6203 18.3339 13.0493 17.9271 12.5351 17.4462C12.0208 16.9655 11.5646 16.431 11.1663 15.843C10.7684 15.255 10.4329 14.6263 10.16 13.9565C9.88748 13.2873 9.70445 12.6103 9.61059 11.9266C9.52729 11.3337 9.53728 10.7339 9.64051 10.1276C9.74379 9.52093 9.92444 8.96526 10.1825 8.46048C10.4406 7.95517 10.763 7.50307 11.1497 7.10371C11.5369 6.70435 11.9783 6.37979 12.4745 6.12958C12.7719 5.9836 13.1338 5.87452 13.5601 5.80241C13.9859 5.72994 14.4186 5.72661 14.8576 5.79166C15.2965 5.85728 15.7012 5.97244 16.0717 6.13748C16.4423 6.30308 16.7775 6.50349 17.0779 6.73925C17.3783 6.97502 17.6654 7.25368 17.9394 7.57392C17.7693 7.67593 17.5778 7.79831 17.3649 7.94087C17.1515 8.08399 16.9266 8.24086 16.6903 8.41273C16.4537 8.58459 16.2147 8.76195 15.973 8.94532C15.7313 9.12869 15.5198 9.30882 15.3391 9.48559C14.8553 9.9246 14.5151 10.4652 14.3188 11.1065C14.1229 11.7484 14.0886 12.4128 14.2155 13.0995C14.3425 13.7867 14.6413 14.4144 15.1121 14.9828C15.5825 15.5511 16.2426 15.9902 17.0923 16.3004C17.3997 16.4055 17.7163 16.4579 18.0427 16.4579C18.5418 16.4579 19.0282 16.3044 19.5025 15.998C20.1707 15.5454 20.6474 14.9797 20.9323 14.3023C21.2177 13.625 21.3071 12.9175 21.2014 12.1794C21.0958 11.4413 20.8038 10.7512 20.3255 10.1097C19.8471 9.46796 19.2445 8.94225 18.5184 8.53171C17.792 8.1217 16.9821 7.87268 16.0882 7.78513C15.1944 7.69703 14.2939 7.79963 13.3863 8.09231C12.4788 8.38553 11.6936 8.86707 11.0299 9.53865C10.3666 10.2096 9.86885 11.0751 9.53764 12.1348C9.14658 13.3815 9.20463 14.6082 9.71147 15.8158C10.2183 17.024 11.033 18.0147 12.156 18.7879C12.5378 19.0504 12.9421 19.2852 13.3693 19.492C13.7959 19.6993 14.2464 19.8755 14.7207 20.0209C15.195 20.1665 15.6814 20.2715 16.1805 20.3362C16.6802 20.4009 17.1814 20.4171 17.6856 20.3847C18.3651 20.3362 19.0111 20.1579 19.6233 19.8503C20.2359 19.5422 20.7767 19.1093 21.2462 18.5525C21.7156 17.995 22.1013 17.322 22.4029 16.5328C22.7045 15.7431 22.8939 14.8666 22.9719 13.9038C23.0279 13.1845 22.9847 12.4961 22.8424 11.8377C22.7 11.1798 22.4738 10.5587 22.1642 9.97522C21.8539 9.39233 21.4649 8.86216 20.9965 8.38499C20.528 7.90837 19.9641 7.52522 19.3048 7.23537C18.3835 6.82483 17.4657 6.66761 16.5502 6.76346C15.6347 6.85986 14.7863 7.15858 14.0044 7.66003C13.2225 8.16231 12.539 8.8932 11.9534 9.85314C11.3682 10.813 11.0255 11.9528 10.9253 13.2722C10.8425 14.3298 11.0055 15.308 11.4139 16.2062C11.8222 17.1044 12.3934 17.8678 13.1273 18.4966C13.8617 19.126 14.7134 19.5929 15.6839 19.898C16.6539 20.203 17.6513 20.2564 18.6762 20.0576C19.1727 19.9603 19.6475 19.7889 20.1 19.5437C20.5532 19.298 20.9621 18.9833 21.3258 18.5999C21.6899 18.2164 22.001 17.7778 22.2602 17.2845C22.5191 16.7906 22.7004 16.2593 22.8038 15.6902C22.6445 15.7119 22.4711 15.7337 22.2831 15.7553C22.095 15.7775 21.8998 15.7452 21.6974 15.6591C21.6369 15.6756 21.5789 15.6863 21.5218 15.6902L21.5182 15.6951Z" />
                </svg>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

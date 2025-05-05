
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
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { authAPI } from "@/services/api";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      // Ensure we're passing a non-optional email string
      await authAPI.forgotPassword({ email: data.email });
      
      toast({
        title: "Password Reset Email Sent",
        description: "Check your inbox for instructions to reset your password.",
      });
      
      // Optionally return to login form after a delay
      setTimeout(() => {
        onBack();
      }, 3000);
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: "Failed to send password reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10">
      {/* Glass card effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-tssk-teal/10 to-purple-500/10 blur-xl rounded-2xl"></div>
      
      <div className="relative backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border border-white/20 shadow-xl rounded-2xl p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-tssk-teal to-purple-600 bg-clip-text text-transparent">Forgot Password</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Enter your email to receive reset instructions</p>
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
            
            <div className="flex flex-col gap-2">
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-tssk-teal to-purple-600 hover:from-tssk-teal-dark hover:to-purple-700 text-white transition-all duration-300 shadow-lg hover:shadow-tssk-teal/20 hover:scale-[1.01]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                    Sending Email...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
              
              <Button 
                type="button"
                variant="ghost" 
                className="w-full flex items-center justify-center gap-2 text-slate-600 hover:text-tssk-teal dark:text-slate-300"
                onClick={onBack}
              >
                <ArrowLeft size={16} />
                Back to Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

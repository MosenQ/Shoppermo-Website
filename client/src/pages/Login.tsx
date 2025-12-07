import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Store, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.jpg";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/merchant/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("merchantToken", data.token);
        sessionStorage.setItem("merchantUsername", data.username);
        toast({
          title: "Welcome back!",
          description: "Successfully logged in to Merchant Dashboard.",
        });
        setLocation("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-16 bg-white relative">
        <div className="flex items-center justify-between mb-12">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back to Home</span>
            </div>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto flex-grow flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="Shoppermo" className="w-10 h-10 rounded-xl shadow-sm" />
            <span className="font-['Pacifico'] text-2xl text-foreground pt-1">
              Shoppermo
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Merchant Login</h1>
            <p className="text-muted-foreground">
              Welcome back! Please enter your credentials to access your store dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="Enter your username" 
                className="h-12 rounded-xl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                data-testid="input-username"
                required 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary font-medium hover:underline">Forgot password?</a>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                className="h-12 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
                required 
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm" data-testid="text-login-error">{error}</p>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" data-testid="checkbox-remember" />
              <Label htmlFor="remember" className="font-medium cursor-pointer">Remember me for 30 days</Label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base font-bold" 
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/business">
                <a className="text-primary font-bold hover:underline">Apply as a Merchant</a>
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-auto pt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Shoppermo. All rights reserved.
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative overflow-hidden items-center justify-center text-white p-12">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-gray-900/80"></div>
        
        <div className="relative z-10 max-w-lg text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-2xl">
            <Store size={40} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Manage your shop from anywhere</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Update inventory, track local foot traffic analytics, and launch flash sales to nearby customers in seconds.
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <div className="text-2xl font-bold mb-1">+127%</div>
              <div className="text-xs text-gray-400">Avg. Foot Traffic</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <div className="text-2xl font-bold mb-1">4.9/5</div>
              <div className="text-xs text-gray-400">Merchant Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

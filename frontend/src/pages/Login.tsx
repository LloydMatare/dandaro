import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/useLogin";
import { useState } from "react";
import { Link } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    await login(email, password);
    console.log("Logged in");
  };

  return (
    <AuthLayout>
      <div className="p-8 border rounded-lg w-1/2">
        <div className="my-4">
          <p className="text-2xl font-bold">Welcome back</p>
          <p className="text-sm text-slate-400">Please login to your account</p>
        </div>
        <form action="" className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full" disabled={loading}>
            {loading ? <p>Loading....</p> : <p>Login</p>}
          </Button>
        </form>
        <div className="flex items-center gap-2 mt-4">
          <p className="">Dont have an account ?</p>
          <Link to="/register" className="font-bold">
            Create Account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;

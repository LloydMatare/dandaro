import GenderCheckbox from "@/components/GenderCheckbox";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegister from "@/hooks/useRegister";
import { useState } from "react";
import { Link } from "react-router";

function Register() {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { register } = useRegister();

  const handleGenderInputs = (gender: any) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await register(inputs);
    console.log(inputs);
  };
  return (
    <AuthLayout>
      <div className="p-8 border rounded-lg w-1/2">
        <div className="my-4">
          <p className="text-2xl font-bold">Create</p>
          <p className="text-sm text-slate-400">
            Please fill in the details to create an account
          </p>
        </div>
        <form action="" className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              placeholder="Enter your fullname"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="Enter your email address"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              placeholder="Confirm your password"
              type="password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <GenderCheckbox
            oncheckboxChange={handleGenderInputs}
            selectedGender={inputs.gender}
          />
          <Button className="w-full">Register</Button>
        </form>
        <div className="flex items-center gap-2 mt-4">
          <p className="">Already have an account ?</p>
          <Link to="/login" className="font-bold">
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const res = signIn(data);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Welcome back!");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            className="w-full border rounded p-2"
            {...register("email", {required: "Email is required",
            pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Enter a valid email",},})}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        New here? <Link className="text-blue-600" to="/signup">Create an account</Link>
      </p>
    </div>
  );
}

// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// function SignIn() {
//   const { signIn } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     signIn(email, password);
//     navigate('/dashboard');  // ⬅️ After signing in, go to dashboard
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Sign In</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 rounded w-full"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 rounded w-full"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignIn;

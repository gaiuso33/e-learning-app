import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    const res = await signUp({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Account created! Welcome 🎉");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Full name</label>
          <input
            className="w-full border rounded p-2"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <p className="text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            className="w-full border rounded p-2"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
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
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Confirm password</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            {...register("confirmPassword", {
              validate: (v) => v === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Sign up"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account? <Link className="text-blue-600" to="/signin">Sign in</Link>
      </p>
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// function SignUp() {
//   const { user, signIn } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user) {
//       navigate('/dashboard'); // <-- redirect if already signed in
//     }
//   }, [user, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError('Please enter email and password.');
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       signIn(email, password);
//       navigate('/dashboard');
//     }, 1500);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => { setEmail(e.target.value); setError(''); }}
//           className="border w-full p-2 mb-4 rounded"
//           disabled={loading}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => { setPassword(e.target.value); setError(''); }}
//           className="border w-full p-2 mb-4 rounded"
//           disabled={loading}
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//           disabled={loading}
//         >
//           {loading ? 'Creating account...' : 'Create Account'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignUp;

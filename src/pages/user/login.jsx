import React, { useState } from "react";
import { authenticateUser } from "../../dataService";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authenticateUser(formData.email, formData.password);

      if (data.length > 0) {
        const user = data[0];
        delete user.password;
        sessionStorage.setItem("user", btoa(JSON.stringify(user)));
        if (user.role === "manager") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/product";
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Error during authentication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen bg-white">
      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-display text-text-dark mb-2">Welcome Back</h1>
            <p className="text-text-gray">Sign Up For Free</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg-main rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg-main rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRemember(!remember)}>
              {remember ? <FiCheckSquare className="text-primary" /> : <FiSquare className="text-text-gray" />}
              <span className="text-xs text-text-dark">I agree to all Term, Privacy Policy and fees</span>
            </div>

            {error && <div className="text-error text-center text-sm bg-error/10 p-2 rounded-lg">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-shadow shadow-lg shadow-primary/30 disabled:opacity-70"
            >
              {loading ? "Signing In..." : "Get Started"}
            </button>
          </form>

          <div className="relative text-center my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <span className="relative px-4 bg-white text-xs text-text-gray uppercase">OR</span>
          </div>

          <div className="space-y-4">
            <button className="w-full py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-3 text-sm font-medium hover:bg-gray-50 transition-colors">
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>
            <button className="w-full py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-3 text-sm font-medium hover:bg-gray-50 transition-colors">
              <FaFacebook className="text-xl text-blue-600" />
              Sign in with Facebook
            </button>
          </div>

          <div className="text-center text-sm text-text-gray mt-8">
            Already have an account? <a href="/" className="text-primary font-bold hover:underline">Login</a>
          </div>
        </div>
      </div>

      {/* Right Side: Image/Background */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-pink-500">
          {/* Abstract Shapes or Image Overlay */}
          <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute w-96 h-96 bg-secondary/30 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

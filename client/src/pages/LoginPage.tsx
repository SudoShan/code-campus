import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailShake, setEmailShake] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [passwordShake, setPasswordShake] = useState(false);

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is mandatory';
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email) ? '' : 'Please enter a valid email address';
  };

  const validatePassword = (pwd: string): string => {
    return pwd ? '' : 'Password is mandatory';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const pwdErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordErrorMsg(pwdErr);
    setEmailShake(!!emailErr);
    setPasswordShake(!!pwdErr);

    if (!emailErr && !pwdErr) {
      alert('Login successful!');
    }
  };

  useEffect(() => {
    if (emailShake) {
      const timer = setTimeout(() => setEmailShake(false), 300);
      return () => clearTimeout(timer);
    }
  }, [emailShake]);

  useEffect(() => {
    if (passwordShake) {
      const timer = setTimeout(() => setPasswordShake(false), 300);
      return () => clearTimeout(timer);
    }
  }, [passwordShake]);

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.3s ease;
        }
      `}</style>
      <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-sm">
  <Link to="/" className="text-xl font-bold hover:text-yellow-400 transition flex items-center">
    <span className="text-white">CODE</span>{' '}
    <span className="text-yellow-400 ml-1">CAMPUS</span>
  </Link>
</header>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[url('./assets/bg.png')] bg-cover bg-center px-4 space-y-6">
        {/* CODE CAMPUS Heading */}
        <h1 className="text-4xl font-bold text-white">
          <span className="text-white">CODE</span>{' '}
          <span className="text-yellow-300">CAMPUS</span>
        </h1>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg p-6 rounded-lg w-full max-w-sm text-white text-sm space-y-4"
        >
          <h2 className="text-xl font-semibold text-center">Login</h2>

          {/* Email Field */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              className={`px-3 py-2 rounded bg-white text-black border ${
                emailError ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-blue-500 ${emailShake ? 'shake' : ''}`}
              placeholder="e.g. user@example.com"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErrorMsg('');
              }}
              className={`px-3 py-2 rounded bg-white text-black border ${
                passwordErrorMsg ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-blue-500 ${passwordShake ? 'shake' : ''}`}
              placeholder="Enter your password"
            />
            {passwordErrorMsg && (
              <div>
                <p className="text-red-500">{passwordErrorMsg}</p>
                <Link to="/forgot-password" className="text-blue-300 text-xs hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>

          {/* Signup Prompt */}
          <p className="text-center text-xs">
            Not registered?{' '}
            <Link to="/signup" className="text-yellow-300 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;

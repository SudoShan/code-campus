import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error message states
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Shake animation on error
  const [shake, setShake] = useState(false);

  const validateEmail = (email) => {
    // simple email regex check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors first
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    let hasError = false;

    if (!username.trim()) {
      setUsernameError('Username is required');
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email.trim())) {
      setEmailError('Enter a valid email');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (hasError) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    alert('Sign up submitted!');
  };

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .shake {
          animation: shake 0.3s ease;
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-[40vw_60vw] h-screen">
        {/* Left Side: Glassmorphism form over background */}
        <div
          className="relative bg-[url('./assets/bg.png')] bg-cover bg-center flex justify-center items-center px-6"
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            className={`backdrop-blur-xl bg-white/10 border border-white/30 shadow-xl p-8 md:p-12 rounded-xl w-full max-w-md flex flex-col gap-6 md:gap-8 text-white ${
              shake ? 'shake' : ''
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6">
              Create Account
            </h2>

            <div className="flex flex-col">
              <label htmlFor="username" className="mb-2 text-lg md:text-xl font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={`p-3 md:p-5 rounded-lg bg-white text-black border ${
                  usernameError ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 ${
                  usernameError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } text-base md:text-lg`}
              />
              {usernameError && (
                <p className="text-red-500 mt-1 text-sm font-medium select-none">{usernameError}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-lg md:text-xl font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`p-3 md:p-5 rounded-lg bg-white text-black border ${
                  emailError ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 ${
                  emailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } text-base md:text-lg`}
              />
              {emailError && (
                <p className="text-red-500 mt-1 text-sm font-medium select-none">{emailError}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-lg md:text-xl font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`p-3 md:p-5 rounded-lg bg-white text-black border ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 ${
                  passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } text-base md:text-lg`}
              />
              {passwordError && (
                <p className="text-red-500 mt-1 text-sm font-medium select-none">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 md:py-4 rounded font-semibold hover:bg-blue-700 transition text-lg cursor-pointer"
            >
              Sign Up
            </button>

            <p className="text-center text-sm md:text-base mt-2">
              Already registered?{' '}
              <Link
                to="/login"
                className="text-yellow-400 hover:underline font-semibold cursor-pointer"
              >
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side: Blue box with welcome text */}
        <div className="bg-blue-700 flex flex-col justify-center items-center text-center px-6">
          
          <h1 className="text-yellow-400 font-bold text-[60px] md:text-[80px] leading-none select-none">
            WELCOME BACK!!!!
          </h1>
          <p className="text-indigo-200 italic mt-8 text-[18px] md:text-[24px] max-w-md select-none">
            Let's rock the world
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

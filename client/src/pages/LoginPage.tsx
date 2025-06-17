import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailShake, setEmailShake] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
    number: false,
  });
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [passwordShake, setPasswordShake] = useState(false);

  // Validate email with specific messages
  const validateEmail = (email) => {
    if (!email) return 'Email is mandatory';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return 'Please enter a valid email address';
    return '';
  };

  // Validate password with detailed errors
  const validatePassword = (pwd) => {
    const errors = {
      length: pwd.length < 8,
      uppercase: !/[A-Z]/.test(pwd),
      specialChar: !/[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      number: !/\d/.test(pwd),
    };
    setPasswordErrors(errors);

    // Compose specific message
    if (!pwd) return 'Password is mandatory';

    const missing = [];
    if (errors.length) missing.push('at least 8 characters');
    if (errors.uppercase) missing.push('one uppercase letter');
    if (errors.specialChar) missing.push('one special character');
    if (errors.number) missing.push('one number');

    if (missing.length === 0) return ''; // no errors
    return 'Password must contain ' + missing.join(', ');
  };

  // Check if password valid
  const isPasswordValid = Object.values(passwordErrors).every((v) => v === false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    setEmailError(emailErr);
    if (emailErr) setEmailShake(true);

    const pwdErr = validatePassword(password);
    setPasswordErrorMsg(pwdErr);
    if (pwdErr) setPasswordShake(true);

    if (emailErr || pwdErr) return;

    alert('Form submitted successfully!');
  };

  // Remove shake animation after 300ms so it can be triggered again
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
      {/* Add this style once globally or inside your CSS */}
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

      <div className="grid grid-cols-1 md:grid-cols-[60vw_40vw] h-screen">
        {/* Left Side */}
        <div className="bg-blue-700 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-white font-extrabold text-[50px] md:text-[70px] leading-none select-none">CODE</h1>
          <h1 className="text-yellow-400 font-bold text-[60px] md:text-[80px] mt-3.5 leading-none select-none">CAMPUS</h1>
          <p className="text-indigo-200 italic mt-8 text-[18px] md:text-[24px] max-w-md select-none">
            A platform where coding is made easier
          </p>
        </div>

        {/* Right Side */}
        <div
          className="bg-[url('./assets/bg.png')] bg-cover bg-center flex justify-center items-center px-6"
        >
          <form
            className="backdrop-blur-xl bg-white/10 border border-white/30 shadow-xl p-8 md:p-12 rounded-xl w-full max-w-md flex flex-col gap-6 md:gap-8 text-white"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6">Login</h2>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-lg md:text-xl font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                className={`p-3 md:p-5 rounded-lg bg-white text-black border ${
                  emailError ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg ${
                  emailShake ? 'shake' : ''
                }`}
                placeholder="Enter your email"
              />
              {emailError && (
                <p className="text-red-500 mt-1 text-sm md:text-base">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-lg md:text-xl font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordErrorMsg('');
                }}
                className={`p-3 md:p-5 rounded-lg bg-white text-black border ${
                  passwordErrorMsg ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg ${
                  passwordShake ? 'shake' : ''
                }`}
                placeholder="Enter your password"
              />
              {passwordErrorMsg && (
                <p className="text-red-500 mt-1 text-sm md:text-base">{passwordErrorMsg}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 md:py-4 rounded font-semibold hover:bg-blue-700 transition text-lg cursor-pointer"
            >
              Submit
            </button>

            {/* Signup link */}
            <p className="text-center text-sm md:text-base mt-2">
              Not registered?{' '}
              <Link
                to="/signup"
                className="text-yellow-400 hover:underline font-semibold cursor-pointer"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
interface PasswordErrors {
  length: boolean;
  uppercase: boolean;
  specialChar: boolean;
  number: boolean;
}

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [usernameShake, setUsernameShake] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailShake, setEmailShake] = useState(false);

  const [password, setPassword] = useState('');
  const [_, setPasswordErrors] = useState<PasswordErrors>({
    length: false,
    uppercase: false,
    specialChar: false,
    number: false,
  });
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [passwordShake, setPasswordShake] = useState(false);

  const validateUsername = (name: string): string => {
    if (!name) return 'Username is mandatory';
    if (/\s/.test(name)) return 'Username cannot contain spaces';
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is mandatory';
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email) ? '' : 'Please enter a valid email address';
  };

  const validatePassword = (pwd: string): string => {
    const errors: PasswordErrors = {
      length: pwd.length < 8,
      uppercase: !/[A-Z]/.test(pwd),
      specialChar: !/[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      number: !/\d/.test(pwd),
    };
    setPasswordErrors(errors);

    if (!pwd) return 'Password is mandatory';

    const missing: string[] = [];
    if (errors.length) missing.push('at least 8 characters');
    if (errors.uppercase) missing.push('one uppercase letter');
    if (errors.specialChar) missing.push('one special character');
    if (errors.number) missing.push('one number');

    return missing.length ? 'Password must contain ' + missing.join(', ') : '';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameErr = validateUsername(username);
    const emailErr = validateEmail(email);
    const pwdErr = validatePassword(password);

    setUsernameError(usernameErr);
    setEmailError(emailErr);
    setPasswordErrorMsg(pwdErr);

    setUsernameShake(!!usernameErr);
    setEmailShake(!!emailErr);
    setPasswordShake(!!pwdErr);

    if (!usernameErr && !emailErr && !pwdErr) {
      alert('Signup successful!');
      // Add actual signup logic here
    }
  };

  useEffect(() => {
    if (usernameShake) {
      const timer = setTimeout(() => setUsernameShake(false), 300);
      return () => clearTimeout(timer);
    }
  }, [usernameShake]);

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

      <div className="h-screen flex flex-col items-center justify-center bg-[url('./assets/bg.png')] bg-cover bg-center px-4 space-y-6">
        {/* CODE CAMPUS Heading */}
        <h1 className="text-4xl font-bold text-white">
          <span className="text-white">CODE</span>{' '}
          <span className="text-yellow-300">CAMPUS</span>
        </h1>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg p-6 rounded-lg w-full max-w-sm text-white text-sm space-y-4"
        >
          <h2 className="text-xl font-semibold text-center">Sign Up</h2>

          {/* Username Field */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="font-medium">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError('');
              }}
              className={`px-3 py-2 rounded bg-white text-black border ${
                usernameError ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-blue-500 ${usernameShake ? 'shake' : ''}`}
              placeholder="Enter your username"
            />
            {usernameError && <p className="text-red-500">{usernameError}</p>}
          </div>

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
              placeholder="Enter password"
            />
            {passwordErrorMsg && <p className="text-red-500">{passwordErrorMsg}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          {/* Login Prompt */}
          <p className="text-center text-xs">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-300 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
        <Footer/>
      </div>
    </>
  );
};

export default SignupPage;

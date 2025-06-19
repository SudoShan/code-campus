import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const sections = [
  {
    id: 'about',
    title: 'About Us',
    text: 'Code Campus is a vibrant community of learners and creators. We help you learn, build and grow.',
  },
  {
    id: 'features',
    title: 'Features',
    text: '• Hands-on Projects\n• Mentorship\n• Real-world Experience\n• Community Support',
  },
  {
    id: 'contact',
    title: 'Contact',
    text: 'Email us at contact@codecampus.dev or follow us on social media.',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold">
          <span className="text-white">CODE</span>{' '}
          <span className="text-yellow-400">CAMPUS</span>
        </h1>
        <nav className="space-x-4 text-sm md:text-base">
          <a href="#about" className="hover:text-yellow-400 transition">About</a>
          <a href="#features" className="hover:text-yellow-400 transition">Features</a>
          <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
          
          <Link to="/login" className="text-yellow-400 hover:underline font-medium">Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center items-center px-6 text-center pt-20">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold"
        >
          <span className="text-white">CODE</span>{' '}
          <span className="text-yellow-400">CAMPUS</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-xl text-lg text-white/80"
        >
          Learn. Build. Grow. Transform your ideas into code with us.
        </motion.p>
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 px-6 py-3 bg-yellow-400 text-black font-semibold rounded shadow hover:bg-yellow-500 transition"
        >
          Explore More
        </motion.a>
      </div>

      {/* Info Sections */}
      {sections.map((section) => (
        <motion.section
          id={section.id}
          key={section.id}
          className="py-24 px-6 max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4">{section.title}</h2>
          <p className="text-white/80 whitespace-pre-line">{section.text}</p>
        </motion.section>
      ))}

      {/* Footer */}
      <footer className="bg-black/50 text-center text-white/70 py-6 mt-auto">
        &copy; {new Date().getFullYear()} Code Campus. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

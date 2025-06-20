import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AceEditor from 'react-ace';
import { Link } from 'react-router-dom';

// Ace modes and theme
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/ext-language_tools';

import bgImage from '../assets/bg.png';
import Footer from '../components/Footer';

const questions = [
  "Given an integer `n`, return the factorial of `n`.",
  "Given a list of numbers, find the maximum.",
  "Check whether a string is a palindrome."
];

type Language = 'python' | 'cpp' | 'java';

export default function AssignmentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState<'question' | 'testcase'>('question');
  const [activeTestcase, setActiveTestcase] = useState(0);
  const [showOutputs, setShowOutputs] = useState(false);
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState<string>({
    python: '# Write your Python code here\n',
    cpp: '// Write your C++ code here\n',
    java: '// Write your Java code here\n',
  }['python']);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // For horizontal resizing
  const [leftPanelWidthPercent, setLeftPanelWidthPercent] = useState(50);
  const resizingRef = useRef(false);

  const testcases = [
    { input: "5", expected: "120", actual: "120" },
    { input: "0", expected: "1", actual: "1" }
  ];

  // Close sidebar if clicked outside sidebar and toggle button
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        sidebarOpen &&
        sidebarRef.current &&
        toggleButtonRef.current &&
        !sidebarRef.current.contains(target) &&
        !toggleButtonRef.current.contains(target)
      ) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  // Resize handlers
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!resizingRef.current) return;

      let newLeftWidth = (e.clientX / window.innerWidth) * 100;
      newLeftWidth = Math.min(90, Math.max(10, newLeftWidth));
      setLeftPanelWidthPercent(newLeftWidth);
    }
    function handleMouseUp() {
      resizingRef.current = false;
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
    setCode({
      python: '# Write your Python code here\n',
      cpp: '// Write your C++ code here\n',
      java: '// Write your Java code here\n',
    }[lang]);
    setActiveTab('question');
    setActiveTestcase(0);
    setShowOutputs(false);
  };

  const handleRunOrSubmit = () => {
    setShowOutputs(true);
    setActiveTab('testcase');
  };

  return (
    <div
      className="flex flex-col h-screen text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#121212',
        fontFamily: 'Segoe UI, sans-serif',
        userSelect: resizingRef.current ? 'none' : 'auto',
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between bg-[#1E1E1E] px-4 py-3 shadow-md relative z-40">
        <div className="flex items-center">
          <button
            ref={toggleButtonRef}
            onClick={() => setSidebarOpen(prev => !prev)}
            className="text-2xl font-bold text-white hover:text-gray-300"
          >
            ☰
          </button>
          <Link to="/" className="text-xl mx-2.5 font-bold hover:text-yellow-400 transition flex items-center">
        <span className="text-white">CODE</span>{' '}
        <span className="text-yellow-400 ml-1">CAMPUS</span>
        </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              ref={sidebarRef}
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: 'tween' }}
              className="absolute top-0 left-0 h-full w-64 bg-[#252526] text-white shadow-lg z-30 p-4"
            >
              <h2 className="text-lg font-bold mb-4">Questions</h2>
              <div className="space-y-2">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveQuestion(i);
                      setActiveTab('question');
                      setSidebarOpen(false);
                      setShowOutputs(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      activeQuestion === i
                        ? 'bg-[#0E639C] font-bold'
                        : 'hover:bg-[#3E3E42]'
                    }`}
                  >
                    Question {i + 1}
                  </button>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex flex-1" style={{ userSelect: 'auto' }}>
          {/* Left Panel */}
          <section
            className="flex flex-col p-6 overflow-auto bg-[#1E1E1E] border-r border-[#333] custom-scrollbar"
            style={{ width: `${leftPanelWidthPercent}%` }}
          >
            {/* Tabs */}
            <div className="flex space-x-6 mb-4 border-b border-[#444]">
              <button
                onClick={() => setActiveTab('question')}
                className={`pb-2 text-white ${
                  activeTab === 'question'
                    ? 'border-b-2 border-white font-semibold'
                    : 'text-gray-400'
                }`}
              >
                Question
              </button>
              <button
                onClick={() => setActiveTab('testcase')}
                className={`pb-2 text-white ${
                  activeTab === 'testcase'
                    ? 'border-b-2 border-white font-semibold'
                    : 'text-gray-400'
                }`}
              >
                Testcases
              </button>
            </div>

            {/* Question box */}
            {activeTab === 'question' && (
              <div className="bg-[#252526] p-4 rounded shadow-inner">
                <p className="font-bold text-white mb-2">Question {activeQuestion + 1}</p>
                <p className="text-gray-300 text-sm">{questions[activeQuestion]}</p>
              </div>
            )}

            {/* Testcases */}
            {activeTab === 'testcase' && (
              <div className="flex flex-col">
                {/* Testcase selector */}
                <div className="flex space-x-3 mb-3">
                  {testcases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestcase(i)}
                      className={`px-4 py-1 rounded text-sm ${
                        i === activeTestcase
                          ? 'bg-[#0E639C] text-white'
                          : 'bg-[#2D2D30] text-gray-300 hover:bg-[#3E3E42]'
                      }`}
                    >
                      Case {i + 1}
                    </button>
                  ))}
                </div>

                {/* Input box */}
                <div className="bg-[#252526] p-4 rounded text-sm mb-3">
                  <p><strong className="text-white">Input:</strong></p>
                  <pre className="whitespace-pre-wrap text-gray-200">{testcases[activeTestcase].input}</pre>
                </div>

                {/* Show Expected and Actual only if showOutputs is true */}
                {showOutputs && (
                  <div className="flex flex-col space-y-4">
                    <div className="bg-[#252526] p-4 rounded text-sm">
                      <p><strong className="text-white">Expected Output:</strong></p>
                      <pre className="whitespace-pre-wrap text-gray-200">{testcases[activeTestcase].expected}</pre>
                    </div>
                    <div className="bg-[#252526] p-4 rounded text-sm">
                      <p><strong className="text-white">Your Output:</strong></p>
                      <pre className="whitespace-pre-wrap text-gray-200">{testcases[activeTestcase].actual}</pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Vertical splitter for resizing */}
          <div
            onMouseDown={() => (resizingRef.current = true)}
            className="cursor-col-resize bg-[#3C3C3C]"
            style={{ width: 6 }}
          />

          {/* Right Panel (Ace Editor) */}
          <section
            className="flex flex-col p-4 bg-[#1E1E1E]"
            style={{ width: `${100 - leftPanelWidthPercent}%` }}
          >
            <div className="mb-2 flex items-center">
              <label htmlFor="language" className="mr-2 text-yellow-400 font-semibold">
                Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="bg-[#252526] text-white px-2 py-1 rounded border border-[#3C3C3C]"
              >
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>

            {/* Ace Editor */}
            <div className="flex-grow border border-[#3C3C3C] rounded overflow-hidden shadow-inner">
              <AceEditor
                mode={language === 'cpp' ? 'c_cpp' : language}
                theme="tomorrow_night"
                value={code}
                onChange={setCode}
                name="code-editor"
                width="100%"
                height="100%"
                fontSize={14}
                showGutter={true}
                highlightActiveLine={false}
                showPrintMargin={false}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 4,
                }}
                editorProps={{ $blockScrolling: true }}
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleRunOrSubmit}
                className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500"
              >
                Run
              </button>
              <button
                onClick={handleRunOrSubmit}
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </section>
        </main>
        
      </div>
      
    </div>
    
  );
}

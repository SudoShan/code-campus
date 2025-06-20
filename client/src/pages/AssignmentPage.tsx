import React, { useState, useRef, useEffect } from 'react';
import AceEditor from 'react-ace';

// Ace modes and theme
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/ext-language_tools';

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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#1E1E1E',
        fontFamily: 'Segoe UI, sans-serif',
        userSelect: resizingRef.current ? 'none' : 'auto',
      }}
    >
      <div className="w-full h-[50px] bg-transparent"></div> {/* Placeholder for header */}

      <div className="flex flex-1 overflow-hidden relative">
        {/* Permanent horizontal question bar */}
        <div
          style={{
            width: 40,
            minWidth: 40,
            height: '100%',
            background: '#232323',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 0,
            zIndex: 20,
            borderRight: '1px solid #333',
            position: 'relative',
            overflowY: 'auto',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
          className="hide-scrollbar"
        >
          <div style={{ paddingTop: 12, width: '100%' }}>
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveQuestion(i);
                  setActiveTab('question');
                  setShowOutputs(false);
                }}
                style={{
                  width: 30,
                  height: 30,
                  marginBottom: 6,
                  marginLeft: 4,
                  borderRadius: 6,
                  background: activeQuestion === i ? '#facc15' : 'transparent',
                  color: activeQuestion === i ? '#222' : '#fff',
                  fontWeight: activeQuestion === i ? 700 : 500,
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s',
                  boxShadow: activeQuestion === i ? '0 2px 8px #facc1555' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15
                }}
                onMouseOver={e => {
                  if (activeQuestion !== i) e.currentTarget.style.background = '#3E3E42';
                }}
                onMouseOut={e => {
                  if (activeQuestion !== i) e.currentTarget.style.background = 'transparent';
                }}
                title={`Question ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

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
                className={`pb-2 cursor-pointer ${
                  activeTab === 'question'
                    ? 'border-b-2 border-white font-semibold text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Question
              </button>
              <button
                onClick={() => setActiveTab('testcase')}
                className={`pb-2 cursor-pointer ${
                  activeTab === 'testcase'
                    ? 'border-b-2 border-white font-semibold text-white'
                    : 'text-gray-400 hover:text-white'
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
                      className={`px-4 py-1 rounded text-sm cursor-pointer ${
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
                Language
              </label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="bg-[#252526] text-white px-2 py-0.5 rounded border border-[#3C3C3C] cursor-pointer"
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
                className="bg-yellow-400 text-black font-semibold px-4 py-1 rounded hover:bg-yellow-500 cursor-pointer"
              >
                Run
              </button>
              <button
                onClick={handleRunOrSubmit}
                className="bg-blue-600 text-white font-semibold px-4 py-1 rounded hover:bg-blue-700 cursor-pointer"
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

/* Add this CSS somewhere global or in the file */
/*
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/

"use client"; // Client Component for Next.js

import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

function ScratchCodeVerifier({ apiUrl }) {
  const [input, setInput] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  // Scratch code verify function
  const verifyScratchCode = async () => {
    if (!input.trim()) {
      setResponseMessage('Please enter a scratch code.');
      return;
    }

    setLoading(true);
    console.log('Input code:', input); // Debugging code

    try {
      const response = await fetch(apiUrl || '/api/scratch-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: input }),
      });

      const data = await response.json();
      console.log('Response from API:', data); // Debugging code
      setLoading(false);

      if (response.ok) {
        setResponseMessage(`✅ Success: ${data.message}`);
      } else {
        setResponseMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error verifying scratch code:", error);
      setLoading(false);
      setResponseMessage('An error occurred. Please try again later.');
    }

    setInput('');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-16 right-5 bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 shadow-lg rounded-lg p-4 w-80 z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Scratch Code Verification</h3>
        <button onClick={() => setIsVisible(false)} className="text-white hover:text-red-700">
          <IoClose size={24} />
        </button>
      </div>

      <div className="max-h-60 overflow-y-auto mb-3">
        {responseMessage && (
          <div className="flex justify-start">
            <span className={`p-2 rounded-lg ${responseMessage.includes('Success') ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
              {responseMessage}
            </span>
          </div>
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your scratch code"
          className="border rounded-lg p-2 flex-grow mr-2"
        />
        <button
          onClick={verifyScratchCode}
          className="bg-green-500 text-white rounded-lg p-2"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  );
}

export default ScratchCodeVerifier;

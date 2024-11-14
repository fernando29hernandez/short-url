import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API URL (Make sure this is the correct URL for the shortening service)
const SHORT_URL_API = `https://smolurl.com/api/links`;

const Form = () => {
  const [shortenedLink, setShortenedLink] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('Copy URL to Clipboard');

  const notify = (message) => toast.info(message);

  const fetchData = async () => {
    if (userInput === '' || !userInput.trim()) {
      notify('Please enter a valid URL.');
      return;
    }

    setIsLoading(true);
    try {
      const headers = {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      };
      const { data } = await axios.post(SHORT_URL_API, { url: userInput }, headers);
      setShortenedLink(data.data.short_url);
    } catch (e) {
      notify('Error generating the shortened URL.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text) => {
    if (!text.trim()) {
      notify('Nothing is copied.');
      return;
    }
    setCopyButtonText('Copied!');
    setTimeout(() => setCopyButtonText('Copy URL to Clipboard'), 2000);
    notify('URL Copied.');
  };

  const handleClear = () => {
    setShortenedLink('');
    setUserInput('');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen  p-4 sm:p-6">
      <ToastContainer position="bottom-right" theme="dark" />

      {/* Form container with border */}
      <div className="w-full max-w-lg p-6 rounded-lg shadow-md border-4 border-blue-500">
        <h1 className="text-2xl font-medium text-blue-500 text-center mb-6">
          URL Shortener
        </h1>

        {/* First Row: Input and Submit Button */}
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-6 h-[auto]">
          <input
            type="text"
            placeholder="Enter link to be shortened"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="border-2 border-blue-500 rounded-md w-full sm:w-8/12 px-4 py-2 mb-4 sm:mb-0"
          />
          <button
            onClick={fetchData}
            className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium w-full sm:w-4/12"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Submit URL'}
          </button>
        </div>

        {/* Second Row: Copy and Clear Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mb-6 h-[auto] gap-2">
          <CopyToClipboard text={shortenedLink} onCopy={() => handleCopy(shortenedLink)}>
            <button
              className="bg-gray-500 text-white px-6 py-2 rounded-md font-medium w-full sm:w-5.5/12 mb-4 sm:mb-0"
              disabled={!shortenedLink}
            >
              {copyButtonText}
            </button>
          </CopyToClipboard>
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-6 py-2 rounded-md font-medium w-full sm:w-5.5/12"
          >
            Clear
          </button>
        </div>

        {/* Third Row: Display Shortened URL */}
        <div className="bg-white rounded-md p-6 border-4 border-blue-500 text-center h-[200px] sm:h-[150px]">
          {shortenedLink ? (
            <a href={shortenedLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {shortenedLink}
            </a>
          ) : (
            <p className="text-gray-500">Shortened URL will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;

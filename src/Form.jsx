import "./App.css";
import { React, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";


const  Form =()=> {
  const [shortenedLink, setShortenedLink] = useState("");
  const [userInput, setUserInput] = useState("");

  const fetchData = async () => {
    try {
      const headers = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }}


      const {data} = await axios.post(
        `https://smolurl.com/api/links`,{
          url:userInput}, // This is the body part
        headers
      );

      console.log(data.data)
      setShortenedLink(data.data.short_url);
    } catch (e) {
      console.log(e);
    }
  };




  return (
    <>
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className=" text-center">
        <h1 className=" text-2xl font-medium text-blue-500 mb-4">
            <span className=" text-blue-400">URL Shortener</span>
        </h1>
        <div className=" justify-center justify-self-center items-center">
          <input
            className="outline-none border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-16 py-3 mb-4"
            type="text"
            placeholder="Enter link to be shortened"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button
            className=" bg-blue-500 text-white px-16  py-3 ml-4 rounded-md mb-4"
            onClick={() => {
              fetchData();
            }}
          >
            Submit URL
          </button>
          <div className="justify-center justify-self-center  mt-5">
            {shortenedLink}
            <CopyToClipboard text={shortenedLink}>
              <button className="border-2 border-blue-500 text-blue-500 font-medium px-12 py-2 ml-4 rounded-md">
                Copy URL to Clipboard
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Form;
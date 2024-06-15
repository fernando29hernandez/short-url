import "./App.css";
import { React, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SHORT_URL_API = `https://smolurl.com/api/links`;
const Form = () => {
	const [shortenedLink, setShortenedLink] = useState("");
	const [userInput, setUserInput] = useState("");

	const notify = (message) => toast.info(message);

	const fetchData = async () => {
		try {
			const headers = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }
			if (userInput === '' || !userInput.trim()) {
				notify("Set a link with valid format.")
				return
			}
			const { data } = await axios.post(
				SHORT_URL_API, {
				url: userInput
			}, 
				headers
			);
			setShortenedLink(data.data.short_url);
		} catch (e) {
			notify("Set a link with valid format.")

		}
	};

	return (

		<div className="flex flex-1 flex-row min-h-screen justify-center items-center w-full">
			<ToastContainer position="bottom-right" theme="dark"/>
			<div className=" text-center md:w-[700px] sm:w-full">
				<h1 className=" text-2xl font-medium text-blue-500 mb-4">
					<span className=" text-blue-400">URL Shortener</span>
				</h1>
				<div className="flex-1 justify-center justify-self-center items-center">
					<div className="flex flex-wrap gap-1 sm:w-full sm:basis-full">
						<input
							className="outline-none border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white/2 shadow-md md:px-8 py-3 md:mr-8 mb-4 md:basis-7/12 sm:basis-1/2 sm:w-full sm:grow"
							type="text"
							placeholder="Enter link to be shortened"
							value={userInput}
							onChange={(e) => {
								setUserInput(e.target.value);
							}}
						/>
						<button
							className=" bg-blue-500 text-white px-6  py-3 ml-4 mr-0 rounded-md mb-4 md:basis-4/12 sm:basis-1/2 sm:w-full"
							onClick={() => {
								fetchData();
							}}
						>
							Submit URL
						</button>
					</div>


					<div className="flex flex-wrap justify-center justify-self-center items-center mt-6 gap-12">

						<CopyToClipboard text={shortenedLink} onCopy={(text) => {
							if (!text.trim()) {
								notify("Nothing is copied.")
								return
							}
							if (text.includes("Set a link with valid format")) {
								notify("Nothing is copied.")
								return
							}
							if (text.includes("Nothing is copied.")) {
								notify("Nothing is copied.")
								return
							}
							notify("URL Copied.")
						}}>
							<button className="border-2 border-blue-500 text-blue-500 font-medium px-8  py-2  rounded-md  md:basis-6/12 sm:basis-full">
								Copy URL to Clipboard
							</button>
						</CopyToClipboard>
						<button className="border-2 border-blue-500 text-blue-500 font-medium px-8  py-2  rounded-md  md:basis-5/12 sm:basis-full" onClick={() => {
							setShortenedLink("")
							setUserInput("")
						}}>
							Clear
						</button>
					</div>
					<div className="bg-white rounded-md text-black p-12 py-12 border-4 border-blue-500 justify-center justify-self-center  mt-5 ">
						{shortenedLink}
					</div>
				</div>
			</div>
		</div>

	);
}

export default Form;
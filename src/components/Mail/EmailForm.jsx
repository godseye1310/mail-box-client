import React, { useState } from "react";
import useAuth from "../../store/auth-context";
import axios from "axios";

const RTDB_URL = `https://mail-box-client-38ab9-default-rtdb.asia-southeast1.firebasedatabase.app/`;

const EmailForm = () => {
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const { userEmail } = useAuth();

	const sendEmailHandler = async (event) => {
		event.preventDefault();

		const emailData = {
			from: userEmail,
			to: email,
			subject: subject,
			message: message,
			timestamp: new Date().toISOString(),
		};
		// Add send email functionality here
		try {
			// 1. Create a unique email ID
			const newEmailRef = await axios.post(
				`${RTDB_URL}emails.json`,
				emailData
			);
			const emailId = newEmailRef.data.name;

			// 2. Update the sender's sent folder
			console.log(emailData.from);

			await axios.put(
				`${RTDB_URL}users/${encodeEmail(
					userEmail
				)}/sent/${emailId}.json`,
				true
			);

			// 3. Update the receiver's inbox folder
			await axios.put(
				`${RTDB_URL}users/${encodeEmail(email)}/inbox/${emailId}.json`,
				true
			);

			console.log("Email sent successfully!");
		} catch (error) {
			console.error("Error sending email: ", error);
		}
		console.log("Sending Email: ", { email, subject, message });
	};

	// Firebase keys don't allow '.', so we replace it
	const encodeEmail = (email) => {
		return email.split(/[@.]/).join("");
	};

	return (
		<div className="min-h-full w-full px-3 bg-gray-100 flex justify-center items-start pt-12 pb-3">
			<form
				onSubmit={sendEmailHandler}
				className="w-full max-w-6xl h-full bg-white shadow-md rounded-lg p-6"
			>
				{/* To Field */}
				<div className="mb-4 relative">
					<label className="block text-sm font-medium text-gray-500">
						To{" "}
						<span className="absolute right-0 text-slate-400 ">
							Cc/Bcc
						</span>
					</label>
					<input
						type="email"
						className="mt-1 block w-full py-2 border-b border-b-gray-300 focus-visible:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="test@gmail.com"
					/>
				</div>

				{/* Subject Field */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700"></label>
					<input
						type="text"
						className="mt-1 block w-full py-2 border-b border-b-gray-300 focus-visible:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						placeholder="Subject"
					/>
				</div>

				{/* Message Body */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700"></label>
					<textarea
						className="mt-1 block w-full py-2 border-b border-b-gray-300 focus-visible:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						rows="18"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Message"
					></textarea>
				</div>

				{/* Footer Actions */}
				<div className="flex justify-between items-center mt-6">
					{/* Action buttons (icons for bold, attach file etc.) */}
					<div className="space-x-2">
						<button className="text-gray-500 hover:text-gray-700">
							<i className="fas fa-paperclip"></i> {/* Icon */}
						</button>
						<button className="text-gray-500 hover:text-gray-700">
							<i className="fas fa-bold"></i> {/* Icon */}
						</button>
					</div>

					{/* Send Button */}
					<button
						type="submit"
						className="bg-blue-500 justify-start text-white px-4 py-2 rounded-md hover:bg-blue-600"
					>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default EmailForm;

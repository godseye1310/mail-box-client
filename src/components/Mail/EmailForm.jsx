import React, { useState } from "react";
import useAuth from "../../store/auth-context";
import useMailbox from "../../store/mailbox-context";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";

import MessageInput from "../UI/MessageInput";
import useFetch from "../../hooks/useFetch";

const RTDB_URL = `https://mail-box-client-38ab9-default-rtdb.asia-southeast1.firebasedatabase.app`;

const EmailForm = () => {
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [messageEditorState, setMessageEditorState] = useState(
		EditorState.createEmpty()
	);
	const { userEmail } = useAuth(); // Getting the email of the logged-in user (sender's email)
	const { addSentMail } = useMailbox();

	// Clean the email address for use in the Firebase path
	const cleanEmail = email.replace(/[@.]/g, "_"); // Replacing @ and . with underscores
	const cleanUserEmail = userEmail.replace(/[@.]/g, "_"); // Cleaning sender's email

	// Use the useFetch hook to send the email
	const { fetchData: sendReceiverEmail } = useFetch(
		`${RTDB_URL}/users/${cleanEmail}/Inbox.json`,
		"POST"
	);
	const { fetchData: sendSenderMailRef } = useFetch(
		`${RTDB_URL}/users/${cleanUserEmail}/SentBox.json`,
		"POST"
	);

	const sendEmailHandler = async (event) => {
		event.preventDefault();

		// Get the message content in plain text format
		const messageContent = convertToHTML(
			messageEditorState.getCurrentContent()
		);

		// Create the email data object
		const emailData = {
			to: email,
			from: userEmail,
			subject: subject,
			message: messageContent,
			timestamp: new Date().toISOString(),
		};

		try {
			// Store in the receiver's Inbox
			const receiverResponse = await sendReceiverEmail(emailData);
			const emailId = receiverResponse.name; // Use Firebase response ID

			console.log("sending Mail");

			// Store in the sender's SentBox
			const senderResponse = await sendSenderMailRef({
				...emailData,
				emailId, // Optionally store the emailId for reference
			});
			const id = senderResponse.name;
			addSentMail({ ...emailData, id, emailId });

			console.log("sending mail successfully", emailId);

			// Reset form fields after successful email send
			setEmail("");
			setSubject("");
			setMessageEditorState(EditorState.createEmpty());
		} catch (error) {
			console.error("Error sending email:", error);
			// Handle error (show notification, etc.)
		}
	};

	return (
		<div className="min-h-full w-full px-3 bg-gray-100 flex justify-center items-start pt-12 pb-3">
			<form
				onSubmit={sendEmailHandler}
				className="w-full max-w-6xl min-h-[80dvh] bg-white shadow-md rounded-lg p-6"
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
						required
						className="mt-1 block w-full py-2 border-b border-b-gray-300 focus-visible:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Recipient's Email"
					/>
				</div>

				{/* Subject Field */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700"></label>
					<input
						type="text"
						required
						className="mt-1 block w-full py-2 border-b border-b-gray-300 focus-visible:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						placeholder="Subject"
					/>
				</div>

				{/* Message Body */}
				<div className="mb-4 relative h-full">
					<label className="block text-sm font-medium text-gray-700"></label>
					{/* Editor Text Area */}
					<div className="flex flex-col h-full focus-within:border-indigo-500">
						<MessageInput
							editorState={messageEditorState}
							onEditorStateChange={setMessageEditorState}
						/>
					</div>
					{/* Send Button */}
					<button
						type="submit"
						className="bg-blue-500 absolute bottom-1 justify-self-start justify-items-start text-white px-8 py-1.5 rounded-lg hover:bg-blue-600"
					>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default EmailForm;

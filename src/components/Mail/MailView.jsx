import React, { useState, useEffect } from "react";
import useMailbox from "../../store/mailbox-context";

import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { RiDeleteBin2Fill } from "react-icons/ri";

const MailView = () => {
	const { inbox, sentMails, mailDeleteHandler } = useMailbox();
	// console.log(inbox);

	const location = useLocation();
	const isInbox = location.pathname.includes("inbox");

	const { inboxmailID, sentmailID } = useParams(); // Extract mail ID from the URL
	const email = isInbox
		? inbox.find((mail) => mail.id === inboxmailID)
		: sentMails.find((mail) => mail.id === sentmailID);

	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const handleDelete = (mailID) => {
		isInbox
			? mailDeleteHandler(mailID, "Inbox")
			: mailDeleteHandler(mailID, "SentBox");
	};

	useEffect(() => {
		if (email && email.message) {
			// Convert the HTML message back to Draft.js content and set the editor state
			const blocksFromHTML = convertFromHTML(email.message);
			const contentState = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap
			);
			setEditorState(EditorState.createWithContent(contentState));
		}
	}, [email]);

	// Redirect to /home/inbox if no matching email is found
	if (!email) {
		return isInbox ? (
			<Navigate to="/home/inbox" />
		) : (
			<Navigate to="/home/sent" />
		);
	}

	return (
		<div className="h-full w-full p-5">
			<div className="bg-white flex flex-col rounded-xl h-full overflow-y-auto shadow-lg p-8 min-w-full ">
				{/* Email Subject */}
				<h1 className="text-3xl font-semibold mb-4">{email.subject}</h1>

				{/* Sender Information */}
				<div className="flex justify-between items-center border-b pb-4 mb-6">
					<div>
						<p className="text-lg font-medium">
							{isInbox ? (
								<>
									<strong>From:</strong> {email.from}
								</>
							) : (
								<>
									<strong>To:</strong> {email.to}
								</>
							)}
						</p>
						<p className="text-md text-gray-600">
							{isInbox ? (
								<>
									<strong>To:</strong> {email.to}
								</>
							) : (
								<>
									<strong>From:</strong> {email.from}
								</>
							)}
							<span> (Me)</span>
						</p>
					</div>
					<div>
						{/* Date and Time */}
						<p className="text-md text-gray-500">
							{new Date(email.timestamp).toLocaleString("en-US", {
								weekday: "short",
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							})}
						</p>
					</div>
				</div>

				{/* Render the email content using the Draft.js editor in read-only mode */}
				<div className="email-body">
					<Editor
						editorState={editorState}
						toolbarHidden
						readOnly
						wrapperClassName="demo-wrapper"
						editorClassName="demo-editor"
					/>
				</div>

				{/* actions buttons */}
				<div className="mt-auto flex gap-4">
					{isInbox && (
						<button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
							Reply
						</button>
					)}
					<button className="bg-gray-300 px-4 py-2 rounded-lg">
						Forward
					</button>
					<button
						onClick={() => handleDelete(email.id)}
						className="bg-red-500 hover:bg-red-600 text-white ml-auto px-4 py-2 rounded-lg"
					>
						<RiDeleteBin2Fill />
					</button>
				</div>
			</div>
		</div>
	);
};

export default MailView;

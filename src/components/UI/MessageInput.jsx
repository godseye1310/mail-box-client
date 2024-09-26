import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MessageInput = ({ editorState, onEditorStateChange }) => {
	return (
		<Editor
			editorState={editorState}
			onEditorStateChange={onEditorStateChange}
			wrapperClassName="flex flex-col-reverse"
			editorClassName="editor"
			toolbarClassName="toolbar bg-gray-500"
			placeholder="Write your message here..."
			toolbar={{
				options: ["inline", "list", "history"],
				inline: {
					options: ["bold", "italic", "underline"],
					bold: {
						className: "custom-bold",
					},
					italic: {
						className: "custom-italic",
					},
				},
				list: {
					options: ["unordered", "ordered"],
				},
				history: {
					options: ["undo", "redo"],
				},
			}}
		/>
	);
};

export default MessageInput;

import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "./auth-context";
import axios from "axios";

const MailboxContext = createContext();

const RTDB_URL = `https://mail-box-client-38ab9-default-rtdb.asia-southeast1.firebasedatabase.app/users`;

export const MailboxProvider = ({ children }) => {
	const [inbox, setInbox] = useState([]);
	const { userEmail, isLoggedIn } = useAuth();

	const [sentMails, setSentMails] = useState([]);

	useEffect(() => {
		const fetchInbox = async () => {
			// Replacing @ and . with underscores
			const cleanUserEmail = userEmail.replace(/[@.]/g, "_"); // Cleaning sender's email

			try {
				const response = await axios.get(
					`${RTDB_URL}/${cleanUserEmail}/Inbox.json`
				);

				// console.log(response.data);
				console.log("inbox fetch successfull");
				let inboxList = [];
				if (response.data) {
					inboxList = Object.keys(response.data).map((key) => {
						return { ...response.data[key], id: key };
					});
					// console.log(inboxList);
					setInbox(inboxList);
				}
			} catch (error) {
				console.log(error.response);
			}
		};

		if (isLoggedIn) {
			fetchInbox();
		}
	}, [isLoggedIn, userEmail]);

	const handleMarkasRead = async (id) => {
		// console.log(id);
		const read = inbox.find((mail) => mail.id === id);
		// console.log(read);
		if (read.isRead) {
			return;
		}

		// Replacing @ and . with underscores
		const cleanUserEmail = userEmail.replace(/[@.]/g, "_"); // Cleaning sender's email
		try {
			const response = await axios.patch(
				`${RTDB_URL}/${cleanUserEmail}/Inbox/${id}.json`,
				{ isRead: true }
			);

			console.log(response.status, "Mark as Read");
			if (response.statusText === "OK") {
				setInbox((prevInbox) =>
					prevInbox.map((prevmail) =>
						prevmail.id === id
							? { ...prevmail, isRead: true }
							: prevmail
					)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const mailDeleteHandler = async (id) => {
		console.log(id);
		const cleanUserEmail = userEmail.replace(/[@.]/g, "_"); // Cleaning sender's email
		try {
			const response = await axios.delete(
				`${RTDB_URL}/${cleanUserEmail}/Inbox/${id}.json`
			);
			console.log(response.status, "e-mail Deleted");

			if (response.statusText === "OK") {
				setInbox((prevInbox) =>
					prevInbox.filter((mail) => !(mail.id === id))
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchInbox = async () => {
			// Replacing @ and . with underscores
			const cleanUserEmail = userEmail.replace(/[@.]/g, "_"); // Cleaning sender's email

			try {
				const response = await axios.get(
					`${RTDB_URL}/${cleanUserEmail}/SentBox.json`
				);

				// console.log(response.data);
				console.log("sentBox fetch successfull");
				let sentboxList = [];
				if (response.data) {
					sentboxList = Object.keys(response.data).map((key) => {
						return { ...response.data[key], id: key };
					});
					// console.log(inboxList);
					setSentMails(sentboxList);
				}
			} catch (error) {
				console.log(error.response);
			}
		};

		if (isLoggedIn) {
			fetchInbox();
		}
	}, [isLoggedIn, userEmail]);

	return (
		<MailboxContext.Provider
			value={{
				inbox,
				handleMarkasRead,
				mailDeleteHandler,
				sentMails,
			}}
		>
			{children}
		</MailboxContext.Provider>
	);
};

const useMailbox = () => useContext(MailboxContext);

export default useMailbox;

import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "./auth-context";
import axios from "axios";

const InboxContext = createContext();

const RTDB_URL = `https://mail-box-client-38ab9-default-rtdb.asia-southeast1.firebasedatabase.app/users`;

export const InboxProvider = ({ children }) => {
	const [inbox, setInbox] = useState([]);
	const { userEmail, isLoggedIn } = useAuth();

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

		// Replacing @ and . with underscores
		const cleanUserEmail = userEmail.replace(/[@.]/g, "_"); // Cleaning sender's email

		if (read.isRead) {
			return;
		}

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

	return (
		<InboxContext.Provider value={{ inbox, setInbox, handleMarkasRead }}>
			{children}
		</InboxContext.Provider>
	);
};

const useInbox = () => useContext(InboxContext);

export default useInbox;

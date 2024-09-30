import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import useAuth from "./auth-context";
import axios from "axios";
import useFetch from "../hooks/useFetch";

const MailboxContext = createContext();

const RTDB_URL = `https://mail-box-client-38ab9-default-rtdb.asia-southeast1.firebasedatabase.app/users`;

export const MailboxProvider = ({ children }) => {
	const [inbox, setInbox] = useState([]);
	const { userEmail, isLoggedIn } = useAuth();

	const [sentMails, setSentMails] = useState([]);

	// Replacing @ and . with underscores
	const cleanUserEmail = userEmail ? userEmail.replace(/[@.]/g, "_") : ""; // Cleaning user's email

	const { fetchData: getInbox, error: InboxErr } = useFetch(
		`${RTDB_URL}/${cleanUserEmail}/Inbox.json`,
		"GET"
	);
	const fetchInbox = useCallback(async () => {
		try {
			const data = await getInbox();
			// console.log(data);
			console.log("inbox fetch successfull");

			let fetchedInbox = [];
			if (data) {
				fetchedInbox = Object.keys(data).map((key) => {
					return { ...data[key], id: key };
				});
				// console.log(fetchedInbox);
				if (fetchedInbox.length !== inbox.length) {
					console.log(fetchedInbox.length, inbox.length);
					setInbox(fetchedInbox);
					console.log("inbox updated");
				}
			}
		} catch (error) {
			// console.log(error.response);
			console.log(InboxErr);
		}
	}, [inbox, getInbox, InboxErr]);

	useEffect(() => {
		let fetchInterval;
		if (isLoggedIn) {
			fetchInbox();

			// Set up polling every 3 seconds
			fetchInterval = setInterval(() => {
				fetchInbox();
			}, 3000); // Polling every 3 seconds
		}

		return () => clearInterval(fetchInterval);
	}, [isLoggedIn, fetchInbox]);

	const handleMarkasRead = async (id) => {
		// console.log(id);
		const read = inbox.find((mail) => mail.id === id);
		// console.log(read);
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

	//Delete Mails from Mailbox
	const mailDeleteHandler = async (id, boxPath) => {
		// console.log(id);
		try {
			const response = await axios.delete(
				`${RTDB_URL}/${cleanUserEmail}/${boxPath}/${id}.json`
			);
			console.log(response.status, "e-mail Deleted");
			if (response.statusText === "OK") {
				if (boxPath === "Inbox") {
					setInbox((prevInbox) =>
						prevInbox.filter((mail) => !(mail.id === id))
					);
				} else {
					setSentMails((prevSent) =>
						prevSent.filter((mail) => !(mail.id === id))
					);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Sent Mail Updates
	const addSentMail = (newSent) => {
		// console.log(newSent);
		setSentMails((prevSent) => [...prevSent, newSent]);
	};
	const { fetchData: getSentMails, error: sentMailErr } = useFetch(
		`${RTDB_URL}/${cleanUserEmail}/SentBox.json`,
		"GET"
	);
	useEffect(() => {
		const fetchSentbox = async () => {
			try {
				const data = await getSentMails();
				// console.log(data);
				console.log("sentBox fetch successfull");
				let sentboxList = [];
				if (data) {
					sentboxList = Object.keys(data).map((key) => {
						return { ...data[key], id: key };
					});
					// console.log(inboxList);
					setSentMails(sentboxList);
				}
			} catch (error) {
				console.log(sentMailErr);
				// console.log(error.response);
			}
		};

		if (isLoggedIn) {
			fetchSentbox();
		}
	}, [isLoggedIn, getSentMails, sentMailErr]);

	useEffect(() => {
		if (!isLoggedIn) {
			setInbox([]);
			setSentMails([]);
		}
	}, [isLoggedIn]);

	return (
		<MailboxContext.Provider
			value={{
				inbox,
				handleMarkasRead,
				mailDeleteHandler,
				sentMails,
				addSentMail,

				setInbox,
				setSentMails,
			}}
		>
			{children}
		</MailboxContext.Provider>
	);
};

const useMailbox = () => useContext(MailboxContext);

export default useMailbox;

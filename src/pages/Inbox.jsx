// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import useAuth from "../store/auth-context";
import UserInbox from "../components/Mail/UserInbox";
import useInbox from "../store/inbox-context";

// const RTDB_URL = `https://mail-box-client-38ab9-default-rtdb.asia-southeast1.firebasedatabase.app/users`;

const Inbox = () => {
	// const { userEmail, isLoggedIn } = useAuth();

	// const [inbox, setInbox] = useState([]);

	// useEffect(() => {
	// 	const fetchInbox = async () => {
	// 		// Replacing @ and . with underscores
	// 		const cleanUserEmail = userEmail.replace(/[@.]/g, "_"); // Cleaning sender's email

	// 		try {
	// 			const response = await axios.get(
	// 				`${RTDB_URL}/${cleanUserEmail}/Inbox.json`
	// 			);

	// 			// console.log(response.data);
	// 			console.log("inbox fetch successfull");

	// 			if (response.data) {
	// 				let inboxList = Object.keys(response.data).map((key) => {
	// 					return { ...response.data[key], id: key };
	// 				});

	// 				// console.log(inboxList);

	// 				setInbox(inboxList);
	// 			}
	// 		} catch (error) {
	// 			console.log(error.response);
	// 		}
	// 	};

	// 	if (isLoggedIn) {
	// 		fetchInbox();
	// 	}
	// }, [isLoggedIn, userEmail]);

	const { inbox } = useInbox();

	return (
		<div className="h-full px-2">
			<UserInbox inbox={inbox} />
		</div>
	);
};

export default Inbox;

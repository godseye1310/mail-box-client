import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token") || null);
	const [userEmail, setUserEmail] = useState(
		localStorage.getItem("userEmail") || null
	);

	const isLoggedIn = !!token;

	const handleLogIn = (token, mail) => {
		setToken(token);
		localStorage.setItem("token", token);

		setUserEmail(mail);
		localStorage.setItem("userEmail", mail);
	};

	const handleLogOut = () => {
		console.log("logged out");
		setToken(null);
		localStorage.removeItem("token");

		setUserEmail(null);
		localStorage.removeItem("userEmail");
	};

	const context = {
		token,
		isLoggedIn,
		userEmail,
		handleLogIn,
		handleLogOut,
	};
	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export default useAuth;

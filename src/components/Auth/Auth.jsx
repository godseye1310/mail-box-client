import axios from "axios";
import React, { useState } from "react";
import Input from "../UI/Input";

import useAuth from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const API_KEY = "AIzaSyB84u4X10RE3cGQMqs7sibXk-m2JvzkMXg";
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const AuthForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isErrorVisible, setIsErrorVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { handleLogIn } = useAuth();

	const naviateTo = useNavigate();

	const isSignUpHandler = () => {
		setIsSignUp((prev) => !prev);
		setEmail("");
		setPassword("");
	};
	const authFormHandler = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const userAuthData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		setErrorMessage("");
		if (!isSignUp) {
			try {
				const response = await axios.post(SIGNIN_URL, userAuthData);
				console.log(response.data);

				const token = response.data.idToken;
				const email = response.data.email;

				handleLogIn(token, email);

				naviateTo("/home", { replace: true });

				setEmail("");
				setPassword("");
			} catch (error) {
				console.log(error.response.data);
				if (
					error.response.data.error.message ===
					"INVALID_LOGIN_CREDENTIALS"
				) {
					setErrorMessage("* Check your Email or Password");
				} else if (error.response.data.error.message) {
					setErrorMessage("* Too many attempts try Again Later");
				}
				setIsErrorVisible(true);
				setTimeout(() => setIsErrorVisible(false), 3000);
			} finally {
				setIsLoading(false);
			}
		} else {
			try {
				if (
					password ===
					document.getElementById("confirm_password").value
				) {
					const response = await axios.post(SIGNUP_URL, userAuthData);

					console.log(response.data);
					console.log("User has successfully signed up.");

					const token = response.data.idToken;
					const email = response.data.email;
					handleLogIn(token, email);

					console.log("successfully logged In");

					setEmail("");
					setPassword("");
					naviateTo("/home", { replace: true });
					//
				} else {
					setErrorMessage("* Password doesnt Match");
					setIsErrorVisible(true);
					setTimeout(() => setIsErrorVisible(false), 3000);
				}
			} catch (error) {
				if (error.response.data.error.message === "INVALID_EMAIL") {
					setErrorMessage("* Enter a Valid Email");
				} else if (
					error.response.data.error.message === "EMAIL_EXISTS"
				) {
					setErrorMessage("* Email is Already Registered");
				} else if (
					error.response.data.error.message ===
					"WEAK_PASSWORD : Password should be at least 6 characters"
				) {
					setErrorMessage(
						"* Password should be at least 6 characters"
					);
				}
				setIsErrorVisible(true);
				setTimeout(() => setIsErrorVisible(false), 3000);
			} finally {
				setIsLoading(false);
			}
		}
	};
	return (
		<div className="image-container relative flex h-full w-full items-center justify-center bg-gray-100 max-xs:items-start max-xs:pt-12">
			<section className="h-auto w-[21rem] p-4 max-xs:p-1">
				<form
					onSubmit={authFormHandler}
					className="border border-gray-400 px-4 py-6"
				>
					<h1 className="mb-6 py-4 text-center text-2xl font-medium text-black">
						{!isSignUp ? "Login" : "Sign Up"}
					</h1>
					<div className="flex flex-col gap-6">
						{/* Email Input */}
						<Input
							label="Email"
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoFocus={true}
							isSignUp={isSignUp}
						/>
						{/* Password Input */}
						<Input
							label="Password"
							id="password"
							name="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							isSignUp={isSignUp}
						/>
						{/* Confirm Password Input */}
						{isSignUp && (
							<Input
								label="Confirm Password"
								id="confirm_password"
								name="confirm_password"
								type="password"
								isSignUp={isSignUp}
							/>
						)}
					</div>

					<div className="relative space-y-1 pt-2">
						<span
							className={`my-0.5 block h-4 transform px-2 text-sm font-medium text-red-600 transition-all duration-300 ease-in ${
								isErrorVisible
									? "visible translate-y-0"
									: "invisible -translate-y-2"
							}`}
						>
							{errorMessage}
						</span>
						{!isLoading && (
							<button
								// disabled
								type="submit"
								className={`w-full border-none bg-blue-500 py-2 text-white hover:bg-blue-600 focus:bg-blue-500 disabled:bg-opacity-70 ${
									!isSignUp ? "rounded-xl" : "rounded-3xl"
								}`}
							>
								{!isSignUp ? "Login" : "Sign Up"}
							</button>
						)}
						{isLoading && (
							<div className="flex items-center justify-center">
								<img
									src="https://i.gifer.com/7kRE.gif"
									alt="loading"
									className="size-10"
								/>
							</div>
						)}
					</div>

					{!isSignUp && (
						<div className="flex justify-center pt-4">
							<button
								onClick={() => {}}
								className="text-blue-700 underline decoration-blue-700"
							>
								Forgot Password?
							</button>
						</div>
					)}
				</form>

				<div className="">
					<button
						onClick={isSignUpHandler}
						type="button"
						className="mt-4 w-full border border-emerald-800 bg-emerald-300 bg-opacity-50 px-4 py-2 text-emerald-900 hover:bg-opacity-75"
					>
						{!isSignUp
							? `Don't have an Account? Sign up`
							: "Have an Account? Login"}
					</button>
				</div>
			</section>
		</div>
	);
};

export default AuthForm;

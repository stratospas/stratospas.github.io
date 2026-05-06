// src/App.js
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Signup from "./components/SignUp";
import Login from "./components/Login";

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	return (
		<div>
			{user ? (
				<div>
				<h2>Welcome, {user.email}</h2>
				<button onClick={() => signOut(auth)}>Logout</button>
				</div>
			) : (
				<>
				<Signup />
				<Login />
				</>
			)}
		</div>
	);
};

export default App;
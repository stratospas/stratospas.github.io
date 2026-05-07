// src/App.js
import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Col, Form, Row, Stack, Tab, Tabs } from "react-bootstrap";
import GoogleSign from "./components/GoogleSign";
import language from "./lang";

const App = () => {
	const [user, setUser] = useState(null);
	const [langKey, setLangKey] = useState("gr");

	const ll = 'gr';

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	function sg() {		
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log("Google sign-in successful:", result.user);
			})
			.catch((error) => {
				console.error("Google sign-in error:", error);
			});
	}

	return (
		<div>
			{user ? (
				<div>
				<h2>Welcome, {user.email}</h2>
				<button onClick={() => signOut(auth)}>Logout</button>
				{console.log("User is logged in:", user)}
				</div>
			) : (
				<Stack  gap={5} className="align-items-center">
					<Row><Col>
						<Form.Select aria-label="Default select example" onChange={(e) => setLangKey(e.target.value)}>
							<option value="gr">GR</option>
							<option value="en">US</option>
						</Form.Select>
					</Col></Row>
					<Row  className="mt-5">
						<Col xs='auto' className="p-4 border rounded shadow">
							<Tabs defaultActiveKey="login"
								className="mb-3"
								justify >
								<Tab eventKey="login" title={language[langKey].login}>
									<Login language={language[langKey]} />
								</Tab>
								<Tab eventKey="signup" title={language[langKey].signup}>
									<Signup language={language[langKey]} />
								</Tab>
							</Tabs>
						</Col>
					</Row>
					
					<Row><Col>or</Col></Row>

					<Row><Col>
						<GoogleSign language={language[langKey]} />
					</Col></Row>
				</Stack>
			)}
		</div>
	);
};

export default App;
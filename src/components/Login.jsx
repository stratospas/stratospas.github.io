// src/components/Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const Login = ({language}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			alert("Logged in successfully!");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<Form onSubmit={handleLogin}  style={{ width: '80vw', maxWidth: '350px' }}>
			<Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e) => setEmail(e.target.value)}>
				<FloatingLabel controlId="floatingInput" label={language.email} className="mb-3">
					<Form.Control type="email" placeholder={language.email} />
				</FloatingLabel>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => setPassword(e.target.value)}>
				<FloatingLabel controlId="floatingPassword" label={language.password} className="mb-3">
					<Form.Control type="password" placeholder={language.password} />
				</FloatingLabel>
			</Form.Group>

			<Button variant="primary" type="submit">
				{language.login}
			</Button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</Form>
	);
};

export default Login;
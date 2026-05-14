// src/components/Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const Signup = ({language}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// Add username
			await updateProfile(user, {
				displayName: name,
			});
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<Form onSubmit={handleSignup} style={{ width: '80vw', maxWidth: '350px' }}>

			<Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => setName(e.target.value)}>
				<FloatingLabel controlId="floatingPassword" label="Όνομα" className="mb-3">
					<Form.Control type="text" placeholder="Όνομα" />
				</FloatingLabel>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => setPassword(e.target.value)}>
				<FloatingLabel controlId="floatingPassword" label={language.password} className="mb-3">
					<Form.Control type="password" placeholder={language.password} />
				</FloatingLabel>
			</Form.Group>

			<Form.Group className="mb-3 justify-content-md-center" 
			controlId="formBasicEmail" 
			onChange={(e) => setEmail(e.target.value)}>
				<FloatingLabel controlId="floatingInput" label={language.email}>
					<Form.Control type="email" placeholder={language.email} />
				</FloatingLabel>
				<Form.Text className="text-muted mb-3">
					{language.diclaim}
				</Form.Text>
			</Form.Group>

			
			<Button variant="success" type="submit" className="align-self-right">
				{language.signup}
			</Button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</Form>
	);
};

export default Signup;
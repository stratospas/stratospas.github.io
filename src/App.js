// src/App.js
import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Button, Col, Form, Image, Row, Stack, Tab, Tabs } from "react-bootstrap";
import GoogleSign from "./components/GoogleSign";
import language from "./lang";
import MyWheel from "./components/Wheel";
import VoteOption from "./components/VoteOption";
import VotingPage from "./pages/VotingPage";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import CountriesManage from "./pages/CountriesManage";

const App = () => {
	const [user, setUser] = useState(null);
	const [userData, setUserData] = useState(null);
	const [langKey, setLangKey] = useState("gr");
	const [mustSpin, setMustSpin] = useState(false);
	const ll = 'gr';

	const [countries, setCountries] = useState([]);
	// 	[
	// 	{name: 'Greece',	pickedBy: null},
	// 	{name: 'Italy',		pickedBy: null },
	// 	{name: 'Germany',	pickedBy: null },
	// 	{name: 'Spain',		pickedBy: null }
	// ]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setUser(currentUser);
			// console.log("Auth state changed, current user:", currentUser);


			const col = collection(db, "users");
			const q = query(col, where("username", "==", currentUser.email));
			
			const docSnap = await getDocs(q);
			if(docSnap.empty) {
				const countriesList = await getCounties();
				setCountries(countriesList);
				const docRef = doc(col);
				await setDoc(docRef, {
					username: currentUser.email,
					bonus: Math.floor(Math.random() * 6),
					countries: countriesList,
					score: 0
				});
			}
			else {
				const userData = docSnap.docs[0].data();
				// console.log("User data:", { ...userData, id: docSnap.docs[0].id });
				setUserData({ ...userData, id: docSnap.docs[0].id });
				setCountries(userData.countries);
			}
		});

		
		return () => unsubscribe();
	}, []);

	const getCounties = async ( full = false) => {
		const countriesCol = collection(db, "countries");
		const countriesSnapshot = await getDocs(countriesCol);
		if(full) {
			return countriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
		}
		return countriesSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name, pickedBy: null }));
	}
	
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
				<Image src="main_logo.png" alt="log" style={{width: '100vw'}}/>

				<CountriesManage />
				{/* <VotingPage userData={userData} language={language[langKey]} /> */}

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
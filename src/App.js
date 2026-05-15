import React, { useEffect, useState } from "react";
import { HashRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { Button, Col, Form, Image, Nav, Row, Stack, Tab, Tabs } from 'react-bootstrap';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import Signup from "./components/Signup";
import Login from "./components/Login";
import GoogleSign from "./components/GoogleSign";
import language from "./lang";
import Index from "./pages/Index";
import VotingPage from "./pages/VotingPage";
import Menu from "./components/Menu";
import Results from "./pages/Results";
import CountriesManage from "./pages/CountriesManage";
import { getCountries } from "./service";


const Layout = ({user}) => {
	
	const [langKey, setLangKey] = useState("gr");

	const logOut = async () => {
		await signOut(auth)
	}
	
	useEffect(() => {
		
	}, [user]);



	return (
		<div>
			{user
			?	<div style={{overflowY:'hidden'}}>
					<Image src="main_logo.png" rounded fluid />
					<Row className="justify-content-end p-0 mb-3">
						<Col xs='auto'>
						 	<Button size="sm" variant="outline-secondary" onClick={logOut}>Αποσύνδεση</Button>
						</Col>
					</Row>
					<Menu/>
					<Outlet />
					<div className='padd' />
				</div>

			: <Stack  gap={5} className="align-items-center">
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

			}
		</div>
	);
  };
  

function App() {
	const [user, setUser] = useState(null);
	const [userData, setUserData] = useState(null);
	
	const [langKey, setLangKey] = useState("gr");
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setUser(currentUser);

			if ( currentUser ){
				const col = collection(db, "users");
				const q = query(col, where("email", "==", currentUser.email));
				
				const docSnap = await getDocs(q);
				if(docSnap.empty) {
					const countriesList = await getCountries(false);
					const data = {
						email: currentUser.email,
						username: currentUser.displayName,
						bonus: Math.floor(Math.random() * 6),
						countries: countriesList,
						score: 0
					};
					const docRef = doc(col);
					const x = await setDoc(docRef, data);
					alert(x)
					setUserData({ ...userData, id: x });
				}
				else {
					const userData = docSnap.docs[0].data();
					setUserData({ ...userData, id: docSnap.docs[0].id });
				}
			}

			
		});

		
		return () => unsubscribe();
	}, []);

    return (
		<HashRouter>
			<Routes>
				<Route element={<Layout user={user}/>} >
					<Route path='/' Component={Index} />
					<Route path='/vote' element={<VotingPage userData={userData} language={language[langKey]}/>} />
					<Route path='/results' element={<Results user={userData} language={language[langKey]}/>} />
					
				</Route>
				<Route path='/admin' element={<CountriesManage />} />
			</Routes>
		</HashRouter>
    );
}

export default App;
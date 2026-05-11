import { useEffect, useState } from "react";
import { Alert, Button, Col, Row, Stack } from "react-bootstrap";
import VoteOption from "../components/VoteOption";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const VotingPage = ({userData, language}) => {
	const [countries, setCountries] = useState([]);
	const [variant, setVariant] = useState('success');
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	useEffect(() => {
		if(userData) {
			setCountries(userData.countries);
		}
	}, [userData]);

	const updatePick = async (value) => {
		setCountries(value);
		const docRef = doc(db, "users", userData.id);
		try {
			await updateDoc(docRef, { countries: countries });
		}
		catch (error) {
			console.error("Error updating document: ", error);
		}
	}

	async function submitVotes() {
		const docRef = doc(db, "users", userData.id);
		try {
			await updateDoc(docRef, { countries: countries });
			setVariant('success');
			setAlertMessage(language.alertSuccess);
			setShowAlert(true);
		} catch (error) {
			setVariant('danger');
			setAlertMessage(language.alertError);
			setShowAlert(true);
		}
		setTimeout(() => setShowAlert(false), 3000);
	}

	return (
		<Stack gap={3} className="align-items-center">
		{
			countries.length > 0
			?
			[1,2,3,4,5,6,7,8,10,12].map((level) => (
				<VoteOption key={level} level={level} options={countries} updatePick={updatePick} />
			))
			: <p>Loading options...</p>
		}
		<Row className="align-self-end mx-3 mt-5">
			<Col xs='auto'>
				<Button variant="success" onClick={submitVotes}>{language.sumbmit}</Button>
			</Col>
		</Row>
		<Row>
			<Col xs='auto'>
				<Alert variant={variant} show={showAlert}>
				{alertMessage}
				</Alert>
			</Col>
		</Row>
		</Stack>
	);
}

export default VotingPage;
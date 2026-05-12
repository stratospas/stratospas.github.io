import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { use, useEffect, useState } from "react";
import { db } from "../firebase";
import { Button, Col, FloatingLabel, Form, Row, Stack } from "react-bootstrap";

const CountriesManage = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            const countriesCol = collection(db, "countries");
            const countriesSnapshot = await getDocs(countriesCol);
            const countriesList = countriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCountries(countriesList);
        };
        fetchCountries();
    }, []);

    const updateCountry = async (e) => {
        // console.log("Switch toggled:", e.target.id, e.target.checked);
        // const countryId = e.target.id.split('-')[1];
        // const newStatus = e.target.checked;
        // const countriesCol = collection(db, "countries");
        // const countryDoc = doc(countriesCol, countryId);
        // await updateDoc(countryDoc, { isLive: newStatus });
    };

    return (
        <Stack gap={3} className="align-items-center"> {
            countries.length > 0
            ?
            countries.map((country) => (
                <CountryEntry key={country.id} country={country} />
            ))
            : <p>Loading countries...</p>}
        </Stack>
    );
}


const CountryEntry = ({country}) => {
    const [isLive, setIsLive] = useState(country.isLive);
    const [score, setScore] = useState(country.score);

    const updateCountryStatus = async (e) => {
        setIsLive(e.target.checked);
        const newStatus = e.target.checked;
        const countriesCol = collection(db, "countries");
        const countryDoc = doc(countriesCol, country.id);
        await updateDoc(countryDoc, { isLive: newStatus });
    };

    const updateCountryScore = async (e) => {
        const newScore = parseInt(e.target.value);
        if (isNaN(newScore)) return;
        const countriesCol = collection(db, "countries");
        const countryDoc = doc(countriesCol, country.id);
        await updateDoc(countryDoc, { score: newScore });
    }

    return (
        <Row key={country.id} className="align-items-center justify-content-center">
            <Col xs='auto' >{country.name}</Col>
            <Col xs='auto' >
                <Form.Check type="switch" id={`${country.id}`} checked={isLive} onChange={updateCountryStatus}/>
            </Col>
            <Col xs='auto' >
                <Form.Group onBlur={updateCountryScore}>
                    <FloatingLabel controlId="floatingInput" label="Score" className="mb-3">
                        <Form.Control type="number" />
                    </FloatingLabel>
                </Form.Group>
            </Col>
            {/* <Col xs='auto' >
                <Button variant="danger" onClick={updateCountryScore}>Set</Button>
            </Col> */}
        </Row>
    );
}


export default CountriesManage;
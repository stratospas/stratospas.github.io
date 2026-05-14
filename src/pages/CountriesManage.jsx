import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { use, useEffect, useState } from "react";
import { db } from "../firebase";
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from "react-bootstrap";
import { createScores, getAllCountries } from "../service";

const CountriesManage = () => {
    const [countries, setCountries] = useState([]);
    const [users, setUsers] = useState([]);
    
    const fetchCountries = async () => {
        const countriesList = await getAllCountries();
        setCountries(countriesList);
    };

    useEffect(() => {
        fetchCountries();
    }, []);


    const calculateFun = async () => {
        const u = await createScores();
        console.log(u)
        setUsers(u);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Stack gap={3} className="align-items-center"> 
                    {
                        countries.length > 0
                        ?
                        countries.map((country) => (
                            <CountryEntry key={country.id} country={country} />
                        ))
                        : <p>Loading countries...</p>
                    }
                    </Stack>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <Button onClick={calculateFun}>
                                Calculate
                            </Button>
                        </Col>
                    </Row>
                    {
                        users.length > 0
                        ? users.map(u=><Row><Col>{u.username}</Col><Col>{u.score}</Col></Row>)
                        : <p>Loading users...</p>
                    }
                </Col>
            </Row>
        </Container>
        
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

    const updateCountryAA = async (e) => {
        const newScore = parseInt(e.target.value);
        if (isNaN(newScore)) return;
        const countriesCol = collection(db, "countries");
        const countryDoc = doc(countriesCol, country.id);
        await updateDoc(countryDoc, { aa: newScore });
    }

    return (
        <Row key={country.id} className="align-items-center justify-content-center">
            <Col xs='auto' >{country.name}</Col>
            <Col xs='auto' >
                <Form.Check type="switch" id={`${country.id}`} checked={isLive} onChange={updateCountryStatus}/>
            </Col>
            <Col xs='auto' style={{width: '150px'}}>
                <Form.Group onBlur={updateCountryScore}>
                    <FloatingLabel controlId="floatingInput" label="Score" className="mb-3">
                        <Form.Control type="number" value={score} onChange={()=>{}}/>
                    </FloatingLabel>
                </Form.Group>
            </Col>

            <Col xs='auto' style={{width: '75px'}}>
                <Form.Group onBlur={updateCountryAA} >
                    <FloatingLabel controlId="floatingInput" label="#" className="mb-3">
                        <Form.Control type="number" value={score} onChange={()=>{}}/>
                    </FloatingLabel>
                </Form.Group>
            </Col>
        </Row>
    );
}


export default CountriesManage;
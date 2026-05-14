import { useEffect, useState } from "react";
import { getScores, getUser } from "../service";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";

const Results = ({user}) => {
    const [userData, setUserData] = useState({});
    const [allscores, setAllScores] = useState([]);

    const initialize = async () => {
        const u = await getScores();
        setAllScores(u)
        console.log(u)
    }
    useEffect(() => {
        setUserData(user)
        initialize();
        // initialize();
	}, []);

    return(
        <Tabs
        defaultActiveKey="home"
        className="mb-3" justify
        >
            <Tab eventKey="home" title="Η Βαθμολογία μου">
                Tab content for Home
            </Tab>
            <Tab eventKey="profile" title="Κατάταξη">
                <Container>
                    <Row>
                        <Col>#</Col>
                        <Col>Όνομα</Col>
                        <Col>Βαθμολογία</Col>
                    </Row>
                    {
                        allscores.length > 0 
                        ? allscores.map((s, i) => <ScoreEntry key={i} aa={i+1} name={s.name} score={s.score} isMe={s.name == userData.username}/>)
                        : null
                    } 
                </Container>
            </Tab>
        </Tabs>
    );
}

const ScoreEntry = ({aa, name, score, isMe}) => {
    const [color, setColor] = useState('#000000')
    const [border, setBorder] = useState('');

    useEffect(()=>{
        let c, b = '';
        
        switch (aa) {
            case 1:
                c = 'gold';
                break;
            case 2:
                c = 'silver';
                break;
            case 3:
                c = '#CE8946';
                break;
            default:
                c = 'black'
                break;
        }
        if(isMe)
            b = '2px solid ' + c;
        setColor(c); 
        setBorder(b);

    }, [])
    return(
        <Row style={{ color: color, border: border}}>
            <Col>{aa}</Col>
            <Col>{name}</Col>
            <Col>{score}</Col>
        </Row>
    )

}

export default Results;
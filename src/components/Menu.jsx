import './Menu.css';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Menu()
{	
	const location = useLocation();
	const navigate = useNavigate();
	const [pick, setPick] = useState(location.pathname);
	
	useEffect(()=>
	{
		setPick(location.pathname);
	},[location.pathname]);

	const active = 'primary';
	const inactive = 'outline-primary';

    return(
        <Container className='menu' style={{zIndex:90}}>
			<Row className='menu-row justify-content-around'>
				<Col xs='auto' className='p-0'>
					<Button className={pick==='/' ? 'picked' : 'unpicked'} onClick={()=>{navigate('/');}} >
						<div>Λίστα</div> 
					</Button>
				</Col>
				<Col xs='auto' className='p-0' >
					<Button className={pick==='/vote' ? 'picked' : 'unpicked'} onClick={()=>{navigate('/vote');}}>
						<div>Ψηφοφορία</div>
					</Button>
				</Col>
				<Col xs='auto' className='p-0'>
					<Button className={pick==='/results' ? 'picked' : 'unpicked'} onClick={()=>{navigate('/results');}} >
						<div>Αποτελέσματα</div>
					</Button>
				</Col>
			</Row>
		</Container>
    );
}
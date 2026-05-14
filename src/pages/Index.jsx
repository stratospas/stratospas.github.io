import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Spinner from 'react-bootstrap/esm/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import './Index.css'
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Col } from 'react-bootstrap';
import { getCountries } from '../service';

export default function Index()
{
	const [data, setData] = useState(null);
	const [active, setActive] = useState(1);
	const [show, setShow] = useState([])

	const change = (x) =>
	{
		setActive(x);
		const start = (x - 1 ) * 5;
		const end = start + 5 ;
		data 
		? setShow(data.slice(start, end))
		: setShow([]);
	} 
	async function getC() {
		const x = await getCountries();
		setData(x);
	}


	useEffect(()=>
		{
			getC();
		},
	[]);
	


    return(
		<div>


			{
				data
				? data.map((c, index) => <VideoPrev key={index} video={c} />)
				: <Spinner />
			}

			{/* <Pagination className='justify-content-center'>
				<Pagination.Item key={1} active={ 1 === active} onClick={() => { change(1) }}>
				1
				</Pagination.Item>	
				<Pagination.Item key={2} active={ 2 === active} onClick={() => { change(2) }}>
				2
				</Pagination.Item>	
				<Pagination.Item key={3} active={ 3 === active} onClick={() => { change(3) }}>
				3
				</Pagination.Item>	
				<Pagination.Item key={4} active={ 4 === active} onClick={() => { change(4) }}>
				4
				</Pagination.Item>	
				<Pagination.Item key={5} active={ 5 === active} onClick={() => { change(5) }}>
				5
				</Pagination.Item>	

			</Pagination> */}
			
		</div>
	);
}


function VideoPrev({video})
{
	return(
		<Container className='preview'>
			<Row className='title'>
				<Col>
				{video.aa}.{video.name}
				</Col>
			</Row>
			<Row>
				<Col>
				{video.song} - {video.singer}
				</Col>
			</Row>
			<LazyLoad>
				<iframe width="320" height="190" src={video.url} title={video.name} className='vid'/>
			</LazyLoad>
			<hr/>
		</Container>

	)
}


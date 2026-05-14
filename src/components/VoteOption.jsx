import { use, useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap";

const VoteOption = ({level, options, updatePick}) => {
	const [pick, setPick] = useState('');
	const [optionsState, setOptionsState] = useState(options);

	useEffect(() => {
		setOptionsState(options);
		setPick(options.find(o => o.pickedBy == level)?.name || '');
	}, []);

	const handleChange = (e) => {
		setPick(e.target.value);
		const obj = [ ...optionsState ];
		obj.forEach(o => { 
			if (o.pickedBy == level)
				o.pickedBy = null;
			if (o.name === e.target.value)
				o.pickedBy = level;
		});
		setOptionsState(obj);
		updatePick(obj);
	}

	return(
		<Container >
			<Row className="align-items-center justify-content-center">
				<Col xs='auto' >{level}:</Col>
				<Col xs={6} >
					<Form.Select size="sm" aria-label="Default select example" onChange={handleChange} value={pick}>
						<option value=""></option>
						{optionsState.map((option, index) => (
							(option.pickedBy === null || option.pickedBy === level)
							?<option key={index} value={option.name} disabled={option.pickedBy !== null && option.pickedBy !== level}>
								{option.name}
							</option>
							: null )
						)}
					</Form.Select>
				</Col>
			</Row>
		</Container>
	);
}

export default VoteOption;
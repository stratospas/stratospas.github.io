// src/components/Signup.js
import { useState } from "react";
import { Wheel } from "react-custom-roulette";

const MyWheel = ({language, mustSpin}) => {



	return (
		<Wheel 
			mustStartSpinning={mustSpin}
			prizeNumber={3}
			startingOptionIndex={0}
			data={[
				{ option: language.prizes[0] },
				{ option: language.prizes[1] },
				{ option: language.prizes[2] },
				{ option: language.prizes[3] },
			]}
			backgroundColors={['#922424', '#216c8f', '#922424', '#216c8f']}
			textColors={['#FFFFFF']}

			outerBorderColor={'#000000'}
			outerBorderWidth={5}
			radiusLineColor={'#000000'}
			radiusLineWidth={5}


			innerRadius={20}
			innerBorderColor={'#000000'}
			innerBorderWidth={5}

			fontSize={16}
			spinDuration={0.5}

        />
	);
};

export default MyWheel;
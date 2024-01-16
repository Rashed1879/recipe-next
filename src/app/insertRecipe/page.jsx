import React from 'react';
import Form from '../components/form/Form';

const InsertRecipe = () => {
	return (
		<React.Fragment>
			<div className="container mx-auto">
				<h2 className="text-center font-bold text-3xl mt-5">
					Insert New Recipe
				</h2>
				<Form />
			</div>
		</React.Fragment>
	);
};

export default InsertRecipe;

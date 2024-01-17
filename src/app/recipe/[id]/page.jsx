import React from 'react';

const fetchSingleRecipe = async (params) => {
	const response = await fetch(`http://localhost:5000/recipe/${params.id}`);
	return response.json();
};

const page = async ({ params }) => {
	const recipe = await fetchSingleRecipe(params);
	console.log(recipe);

	return (
		<div>
			<h2>{recipe.title}</h2>
		</div>
	);
};

export default page;

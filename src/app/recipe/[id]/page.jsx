'use client';
import React, { useEffect, useState } from 'react';

const page = ({ params }) => {
	const [recipe, setRecipe] = useState({});
	useEffect(() => {
		fetch(`http://localhost:5000/recipe/${params.id}`)
			.then((res) => res.json())
			.then((data) => setRecipe(data));
	}, []); // getting the single recipe to show in ui

	return (
		<React.Fragment>
			<div className="container mx-auto bg-zinc-300 mt-5 p-5 font-semibold text-lg rounded-lg space-y-4">
				<h2 className="text-center text-2xl">Details Informations</h2>
				<h4>Title : {recipe.title}</h4>
				<p>Ingredients :</p>
				<ul className="list-decimal list-inside space-y-1 pl-20">
					{recipe.ingredients?.map((ingredient, index) => (
						<li key={index}>{ingredient}</li>
					))}
				</ul>
				<p>Instruction : {recipe.instruction}</p>
			</div>
		</React.Fragment>
	);
};

export default page;

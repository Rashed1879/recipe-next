'use client';
import React, { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import ingredients from '../../../ingredients.json';

const InsertRecipe = () => {
	const ingredientsLabel = ingredients.map((label) => label.label);
	const [selectedItem, setSelectedItem] = useState({
		option: ingredientsLabel,
		selectedIngredients: [],
	});

	const handleSelect = (selectedIngredients) => {
		setSelectedItem((previousValue) => ({
			...previousValue,
			selectedIngredients: selectedIngredients,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const title = form.title.value;
		const ingredients = selectedItem.selectedIngredients;
		const instruction = form.instruction.value;
		const optionalMedia = form.optionalMedia.value;

		const newRecipe = {
			title,
			ingredients,
			instruction,
			optionalMedia,
		};

		console.log(newRecipe);

		fetch('http://localhost:5000/recipes', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(newRecipe),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	};

	return (
		<React.Fragment>
			<div className="container mx-auto">
				<h2 className="text-center font-bold text-3xl mt-5">
					Insert New Recipe
				</h2>
				<form className="max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
					<label className="block mb-2 text-lg font-semibold">
						Title:
					</label>
					<input
						type="text"
						name="title"
						required
						className="w-full p-2 mb-4 border border-gray-300 rounded"
					/>

					<label className="block mb-2 text-lg font-semibold">
						Ingredients:
					</label>
					<Multiselect
						isObject={false}
						options={selectedItem.option}
						onSelect={handleSelect}
					/>
					<label className="block mb-2 text-lg font-semibold">
						Instruction:
					</label>
					<textarea
						name="instruction"
						required
						className="w-full p-2 mb-4 border border-gray-300 rounded"
					></textarea>

					<label className="block mb-2 text-lg font-semibold">
						Optional Image/Video:
					</label>
					<input
						type="text"
						name="optionalMedia"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
					/>

					<button
						type="submit"
						className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
					>
						Create Recipe
					</button>
				</form>
			</div>
		</React.Fragment>
	);
};

export default InsertRecipe;

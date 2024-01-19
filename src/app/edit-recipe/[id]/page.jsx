'use client';
import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';
import ingredients from '../../../../ingredients.json';

const page = ({ params }) => {
	const ingredientsLabel = ingredients.map((label) => label.label);
	const [selectedItem, setSelectedItem] = useState({
		option: ingredientsLabel,
		selectedIngredients: [],
	});
	const [singleRecipe, setSingleRecipe] = useState({}); //state for storing single recipe

	useEffect(() => {
		fetch(`https://recipe-next-server-chi.vercel.app/recipe/${params.id}`)
			.then((res) => res.json())
			.then((data) => setSingleRecipe(data));
	}, []); // getting the recipe

	const handleSelect = (selectedIngredients) => {
		setSelectedItem((previousValue) => ({
			...previousValue,
			selectedIngredients: selectedIngredients,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const updatedTitle = form.title.value;
		const updatedIngredients = selectedItem.selectedIngredients;
		const updatedInstruction = form.instruction.value;
		const updatedOptionalMedia = form.optionalMedia.value;

		// Regex patterns
		const titleRegex = /^[a-zA-Z\s]+$/;
		const instructionRegex = /^[\s\S]+$/;

		if (!titleRegex.test(updatedTitle)) {
			alert('Title must contain only letters (A-Z or a-z)');
			return;
		} // title pattern validation

		if (
			!updatedTitle ||
			updatedIngredients.length === 0 ||
			!updatedInstruction
		) {
			alert(
				'Please fill in all required fields (Title, Ingredients, Instruction)'
			);
			return;
		} // all the field with ingredients validation

		if (!instructionRegex.test(updatedInstruction)) {
			alert('Instruction must contain only letters and numbers');
			return;
		} // instruction pattern validation

		const updatedRecipe = {
			updatedTitle,
			updatedIngredients,
			updatedInstruction,
			updatedOptionalMedia,
		};

		fetch(`https://recipe-next-server-chi.vercel.app/recipe/${params.id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(updatedRecipe),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					alert('Updated Successfully');
				}
			}); // updating the recipe
	};
	return (
		<React.Fragment>
			<div className="container mx-auto">
				<h2 className="text-center font-bold text-3xl mt-5">
					Edit Recipe : {singleRecipe.title}
				</h2>
				<form className="max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
					<label className="block mb-2 text-lg font-semibold">
						Title:
					</label>
					<input
						type="text"
						name="title"
						defaultValue={singleRecipe.title}
						required
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						placeholder="edit title for the recipe"
					/>

					<label className="block mb-2 text-lg font-semibold">
						Ingredients:
					</label>
					<Multiselect
						selectedValues={singleRecipe.ingredients}
						isObject={false}
						options={selectedItem.option}
						onSelect={handleSelect}
						placeholder="edit ingredients"
					/>
					<label className="block mb-2 text-lg font-semibold">
						Instruction:
					</label>
					<textarea
						name="instruction"
						defaultValue={singleRecipe.instruction}
						required
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						placeholder="edit instruction for the recipe"
					></textarea>

					<label className="block mb-2 text-lg font-semibold">
						Optional Image/Video:
					</label>
					<input
						defaultValue={singleRecipe.optionalMedia}
						type="text"
						name="optionalMedia"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						placeholder="edit Image/video url (optional)"
					/>

					<button
						type="submit"
						className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
					>
						Update Recipe
					</button>
				</form>
			</div>
		</React.Fragment>
	);
};

export default page;

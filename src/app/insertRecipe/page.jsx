'use client';
import React, { useRef, useState } from 'react';
import Multiselect from 'multiselect-react-dropdown'; // react component for multiselect
import ingredients from '../../../ingredients.json';

const InsertRecipe = () => {
	const ingredientsLabel = ingredients.map((label) => label.label); // making an array of ingredients label
	const [selectedItem, setSelectedItem] = useState({
		option: ingredientsLabel,
		selectedIngredients: [],
	}); // state for multiselect, where selected items will be stored.

	const selectedValues = useRef(); // for accessing the multiselect

	const handleSelect = (selectedIngredients) => {
		setSelectedItem((previousValue) => ({
			...previousValue,
			selectedIngredients: selectedIngredients,
		}));
	}; // this function will handle the multi-selection

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const title = form.title.value;
		const ingredients = selectedItem.selectedIngredients;
		const instruction = form.instruction.value;
		const optionalMedia = form.optionalMedia.value;

		// Regex patterns
		const titleRegex = /^[a-zA-Z\s]+$/;
		const instructionRegex = /^[\s\S]+$/;

		if (!titleRegex.test(title)) {
			alert('Title must contain only letters (A-Z or a-z)');
			return;
		} // title pattern validation

		if (!title || ingredients.length === 0 || !instruction) {
			alert(
				'Please fill in all required fields (Title, Ingredients, Instruction)'
			);
			return;
		} // all the field with ingredients validation

		if (!instructionRegex.test(instruction)) {
			alert('Instruction must contain only letters and numbers');
			return;
		} // instruction pattern validation

		const newRecipe = {
			title,
			ingredients,
			instruction,
			optionalMedia,
		}; // collect all the data and made an object to send to the database

		fetch('https://recipe-next-server-chi.vercel.app/recipes', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(newRecipe),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					alert('Recipe Added Succesfully!');
					form.reset();
					selectedValues.current.resetSelectedValues(); // reset the multiselect
				}
			}); // inserting the data into the database
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
						placeholder="title for the recipe"
					/>

					<label className="block mb-2 text-lg font-semibold">
						Ingredients:
					</label>
					<Multiselect
						isObject={false}
						options={selectedItem.option}
						onSelect={handleSelect}
						ref={selectedValues}
						placeholder="select ingredients"
					/>
					<label className="block mb-2 text-lg font-semibold">
						Instruction:
					</label>
					<textarea
						name="instruction"
						required
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						placeholder="instruction for the recipe"
					></textarea>

					<label className="block mb-2 text-lg font-semibold">
						&#40;Optional&#41; Image/Video:
					</label>
					<input
						type="text"
						name="optionalMedia"
						className="w-full p-2 mb-4 border border-gray-300 rounded"
						placeholder="insert Image/video url (optional)"
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

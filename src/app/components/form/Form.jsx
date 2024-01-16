'use client';
import React, { useState } from 'react';
import ingredientsData from '../../../../ingredients.json';

const Form = () => {
	const [formData, setFormData] = useState({
		title: '',
		ingredients: [],
		instruction: '',
		optionalMedia: '',
	});

	const handleChange = (e) => {
		console.log(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Implement your form submission logic here
		console.log('Form submitted:', formData);
	};
	return (
		<React.Fragment>
			<form className="max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
				<label className="block mb-2 text-lg font-semibold">
					Title:
				</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					required
					className="w-full p-2 mb-4 border border-gray-300 rounded"
				/>

				<label className="block mb-2 text-lg font-semibold">
					Ingredients:
				</label>
				<select
					name="ingredients"
					value={formData.ingredients}
					onChange={handleChange}
					multiple
					required
					className="w-full p-2 mb-4 border border-gray-300 rounded"
				>
					{ingredientsData.map((ingredient) => (
						<option key={ingredient.id} value={ingredient.id}>
							{ingredient.label}
						</option>
					))}
				</select>

				<label className="block mb-2 text-lg font-semibold">
					Instruction:
				</label>
				<textarea
					name="instruction"
					value={formData.instruction}
					onChange={handleChange}
					required
					className="w-full p-2 mb-4 border border-gray-300 rounded"
				></textarea>

				<label className="block mb-2 text-lg font-semibold">
					Optional Image/Video:
				</label>
				<input
					type="text"
					name="optionalMedia"
					value={formData.optionalMedia}
					onChange={handleChange}
					className="w-full p-2 mb-4 border border-gray-300 rounded"
				/>

				<button
					type="submit"
					className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
				>
					Create Recipe
				</button>
			</form>
		</React.Fragment>
	);
};

export default Form;

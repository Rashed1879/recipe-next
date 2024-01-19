'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
	MdPreview,
	MdDeleteForever,
	MdEditSquare,
	MdOutlineSearch,
} from 'react-icons/md'; // react package for icons

const HomePage = () => {
	const [allRecipes, setAllRecipes] = useState([]);
	const [searchName, setSearchName] = useState('');

	useEffect(() => {
		fetch('http://localhost:5000/allrecipes')
			.then((res) => res.json())
			.then((data) => setAllRecipes(data));
	}, []);

	const handleSearch = () => {
		if (searchName) {
			fetch(`http://localhost:5000/search-recipe/${searchName}`)
				.then((res) => res.json())
				.then((data) => setAllRecipes(data));
		} else {
			fetch('http://localhost:5000/allrecipes')
				.then((res) => res.json())
				.then((data) => setAllRecipes(data));
		}
	}; // this function handles searching

	const handleDelete = (id) => {
		fetch(`http://localhost:5000/recipe/${id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.deletedCount > 0) {
					alert('Recipe Deleted Successfully');
					const remaining = allRecipes.filter(
						(recipe) => recipe._id !== id
					);
					setAllRecipes(remaining);
				}
			})
			.catch((error) => {
				console.log(error);
			}); // delete a recipe from the list
	};

	return (
		<React.Fragment>
			<div>
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold my-5">Recipe List</h2>
					<div className="flex items-center border-[1px] border-black rounded-lg ">
						<input
							onChange={(e) => setSearchName(e.target.value)}
							type="text"
							placeholder="The recipe title to search"
							className="rounded-lg p-2 outline-none"
						/>
						<button
							onClick={handleSearch}
							className="bg-zinc-300 p-2 rounded-lg hover:bg-zinc-200"
							title="search recipe"
						>
							<MdOutlineSearch className="w-6 h-6" />
						</button>
					</div>
				</div>
				{allRecipes.length === 0 ? (
					<div className="text-center space-y-5">
						<h2 className="text-2xl font-bold">
							There is no recipe in the List
						</h2>

						<button className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
							<Link href="/insertRecipe">Add a Recipe</Link>
						</button>
					</div>
				) : (
					<table className="border-[1px] border-black bg-zinc-300 w-full rounded-lg">
						<thead>
							<tr>
								<th className="py-2">Title</th>
								<th className="py-2">Action</th>
							</tr>
						</thead>
						<tbody>
							{allRecipes.map((recipe) => (
								<tr
									key={recipe._id}
									className="border-y-[1px] border-black"
								>
									<td className="text-center py-2">
										{recipe.title}
									</td>
									<td className="flex justify-center space-x-5 py-2">
										<Link href={`/recipe/${recipe._id}`}>
											<MdPreview
												className="text-2xl hover:text-orange-600 cursor-pointer"
												title="View Recipe"
											/>
										</Link>
										<Link
											href={`/edit-recipe/${recipe._id}`}
										>
											<MdEditSquare
												className="text-2xl hover:text-orange-600 cursor-pointer"
												title="Edit Recipe"
											/>
										</Link>
										<MdDeleteForever
											onClick={() =>
												handleDelete(recipe._id)
											}
											className="text-2xl hover:text-orange-600 cursor-pointer"
											title="Delete Recipe"
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</React.Fragment>
	);
};

export default HomePage;

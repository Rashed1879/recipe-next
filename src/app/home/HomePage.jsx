'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
	const [allRecipes, setAllRecipes] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/allrecipes')
			.then((res) => res.json())
			.then((data) => setAllRecipes(data));
	}, []);

	return (
		<div>
			<h2>This is Home Page</h2>
			<h3>{allRecipes.length}</h3>
			<div>
				{allRecipes.map((recipe) => (
					<p key={recipe._id} className="text-red-500">
						{recipe.title}
						<Link href={`/recipe/${recipe._id}`}>
							<p>link</p>
						</Link>
					</p>
				))}
			</div>
		</div>
	);
};

export default HomePage;

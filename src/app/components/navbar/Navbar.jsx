import Link from 'next/link';
import React from 'react';

const Navbar = () => {
	return (
		<React.Fragment>
			<div className="container mx-auto flex justify-between items-center bg-zinc-300 rounded-b-[5px] p-5">
				<h2 className="text-2xl font-bold">
					<span className="text-orange-600">Recipe</span>
					Next
				</h2>
				<ul className="flex items-center space-x-5 font-semibold cursor-pointer">
					<Link href="/">
						<li className="hover:text-orange-600">Home</li>
					</Link>
					<Link href="/insertRecipe">
						<li className="hover:text-orange-600">Add Recipe</li>
					</Link>
				</ul>
			</div>
		</React.Fragment>
	);
};

export default Navbar;

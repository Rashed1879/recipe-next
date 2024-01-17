import HomePage from './home/HomePage';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h1 className="text-4xl font-bold text-center">Recipe app</h1>
			<HomePage />
		</main>
	);
}

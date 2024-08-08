"use client";
import { ReactEventHandler } from "react";
import bannedBooksData from "../../public/banned-book-data.json";

type Book = {
	title: string;
	note: string;
};

export default function Home() {
	const colorIntensity = (
		length: number,
		minLength: number = 1,
		maxLength: number = 32
	) => {
		const clampedLength = Math.min(Math.max(length, minLength), maxLength);
		const internsity = Math.round(
			(255 * (clampedLength - minLength)) / (maxLength - minLength)
		);
		return `rgb(${internsity}, 0, 0)`;
	};

	const handleDisplayBannedBook = (e: any) => {
		e.preventDefault();
		console.log("Display banned books");
	};

	return (
		<div>
			<h1 className="text-white uppercase text-6xl ml-12 mt-12">
				Banned Books
			</h1>
			<ul className="ml-12">
				{Object.entries(bannedBooksData).map(([country, books]) => (
					<li key={country}>
						<a
							href="#"
							onClick={handleDisplayBannedBook}
							className={`transform duration-200 hover:text-red-500 text-white`}
							// style={{ color: colorIntensity(books.length) }}
						>
							{country} ({books.length})
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

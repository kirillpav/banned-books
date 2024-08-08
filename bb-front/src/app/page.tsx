"use client";
import { useState } from "react";
import bannedBooksData from "../../public/banned-book-data.json";

type Book = {
	title: string;
	note: string;
};

export default function Home() {
	const [extendedCountry, setExtendedCountry] = useState<string | null>(null);

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

	const handleDisplayBannedBook = (country: string) => {
		setExtendedCountry((prevCountry) =>
			prevCountry === country ? null : country
		);
	};

	return (
		<div>
			<h1 className="text-white uppercase text-6xl ml-12 mt-12">
				Banned Books
			</h1>
			<ul className="ml-12 w-1/2">
				{Object.entries(bannedBooksData).map(([country, books]) => (
					<li key={country}>
						<a
							href="#"
							onClick={() => handleDisplayBannedBook(country)}
							className={`transform duration-200 hover:text-red-500 text-white`}
							// style={{ color: colorIntensity(books.length) }}
						>
							{country} ({books.length})
						</a>
						{extendedCountry === country && (
							<ul className="flex flex-col">
								{books.map((book: Book) => (
									<li key={book.title} className="text-white">
										<span className="text-red-500">{book.title} </span>- (
										{book.note})
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

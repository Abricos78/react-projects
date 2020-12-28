import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
	const [index, setIndex] = useState(0)
	const {name, job, image, text} = people[index]

	const nextPerson = () => {
		index < people.length - 1 ? setIndex(index + 1) : setIndex(0)
	},
	prevPerson = () => {
		index > 0 ? setIndex(index - 1) : setIndex(people.length - 1)
	},
	randomPerson = () => {
		let randomNumber = Math.round(Math.random() * (people.length - 1))
		
		randomNumber !== index ? setIndex(randomNumber) : randomPerson()
	}

  	return (
		<article className='review'>
			<div className='img-container'>
				<img src={image} alt={name} className='person-img' />
				<span className='quote-icon'>
					<FaQuoteRight />
				</span>
			</div>
			<h4 className='author'>{name}</h4>
			<p className='job'>{job}</p>
			<p className='info'>{text}</p>
			<div className='button-container'>
				<button onClick={prevPerson} className='prev-btn'>
					<FaChevronLeft />
				</button>
				<button onClick={nextPerson} className='next-btn'>
					<FaChevronRight />
				</button>
				
			</div>
			<button onClick={randomPerson} className='random-btn'>
				Suprise me
			</button>
		</article>
	)
};

export default Review;

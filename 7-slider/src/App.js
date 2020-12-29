import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
	const [persons, setPersons] = useState(data)
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const lastIndex = persons.length - 1
		if (index < 0) {
			setIndex(lastIndex)
		} else if (index > lastIndex) {
			setIndex(0)
		}
	},[index, persons])

	useEffect(() => {
		let slider = setInterval(() => setIndex(index + 1), 10000)
		return () => clearInterval(slider)
	}, [index])

	const nextPerson = () => {
		setIndex(index + 1)
	},
	prevPerson = () => {
		setIndex(index - 1)
	}

	return (
		<section className='section'>
			<div className='title'>
				<h2>
					<span>/</span> Reviews
				</h2>
			</div>
			<div className='section-center'>
				{persons.map((person, personIndex) => {
					const {id, name, image, title, quote} = person
					let position = 'nextSlide'
					if (index === personIndex) {
						position = 'activeSlide'
					}
					if (personIndex === index - 1 || (index === 0 && personIndex === persons.length - 1)) {
						position = 'lastSlide'
					}
					return (
						<article className={position} key={id}>
							<img src={image} alt={name} className='person-img' />
							<h4>{name}</h4>
							<p className='title'>{title}</p>
							<p className='text'>{quote}</p>
							<FaQuoteRight className='icon' />
						</article>
					)
				})}
				<button className='prev' onClick={prevPerson}><FiChevronLeft /></button>
				<button className='next' onClick={nextPerson}><FiChevronRight /></button>
			</div>
		</section>
	)
}

export default App;

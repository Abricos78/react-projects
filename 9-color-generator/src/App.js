import React, { useState } from 'react'
import SingleColor from './SingleColor'

import Values from 'values.js'

function App() {
	const [color, setColor] = useState('')
	const [error, setError] = useState(false)
	const [list, setList] = useState(new Values('#f15025').all(10))

	const handleSubmit = e => {
		e.preventDefault()
		try {
			let colors = new Values(color).all(10)
			console.log(colors)
			setList(colors)
		} catch (error) {
			setError(true)
			console.log(error)
		}

	}

  	return (
		<>
			<section className='container'>
				<h3>Color generate</h3>
				<form onSubmit={handleSubmit}>
					<input className={`${error ? 'error' : null}`} type='text' value={color} placeholder='#f15025' onChange={e => setColor(e.target.value)} />
					<button className='btn' type='submit'>generate</button>
				</form>
			</section>
			<section className='colors'>
				{list.map((color, index) => {
					const hex = color.hex
					return (
						<SingleColor key={index} {...color} index={index} hexColor={hex} />
					)
				})}
			</section>
		</>
	)
}

export default App

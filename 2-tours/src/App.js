import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
	const [loading, setLoading] = useState(true)
	const [tours, setTours] =useState([])

	const removeTour = id => {
		const newTours = tours.filter(tour => id !== tour.id)
		setTours(newTours)
	}

	const axiosTours = () => {
		setLoading(true)
		axios.get(url)
		.then(response => setTours(response.data))
		.then(() => setLoading(false))
		.catch(error => {
			setLoading(false)
			console.log(error)
		})
	}

	useEffect(() => {
		axiosTours()
	}, [])

	if (loading) {
		return (
			<main>
				<Loading />
			</main>
		)
	} else {
		return (
			<main>
				{ tours.length > 0 ? 
					<Tours removeTour={removeTour} tours={tours} /> :

					<div className='title'>
						<h2>No tours left</h2>
						<button className='btn' onClick={axiosTours}>Refresh</button>
					</div>
				}
			</main>
		)
	}
  
}

export default App

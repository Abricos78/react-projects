import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [cocktail, setCocktail] = useState(null)

  const getCocktail = () => {
    setLoading(true)
    axios.get(`${url}${id}`)
    .then(response => {
      if (response.data.drinks) {
      const newCocktail = response.data.drinks.map(drink => {
        const {
          idDrink,
          strDrink,
          strDrinkThumb,
          strAlcoholic,
          strGlass,
          strInstructions,
          strCategory,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = drink
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ]
        return {
          id: idDrink,
          image: strDrinkThumb,
          name: strDrink,
          info: strAlcoholic,
          glass: strGlass,
          instructions: strInstructions,
          category: strCategory,
          ingredients
        }
      })
      setCocktail(newCocktail)
    } else {
      setCocktail(null)
    }
    })
    .then(() => setLoading(false))
    .catch(error => {
      console.log(error)
      setLoading(false)
    })
  }

  React.useEffect(() => {
    getCocktail()
  }, [])

  if (loading) {
    return <Loading />
  }
  if (!cocktail) {
    return <h2 className='section-title'>no Cocktail to display</h2>
  }

  const {name, image, category, info, glass, instructions, ingredients} = cocktail[0]

  return (
    <section className='section cocktail-section'>
      <Link className='btn btn-primary' to='/'>back home</Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info :</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail

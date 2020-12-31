import axios from 'axios'
import React, { useState, useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

  const initialState = {
    loading: false,
    cart: [],
    total: 0,
    amount: 0
  }

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const clearCart = () => {
    dispatch({type:'CLEAR_CART'})
  }

  const remove = id => {
    dispatch({type:'REMOVE', id})
  }

  // const increase = id => {
  //   dispatch({type:'INCREASE', id})
  // }

  // const decrease = id => {
  //   dispatch({type:'DECREASE', id})
  // }

  const axiosData = () => {
    dispatch({type:'LOADING'})
    axios.get(url)
    .then(response => dispatch({type:'DISPLAY_ITEMS', items: response.data}))
  }

  const toggleAmount = (id, type) => {
    dispatch({type:'TOGGLE_AMOUNT', payload: {id, type}})
  }

  useEffect(() => {
    axiosData()
  }, [])

  useEffect(() => {
    dispatch({type:'GET_TOTALS'})
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

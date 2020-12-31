
const reducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
                amount: 0
            }
        case 'REMOVE': 
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.id )
            }
        // case 'INCREASE':
        //     return {
        //         ...state,
        //         cart: state.cart.map(item => item.id === action.id ? {...item, amount: item.amount + 1} : item)
        //     }
        // case 'DECREASE':
        //     let cart = state.cart.map(item => item.id === action.id ? {...item, amount: item.amount - 1} : item)
        //     return {
        //         ...state,
        //         cart: cart.filter(item => item.amount !== 0)
        //     }
        case 'GET_TOTALS':
            let {total, amount} = state.cart.reduce((cartTotal, cartItem) => {
                const {price, amount} = cartItem
                cartTotal.amount += amount
                cartTotal.total += price * amount
                return cartTotal
            }, {
                total: 0,
                amount: 0
            })

            total = parseFloat(total.toFixed(2))

            return {
                ...state,
                total,
                amount
            }
        case 'TOGGLE_AMOUNT':
            let tempCart = state.cart.map(item => {
                if (action.payload.id === item.id) {
                    if (action.payload.type === 'inc') {
                        return {...item, amount: item.amount + 1}
                    } else {
                        return {...item, amount: item.amount - 1}
                    }
                } else {
                    return item
                }
            }).filter(item => item.amount !== 0)
            return {
                ...state,
                cart: tempCart
            }
                
        case 'LOADING': 
            return {
                ...state,
                loading: true
            }
        case 'DISPLAY_ITEMS':
            return {
                ...state,
                cart: action.items,
                loading: false
            }
        default:
            throw new Error('no matching action type') 
    }
}

export default reducer
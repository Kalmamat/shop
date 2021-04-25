import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

const initialState = {
    catalog: [],
    cart:[],
    based: "USD",
    rates:{
        USD:0.013,
        EUR:0.011,
        RUB:1
    }
}

const shopReducer = (state = initialState, action) => {
    switch (action.type){
        case "SET_CATALOG":
            return {...state, catalog: action.catalog}
        case "ADD_TO_CART":
            const findProduct = state.cart.find(el => el.id === action.product.id)
            if(findProduct){
                findProduct.quantity++
                return {...state, cart:state.cart.map(el => el.id === findProduct.id ? findProduct : el)}
            } else{
                return {...state, cart: [...state.cart, {...action.product, quantity: 1}]}
            }
        case "REMOVE_FROM_CART":
            const removeProduct = state.cart.find(el => el.id === action.id)
            removeProduct.quantity--
            if (removeProduct.quantity === 0)
                return {...state, cart: state.cart.filter(el => el.id !== removeProduct.id )
            }
               return {...state, cart: state.cart.map(el => el.id === removeProduct.id ? removeProduct : el)}

        case "DELETE_ITEM":
            return {...state, cart: state.cart.filter(el => el.id !== action.id ) }
        case "SORT_CATALOG":
            const newCatalog = [...state.catalog]
            if (action.payload === "a-z"){
                newCatalog.sort((a,b) => a.title < b.title ? -1 : 1 )
            }else if (action.payload === "z-a"){
                newCatalog.sort((a,b) =>b.title < a.title  ? -1 : 1)
            }else if (action.payload === "highest"){
                newCatalog.sort((a,b) => a.price > b.price ? -1 : 1)
            }else if (action.payload === "lowest"){
                newCatalog.sort((a,b) => a.price < b.price ? -1 : 1)

            }
            return {...state, catalog: newCatalog}
        case "GET_BASED":
            return {...state, based: action.payload}
        default:
            return state

    }
}

export const store = createStore(shopReducer, composeWithDevTools())
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // cart: [
    //     {
    //         pizzaId: 12,
    //         name: 'Mediterranean',
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32
    //     }
    // ]
    cart: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            //? payload = newItem which is a pizza object
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            //? payload = pizzaId
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity--
            item.totalPrice = item.quantity * item.unitPrice
        },
        clearCart(state) {
            state.cart = []
        }
    }
})

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer

//? This is redux selector function. The standards for these function to start the name wiht 'get'
export const getTotalCartQuantity = (state) => state.cart.cart.reduce((total, item) => total + item.quantity, 0)

export const getTotalCartPrice = (state) => state.cart.cart.reduce((total, item) => total + item.totalPrice, 0)
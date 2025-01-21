export const Cart = (id, info, quantity) => {
    return {
        type: "ADD_CART",
            id: id,
            info: info,
            quantity: quantity
    }
}
export const updateQuantity = (id, quantity  = 1) =>{
    return {
        type:"UPDATE_QUANTITY",
        id: id,
        quantity:quantity
    }
}
export const PlusQuantity = (id, quantity) =>{
    return {
        type: "PLUS_QUANTITY",
        id: id,
        quantity: quantity
    }
}
export const ExceptQuantity = (id, quantity) =>{
    return {
        type: "EXCEPT_QUANTITY",
        id: id,
        quantity: quantity
    }
}
export const deleteItem = (id) =>{
    return {
        type: "DELETE_ITEM",
        id: id
    }
}
export const deleteAll = () =>{
    return {
        type: "DELETE_ALL"
    }
}
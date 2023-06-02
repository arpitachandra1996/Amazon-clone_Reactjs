export const initialState = {
      basket: [], //start with a empty basket, reducer page for data layer
      user: null
};

//selector
export const getBasketTotal = (basket) => 
basket?.reduce((amount, item) => item.price + amount, 0);
//redux reducer

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

            case 'EMPTY_BASKET':
                return {
                    ...state,
                    basket: []
                }

            case 'REMOVE_FROM_BASKET':
                const index = state.basket.findIndex(
                    (basketItem) => basketItem.id === action.id
                );
                let newBasket = [...state.basket];

                if (index >= 0) {
                    newBasket.splice(index, 1); //index=the elements you are chhosing eg. 0 for 1st ,1 for 2nd element, splice is cut that product 

                }else{
                    console.warn(
                        `cant remove product (id: ${action.id}) as its not in basket!`
                    )
                }
                return{
                    ...state,
                    basket: newBasket
                }

                case 'SET_USER':
                    return{
                        ...state,
                        user: action.user
                    }

            default:
                return state;
    }
};

export default reducer;

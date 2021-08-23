import * as actions from './action.types';

const initialState = {
    recipes:[],
    error: null,
    loading: false,
};

const recipeReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.FETCH_RECIPE_START:
            return {
                ...state,
                loading:true,
            };
        case actions.FETCH_RECIPE_SUCCESS:
            return {
                ...state,
                loading:false,
                recipes: action.payload,
            };
        case actions.FETCH_RECIPE_FAIL:
            return {
                ...state,
                loading:false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default recipeReducer;
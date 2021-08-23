import {takeLatest, all, put, fork, call} from 'redux-saga/effects';
import * as actions from './action.types';
import {getRecipes}from './api'

export function* onloadRecipeAsync({payload: query}){
    // console.log("query", query);
    try{
        const response = yield call(getRecipes,query);
        yield put({
            type: actions.FETCH_RECIPE_SUCCESS,
            payload: response.data,
        });
    } catch(error){
        yield put({
            type: actions.FETCH_RECIPE_FAIL,
            payload: error,
        });
    }
}

export function* onloadRecipe(){
    yield takeLatest(actions.FETCH_RECIPE_START, onloadRecipeAsync);
}

const recipeSaga = [fork(onloadRecipe)];


export default function* rootSaga() {
  yield all([...recipeSaga]);
}

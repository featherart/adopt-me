import { SET_BREED } from './actions'

const DEFAULT_STATE = {
  breed: 'Havanese',
  animal: 'dog'
}
const setBreed = function (state, action) {
  return Object.assign({}, state, { breed: action.value })
}
const rootReducer = function (state = DEFAULT_STATE, action) {
  switch(action.type) {
    case SET_BREED:
      return setBreed(state, action)
    default:
      return state;
  }
}

export default rootReducer

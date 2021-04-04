import { BaseAction } from "../actions/baseAction";
import { Constants } from "../../shared/constants";
import { AppState } from '../../shared/models/appState';

const nameReducer = (state = {} as AppState, action: BaseAction): AppState => {
  const types = Constants().actionTypes;
  switch (action?.type) {
    case types.nameAdd:
      state.names.add(action.payload);
      return {...state};
    case types.nameRemove:
      state.names.remove(action.payload);
      return {...state};
    case types.nameSetFilter:
      return {...state, ...{nameFilter: action.payload}}
    default:
      return state;
  }
};

export default nameReducer;

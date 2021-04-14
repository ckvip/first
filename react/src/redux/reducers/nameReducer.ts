import { BaseAction } from '../actions/baseAction';
import { AppState } from '../../shared/models/appState';
import {ConstNameAdd, ConstNameRemove, ConstNameSetFilter} from '../../shared/constants';

const nameReducer = (state = {} as AppState, action: BaseAction): AppState => {
  switch (action?.type) {
    case ConstNameAdd:
      state.names.add(action.payload);
      return {...state};
    case ConstNameRemove:
      state.names.remove(action.payload);
      return {...state};
    case ConstNameSetFilter:
      return {...state, ...{nameFilter: action.payload}};
    default:
      return state ;
  }
};

export default nameReducer;

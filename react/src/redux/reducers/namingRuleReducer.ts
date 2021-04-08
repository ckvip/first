import { BaseAction } from '../actions/baseAction';
import { NamingRule } from '../../shared/models/namingRuleCollection';
import { AppState } from '../../shared/models/appState';
import {
  ConstNamingRuleAdd,
  ConstNamingRuleDisable,
  ConstNamingRuleEnable,
  ConstNamingRuleRemove,
  ConstNamingRuleSetFilter
} from '../../shared/constants';

const namingRuleReducer = (state = {} as AppState, action: BaseAction): AppState => {
  switch (action?.type) {
    case ConstNamingRuleAdd:
      state.namingRules.add(action.payload);
      return {...state};
    case ConstNamingRuleDisable:
      state.namingRules.disable(action.payload as NamingRule);
      return {...state};
    case ConstNamingRuleEnable:
      state.namingRules.enable(action.payload as NamingRule);
      return {...state};
    case ConstNamingRuleRemove:
      state.namingRules.remove(action.payload);
      return {...state};
    case ConstNamingRuleSetFilter:
      return {...state, ...{namingRuleFilter: action.payload}};
    default:
      return state;
  }
};

export default namingRuleReducer;

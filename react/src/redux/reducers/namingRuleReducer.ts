import { BaseAction } from "../actions/baseAction";
import { NamingRule } from "../../shared/models/namingRuleCollection";
import { Constants } from "../../shared/constants";
import { AppState } from '../../shared/models/appState';

const namingRuleReducer = (state = {} as AppState, action: BaseAction): AppState => {
  const types = Constants().actionTypes;
  switch (action?.type) {
    case types.namingRuleAdd:
      state.namingRules.add(action.payload);
      return {...state};
    case types.namingRuleDisable:
      state.namingRules.disable(action.payload as NamingRule);
      return {...state};
    case types.namingRuleEnable:
      state.namingRules.enable(action.payload as NamingRule);
      return {...state};
    case types.namingRuleRemove:
      state.namingRules.remove(action.payload);
      return {...state};
    case types.namingRuleSetFilter:
      return {...state, ...{namingRuleFilter: action.payload}}
    default:
      return state;
  }
};

export default namingRuleReducer;

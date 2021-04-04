import { Constants } from "../../shared/constants";
import { NamingRule } from "../../shared/models/namingRuleCollection";
import { BaseAction } from './baseAction';

export const NamingRuleSetFilter = (payload: { disabled: boolean }): BaseAction => {
  return {type: Constants().actionTypes.namingRuleSetFilter, payload};
}

export const NamingRuleAdd = (payload: NamingRule): BaseAction => {
  return {type: Constants().actionTypes.namingRuleAdd, payload};
};

export const NamingRuleDisable = (payload: NamingRule): BaseAction => {
  return {type: Constants().actionTypes.namingRuleDisable, payload};
};

export const NamingRuleEnable = (payload: NamingRule): BaseAction => {
  return {type: Constants().actionTypes.namingRuleEnable, payload};
}

export const NamingRuleRemove = (payload: NamingRule): BaseAction => {
  return {type: Constants().actionTypes.namingRuleRemove, payload};
};

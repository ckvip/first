import {
  ConstNamingRuleAdd,
  ConstNamingRuleDisable,
  ConstNamingRuleEnable, ConstNamingRuleRemove,
  ConstNamingRuleSetFilter
} from '../../shared/constants';
import { NamingRule } from '../../shared/models/namingRuleCollection';
import { BaseAction } from './baseAction';

export const NamingRuleSetFilter = (payload: { disabled: boolean }): BaseAction => {
  return {type: ConstNamingRuleSetFilter, payload};
};

export const NamingRuleAdd = (payload: NamingRule): BaseAction => {
  return {type: ConstNamingRuleAdd, payload};
};

export const NamingRuleDisable = (payload: NamingRule): BaseAction => {
  return {type: ConstNamingRuleDisable, payload};
};

export const NamingRuleEnable = (payload: NamingRule): BaseAction => {
  return {type: ConstNamingRuleEnable, payload};
};

export const NamingRuleRemove = (payload: NamingRule): BaseAction => {
  return {type: ConstNamingRuleRemove, payload};
};

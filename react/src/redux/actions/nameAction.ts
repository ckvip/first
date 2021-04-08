import { BaseAction } from './baseAction';
import { Name } from '../../shared/models/nameCollection';
import {ConstNameAdd, ConstNameRemove, ConstNameSetFilter} from '../../shared/constants';

export const NameSetFilter = (payload: any): BaseAction => {
  return {type: ConstNameSetFilter, payload};
};
export const NameAdd = (payload: Name): BaseAction => {
  return {type: ConstNameAdd, payload};
};
export const NameRemove = (payload: Name): BaseAction => {
  return {type: ConstNameRemove, payload};
};


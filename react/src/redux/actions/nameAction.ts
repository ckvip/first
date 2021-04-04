import { BaseAction } from "./baseAction";
import { Constants } from "../../shared/constants";
import { Name } from '../../shared/models/nameCollection';

export const NameSetFilter = (payload: any): BaseAction => {
  return {type: Constants().actionTypes.nameSetFilter, payload};
}
export const NameAdd = (payload: Name): BaseAction => {
  return {type: Constants().actionTypes.nameAdd, payload};
}
export const NameRemove = (payload: Name): BaseAction => {
  return {type: Constants().actionTypes.nameRemove, payload};
}


import {BaseAction} from "./baseAction";
import {Constants} from "../../shared/constants";
import {NamingRule} from "../../shared/models/namingRuleCollection";


export class NamingRuleLoad extends BaseAction {
    type = Constants().actionTypes.namingRuleLoad;
}

export const NamingRuleAdd = (payload: NamingRule) => {
    return {type : Constants().actionTypes.namingRuleAdd, payload}
};

export class NamingRuleDisable extends BaseAction {
    type = Constants().actionTypes.namingRuleDisable;
}

export class NamingRuleEnable extends BaseAction {
    type = Constants().actionTypes.namingRuleEnable;
}

export const NamingRuleRemove = (payload: NamingRule) => {
    return {type: Constants().actionTypes.namingRuleRemove, payload};
};

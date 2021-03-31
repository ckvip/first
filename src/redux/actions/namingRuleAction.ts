import {BaseAction} from "./baseAction";
import {Constants} from "../../shared/constants";


export class NamingRuleLoad extends BaseAction {
    type = Constants().actionTypes.namingRuleLoad;
}

export class NamingRuleAdd extends BaseAction {
    type = Constants().actionTypes.namingRuleAdd;
}

export class NamingRuleDisable extends BaseAction {
    type = Constants().actionTypes.namingRuleDisable;
}

export class NamingRuleEnable extends BaseAction {
    type = Constants().actionTypes.namingRuleEnable;
}

export class NamingRuleRemove extends BaseAction {
    type = Constants().actionTypes.namingRuleRemove;
}

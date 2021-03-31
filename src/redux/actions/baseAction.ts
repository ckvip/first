import {Action} from "redux";
import {Name} from "../../shared/models/nameCollection";
import {NamingRule} from "../../shared/models/namingRuleCollection";

export abstract class BaseAction implements Action {
    type = '';
    constructor(public payload: Name | NamingRule) {
    }
}

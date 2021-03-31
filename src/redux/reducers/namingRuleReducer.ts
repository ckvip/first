import {BaseAction} from "../actions/baseAction";
import {AppState} from "../../shared/models/appState";
import {NamingRule} from "../../shared/models/namingRuleCollection";
import {Constants} from "../../shared/constants";

const namingRuleReducer = (state: AppState = new AppState(), action: BaseAction): NamingRule[] | void => {
    const types = Constants().actionTypes;
    switch (action.type) {
        case types.namingRuleAdd:
            state.namingRules.add(action.payload);
            break;
        case types.namingRuleDisable:
            state.namingRules.disable(action.payload as NamingRule);
            break;
        case types.namingRuleEnable:
            state.namingRules.enable(action.payload as NamingRule);
            break;
        case types.namingRuleRemove:
            state.namingRules.remove(action.payload);
            break;
        default:
            return state.namingRules.getData();
    }
};

export default namingRuleReducer;

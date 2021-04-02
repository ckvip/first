import {BaseAction} from "../actions/baseAction";
import {NamingRule, NamingRuleCollection} from "../../shared/models/namingRuleCollection";
import {Constants} from "../../shared/constants";
const namingRuleReducer = (state: NamingRuleCollection = new NamingRuleCollection(), action: BaseAction): NamingRuleCollection => {
    const types = Constants().actionTypes;
    switch (action?.type) {
        case types.namingRuleAdd:
            state.add(action.payload);
            break;
        case types.namingRuleDisable:
            state.disable(action.payload as NamingRule);
            break;
        case types.namingRuleEnable:
            state.enable(action.payload as NamingRule);
            break;
        case types.namingRuleRemove:
            state.remove(action.payload);
            break;
    }
    return state;
};

export default namingRuleReducer;

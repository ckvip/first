import {BaseAction} from "../actions/baseAction";
import {AppState} from "../../shared/models/appState";
import {Name} from "../../shared/models/nameCollection";
import {Constants} from "../../shared/constants";

const nameReducer = (state: AppState = new AppState(), action: BaseAction): Name[] | void => {
    const types = Constants().actionTypes;
    switch (action.type) {
        case types.namingRuleAdd:
            state.names.add(action.payload);
            break;
        case types.namingRuleRemove:
            state.names.remove(action.payload);
            break;
        default:
            return state.names.getData();
    }
};

export default nameReducer;

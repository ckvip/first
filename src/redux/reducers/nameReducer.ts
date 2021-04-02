import {BaseAction} from "../actions/baseAction";
import {NameCollection} from "../../shared/models/nameCollection";
import {Constants} from "../../shared/constants";

const nameReducer = (state: NameCollection = new NameCollection(), action: BaseAction): NameCollection => {
    const types = Constants().actionTypes;
    switch (action?.type) {
        case types.nameAdd:
            state.add(action.payload);
            break;
        case types.nameRemove:
            state.remove(action.payload);
            break;
    }
    return state;
};

export default nameReducer;

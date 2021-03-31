import {combineReducers} from "redux";
import namingRuleReducer from "./namingRuleReducer";
import nameReducer from "./nameReducer";

export default combineReducers({namingRuleReducer, nameReducer});

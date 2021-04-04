import { combineReducers } from "redux";
import namingRuleReducer from "./namingRuleReducer";
import nameReducer from "./nameReducer";

const rootReducer = combineReducers({namingRuleState: namingRuleReducer, nameState: nameReducer});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

import {createStore} from "redux";
import rootReducer from './reducers';
import {NamingRuleCollection} from "../shared/models/namingRuleCollection";
import {NameCollection} from "../shared/models/nameCollection";

const initState = {namingRuleReducer: NamingRuleCollection.initData(), nameReducer: new NameCollection()} as any;
export default createStore(rootReducer, initState);

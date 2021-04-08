import { createStore } from 'redux';
import rootReducer from './reducers';
import { NamingRuleCollection } from '../shared/models/namingRuleCollection';
import { NameCollection } from '../shared/models/nameCollection';
import { AppState } from '../shared/models/appState';

const initData = {
  names: NameCollection.initData(),
  namingRules: NamingRuleCollection.initData(),
  namingRuleFilter: {disabled: false, all: true},
  nameFilter: {name: ''}
} as AppState;
const initState = {namingRuleState: initData, nameState: initData} as any;
export default createStore(rootReducer, initState);

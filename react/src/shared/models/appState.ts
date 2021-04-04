import { NameCollection } from './nameCollection';
import { NamingRuleCollection } from './namingRuleCollection';

export interface AppState {
  names: NameCollection;
  nameFilter: { name: string };
  namingRules: NamingRuleCollection;
  namingRuleFilter: { disabled: boolean, all: boolean };
}

import {NamingRuleCollection} from "./namingRuleCollection";
import {NameCollection} from "./nameCollection";

export class AppState {
    namingRules: NamingRuleCollection = new NamingRuleCollection();
    names: NameCollection = new NameCollection();
}

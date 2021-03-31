import {BaseCollection} from "./baseCollection";
import {NamingRuleType} from "../types";

export class NamingRuleCollection extends BaseCollection<NamingRule> {
    constructor() {
        super('NamingRule');
        if (!this.getData().length) {
            const rule = new NamingRule();
            rule.name = 'Default Rule';
            rule.value.push({type: 'FreeText', value: ''});
            this.add(rule);
        }
        console.log(this.getData());
    }
    disable(item: NamingRule) {
        this.getById(item.id).disabled = true;
        this.save();
    }
    enable(item: NamingRule) {
        this.getById(item.id).disabled = false;
        this.save();
    }
}

export class NamingRule {
    id = new Date().getTime();
    name = '';
    disabled = false;
    value: Rule[] = [];
}

export interface Rule {
    type: NamingRuleType;
    value: string;
}

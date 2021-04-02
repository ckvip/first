import {BaseCollection} from "./baseCollection";
import {NamingRuleType} from "../types";

export class NamingRuleCollection extends BaseCollection<NamingRule> {
    constructor() {
        super('NamingRule');
    }
    static initData(): NamingRuleCollection {
        const initData = new NamingRuleCollection();
        if (!initData.getData().length) {
            const rule = new NamingRule();
            rule.name = 'Default Rule';
            rule.value.push({type: 'FreeText', value: ''});
            initData.add(rule);
        }
        return initData;
    }
    disable(item: NamingRule) {
        const found = this.getById(item.id);
        if (found) {
            found.disabled = true;
            this.save();
        }
    }
    enable(item: NamingRule) {
        const found = this.getById(item.id);
        if (found) {
            found.disabled = false;
            this.save();
        }
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

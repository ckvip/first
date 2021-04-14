import { BaseCollection } from './baseCollection';
import { NamingRuleType } from '../types';
import { StorageProvider } from '../storageProvider';

const storageKey = 'NamingRule';

export class NamingRuleCollection extends BaseCollection<NamingRule> {
  constructor(data: NamingRule[]) {
    super(storageKey, data);
  }

  static initData(): NamingRuleCollection {
    const storedData = StorageProvider.read<NamingRule>(storageKey);
    const initData = new NamingRuleCollection(storedData);
    if (!initData.items.length) {
      const rule = new NamingRule();
      rule.name = 'Default Rule';
      rule.value.push({type: 'FreeText', value: ''});
      rule.isBuildIn = true;
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
  isBuildIn = false;
}

export interface Rule {
  type: NamingRuleType;
  value: string;
}

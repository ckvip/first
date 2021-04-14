import { BaseCollection } from './baseCollection';
import { StorageProvider } from '../storageProvider';

const storageKey = 'Name';

export class NameCollection extends BaseCollection<Name> {
  constructor(data: Name[]) {
    super(storageKey, data);
  }

  static initData(): NameCollection {
    const storedData = StorageProvider.read<Name>(storageKey);
    return new NameCollection(storedData);
  }
}

export class Name {
  id = new Date().getTime();
  name = '';
}

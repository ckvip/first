import { BaseCollection } from './baseCollection'
import { StorageProvider } from '../storageProvider'

const storageKey = 'Name'

export class Name {
  id = new Date().getTime();
  name = ''
}

export class NameCollection extends BaseCollection<Name> {
  constructor (data: Name[]) {
    super(storageKey, data)
  }

  static initData (): NameCollection {
    const storedData = StorageProvider.read<Name>(storageKey)
    const names = new NameCollection(storedData)
    if (!names.items.length) {
      const n = new Name()
      n.name = 'abcd'
      names.add(n)
    }
    return names
  }
}

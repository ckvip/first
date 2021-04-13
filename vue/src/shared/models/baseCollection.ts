import { StorageType } from '../types'
import { StorageProvider } from '../storageProvider'
import { message } from 'ant-design-vue'

export abstract class BaseCollection<T> {
  private readonly storageType: StorageType;
  private readonly data: T[]| any[];

  protected constructor (type: StorageType, data: T[]) {
    this.storageType = type
    this.data = data
  }

  get items (): T[] {
    return this.data
  }

  save (): void {
    StorageProvider.write(this.storageType, this.data)
  }

  getById (id: number): T | undefined {
    return this.data.find((x: any) => x.id === id)
  }

  exists (id: number): boolean {
    return !!this.getById(id)
  }

  add (item: T): void {
    if (!this.exists((item as any).id)) {
      this.data.push(item)
      this.save()
      message.success(`${this.storageType} was added successfully.`)
    }
  }

  remove (item: T): void {
    const index = this.data.findIndex((x: any) => x.id === (item as any).id)
    if (index > -1) {
      this.data.splice(index, 1)
      this.save()
      message.success(`${this.storageType} was removed successfully.`)
    }
  }
}

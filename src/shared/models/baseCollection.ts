import {StorageType} from "../types";
import {StorageProvider} from "../storageProvider";

export abstract class BaseCollection<T> {
    private readonly storageType: StorageType;
    private readonly data: T[];
    protected constructor(type: StorageType) {
        this.storageType = type;
        this.data = StorageProvider.read(this.storageType);
    }

    save() {
        StorageProvider.write(this.storageType, this.data);
    }

    getData(): T[] {
        return this.data;
    }

    getById(id: number): T | undefined {
        return this.data.find((x: any) => x.id === id);
    }

    exists(id: number): boolean {
        return !!this.getById(id);
    }

    add(item: any): void {
        if(!this.exists(item.id)) {
            this.data.push(item);
            this.save();
        }
    }

    remove(item: any) {
        const index = this.data.findIndex((x: any) => x.id === item.id);
        if (index > -1) {
            this.data.splice(index, 1);
            this.save();
        }
    }

    removeByIndex(index: number) {
        this.data.splice(index, 1);
    }

}

export class StorageProvider {
    static write(key: string, value: any): void{
        localStorage.setItem(key, JSON.stringify(value));
    }

    static read<T>(key: string): T[] {
        const value = localStorage.getItem(key);
        try {
            if (value) {
                return JSON.parse(value);
            }
            return []
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    static remove(key: string): void {
        localStorage.removeItem(key);
    }

    static clear(): void {
        localStorage.clear();
    }
}

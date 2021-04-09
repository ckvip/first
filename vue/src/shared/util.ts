export class Util {
  static clone<T> (obj: T): T {
    return JSON.parse(JSON.stringify(obj))
  }
}

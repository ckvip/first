import {BaseCollection} from "./baseCollection";

export class NameCollection extends BaseCollection<Name> {
    constructor() {
        super('Name');
    }
}

export class Name {
    id = new Date().getTime();
    name = '';
}

import {BaseAction} from "./baseAction";
import {Constants} from "../../shared/constants";

export class NameLoad extends BaseAction {
    type = Constants().actionTypes.nameLoad;
}

export class NameAdd extends BaseAction {
    type = Constants().actionTypes.nameAdd;
}

export class NameRemove extends BaseAction {
    type = Constants().actionTypes.nameRemove;
}

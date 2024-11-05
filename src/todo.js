import { dom_project_add } from "./DOM_generate";

export const greeting = 'hello';

export function newItem(title, description, dueDate, priority, project_name) {
    const item = new TodoItem(title, description, dueDate, priority);

}

export class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get dueDate() {
        return this._dueDate;
    }
    set dueDate(value) {
        // todo: inject error checking 
        this._dueDate = value;
    }
    get priority() {
        return this._priority;
    }
    set priority(value) {
        this._priority = value;
    }
}

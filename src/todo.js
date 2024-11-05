import { dom_display_project, dom_project_add, dom_select_project } from "./DOM_generate";
import { add_to_project, find_project, new_project } from "./projects";

export const greeting = 'hello';

export function create_new_item(title, description, dueDate, priority, project_name) {
    const item = new TodoItem(title, description, dueDate, priority);
    new_project(project_name);
    add_to_project(project_name, item);
    console.log(`Added todo item to project ${project_name}`);
    const project = find_project(project_name);
    if (project === null) {
        console.log("create_new_item: Project does not exist - error");
        return;
    }
    dom_select_project(project, project_name);
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

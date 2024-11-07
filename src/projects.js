import { archive_item } from "./archive";
import { dom_select_project } from "./DOM_generate";
import { retrieve_projects } from "./local_storage";
import { create_new_item } from "./todo";

export const all_projects = [];

export function find_project(name) {
    for (let i = 0; i < all_projects.length; i++) {
        if (all_projects[i].title === name) {
            return all_projects[i];
        }
    }
    return null;
}

// call local_storage.js functions to retrieve all projects
export function retrieve_db_projects() {
    const projects = retrieve_projects();
    for (let i = 0; i < projects.length; i++) {
        const project = new Project(projects[i].title);
        projects[i].items.forEach(item => {
            // console.log(item._title)
            const todo_item = create_new_item(item._title, item._description, item._dueDate, item._priority, projects[i].title);
            project.items.push(todo_item);
        });
        // all_projects.push(project);
    }
}

export function load_all_projects() {
    retrieve_db_projects();
    list_all_projects();
    // for (let i = 0; i < all_projects.length; i++) {
    // dom_select_project(all_projects[i], all_projects[i].title);
    // }
}

//helper debug function
function list_all_projects() {
    console.log("Listing all projects: ");
    all_projects.forEach(project => {
        console.log("Project: ");
        console.log(` ${project.title}`);
        console.log("-->Items: ");
        project.items.forEach(item => {
            console.log(`---->${item.title}`);
        });
    });
}

export function delete_project(name) {
    const project = find_project(name);
    const index = all_projects.indexOf(project);
    all_projects.splice(index, 1);
    console.log(`deleted project ${name}`);
    console.log(`remaining projects: `);
    list_all_projects();
}

export function add_to_project(project_name, item) {
    const project = find_project(project_name);
    if (project === null) {
        console.log("add_to_project: Project does not exist - error");
        return;
    }
    project.items.push(item);
    // project.items.push(item);
}

export function delete_from_project(project, item) {
    const index = project.items.indexOf(item);
    project.items.splice(index, 1);
    if (project.items.length === 0) {
        const index = all_projects.indexOf(project);
        all_projects.splice(index, 1);
    }
}

export function complete_project_item(project, item) {
    const index = project.items.indexOf(item);
    project.items.splice(index, 1);
    if (project.items.length === 0) {
        const index = all_projects.indexOf(project);
        all_projects.splice(index, 1);
    }
    archive_item(item, project.title);
}

function check_existing_project(name) {
    for (let i = 0; i < all_projects.length; i++) {
        if (all_projects[i].title === name) {
            return true;
        }
    }
    return false;
}

export class Project {
    constructor(title) {
        this.title = title;
        this.items = [];
    }
}

export function new_project(name) {
    if (check_existing_project(name)) {
        console.log("Project already exists");
        return null;
    }
    const project = new Project(name);
    all_projects.push(project);
    return project;
}

// original
// export function newProject(name) {
//     const title = name;
//     const items = [];
//     return { title, items };
// }
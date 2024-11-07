import { all_projects } from "./projects.js";

export function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

// store all projects in local storage - used initially to save old data but not needed going forward
export function store_all_projects() {
    if (storageAvailable("localStorage")) {
        localStorage.setItem("projects_list", JSON.stringify(all_projects));
        console.log('projects stored')
    } else {
        console.log("Local storage is not available");
    }
}

//not implemented yet
export function store_todo_item(item) {
    if (storageAvailable("localStorage")) {
        localStorage.setItem(item.title, JSON.stringify(item));
        console.log('todo item stored')
    } else {
        console.log("Local storage is not available");
    }
}

// not implemented yet
export function retrieve_all_todo_items() {
    if (storageAvailable("localStorage")) {
        const item = JSON.parse(localStorage.getItem(title));
        if (item) {
            return item;
        }
    } else {
        console.log("Local storage is not available");
    }
}

export function retrieve_projects() {
    if (storageAvailable("localStorage")) {
        const projects = JSON.parse(localStorage.getItem("projects_list"));
        if (projects) {
            return projects;
        }
    } else {
        console.log("Local storage is not available");
    }
}
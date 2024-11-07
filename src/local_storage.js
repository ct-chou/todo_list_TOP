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

export function store_projects() {
    if (storageAvailable("localStorage")) {
        localStorage.setItem("projects_list", JSON.stringify(all_projects));
        console.log('project stored')
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
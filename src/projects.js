export const all_projects = [];

export function find_project(name) {
    for (let i = 0; i < all_projects.length; i++) {
        if (all_projects[i].title === name) {
            return all_projects[i];
        }
    }
    return null;
}

function list_all_projects() {
    all_projects.forEach(project => {
        console.log(project.title);
        // project.items.forEach(item => {
        // console.log(item.title);
        // });
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

function check_existing_project(name) {
    for (let i = 0; i < all_projects.length; i++) {
        if (all_projects[i].title === name) {
            return true;
        }
    }
    return false;
}

class Project {
    constructor(title) {
        this.title = title;
        this.items = [];
    }
}

export function new_project(name) {
    if (check_existing_project(name)) {
        console.log("Project already exists - error");
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
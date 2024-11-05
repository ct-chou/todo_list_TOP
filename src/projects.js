export const all_projects = [];

export function add_to_project(project, item) {
    project.items.push(item);
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
        return;
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
import { Project } from './projects';

export const all_archived_projects = [];

// returns project from all_archived_projects or null if not found
function find_project_archive(name) {
    for (let i = 0; i < all_archived_projects.length; i++) {
        if (all_archived_projects[i].title === name) {
            return all_archived_projects[i];
        }
    }
    return null;
}

//create new project and add to all_archived_projects
function new_project_archive(name) {
    const project = new Project(name);
    all_archived_projects.push(project);
    return project;
}

export function archive_item(item, project_name) {
    const project = find_project_archive(project_name);
    if (project === null) {
        console.log("archive_item: Project does not exist");
        console.log('Add project to archive list');
        const new_project = new_project_archive(project_name);
        new_project.items.push(item);
        all_archived_projects.push(new_project);
        return;
    }
    project.items.push(item);
}


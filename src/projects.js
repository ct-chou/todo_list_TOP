export const all_projects = [];

export function newProject(name) {
    const title = name;
    const items = [];
    return { title, items };
}
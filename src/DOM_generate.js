const project_list = document.getElementById('project-list');
const container_right = document.getElementById('container-right');

export function dom_project_add(project, project_name) {
  const project_div = document.createElement('div');
  project_div.classList.add('project');
  project_div.setAttribute('id', project_name);
  const header = document.createElement('h2');
  header.classList.add('project-header');
  header.textContent = project_name;
  project_div.appendChild(header);
  project_list.appendChild(project_div);
  // return project_div;
}

export function dom_display_project(project, project_name) {
  const project_div = document.createElement('div');
  project_div.classList.add('project-display-right');
  project.items.forEach(item => {
    const item_div = document.createElement('div');
    item_div.classList.add('item');
    // Title
    const item_title = document.createElement('h3');
    item_title.classList.add('item-title');
    item_title.textContent = item.title;
    item_div.appendChild(item_title);
    // Due date and priority
    const item_attributes = document.createElement('div');
    item_attributes.classList.add('item-attributes');
    // left side
    const attributes_left = document.createElement('div');
    attributes_left.classList.add('attributes-left');
    attributes_left.innerHTML = `Due: ${item.dueDate}`;
    item_attributes.appendChild(attributes_left);
    //right side
    const attributes_right = document.createElement('div');
    attributes_right.classList.add('attributes-right');
    attributes_right.innerHTML = `Priority: ${item.priority}`;
    item_attributes.appendChild(attributes_right);
    // Description
    item_div.appendChild(item_attributes);
    const item_description = document.createElement('p');
    item_description.classList.add('item-description');
    item_description.textContent = item.description;
    item_div.appendChild(item_description);
    project_div.appendChild(item_div);
  });
  container_right.appendChild(project_div);
}
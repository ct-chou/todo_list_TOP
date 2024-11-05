import { add } from "date-fns";
import { create_new_item } from "./todo";

const project_list = document.getElementById('project-list');
const container_right = document.getElementById('container-right');

function dom_add_task() {
  const dialog = document.getElementById('dialog-box');
  const cancelBtn = document.getElementById('cancel-btn');
  const submitBtn = document.getElementById('submit-btn');
  const add_task_btn = document.getElementById('add-task');

  add_task_btn.addEventListener('click', () => {
    dialog.showModal();
    document.getElementById('new-title').value = '';
    document.getElementById('new-description').value = '';
    document.getElementById('new-due-date').value = '';
    document.getElementById('new-priority').value = '';
    document.getElementById('new-project').value = '';
  });

  cancelBtn.addEventListener('click', () => {
    dialog.close();
  });

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('new-title').value;
    const description = document.getElementById('new-description').value;
    const due_date = document.getElementById('new-due-date').value;
    const priority = document.getElementById('new-priority').value;
    const project = document.getElementById('new-project').value;
    // const project = "Ollie;"
    create_new_item(title, description, due_date, priority, project);
    console.log(title, description, due_date, priority, project);
    dialog.close();
  });

}

export function dom_initialize() {
  dom_add_task();
}

export function dom_select_project(project, project_name) {
  const allProjects = document.querySelectorAll('.project');
  const project_div = document.getElementById(project_name);
  allProjects.forEach(proj => proj.classList.remove('project-selected'));
  project_div.classList.add('project-selected');
  dom_display_project(project, project_name);
}

export function dom_project_add(project, project_name) {
  const allProjects = document.querySelectorAll('.project');
  allProjects.forEach(proj => proj.classList.remove('project-selected'));
  const project_div = document.createElement('div');
  project_div.classList.add('project');
  project_div.classList.add('project-selected');
  project_div.setAttribute('id', project_name);
  const header = document.createElement('h2');
  header.classList.add('project-header');
  header.textContent = project_name;
  project_div.appendChild(header);
  project_list.appendChild(project_div);
  project_div.addEventListener('click', () => {
    dom_select_project(project, project_name);
  });
}

function dom_display_project(project, project_name) {
  const project_div = document.createElement('div');
  const existing_project_display = document.querySelector('.project-display-right');
  if (existing_project_display) {
    existing_project_display.remove();
  }
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
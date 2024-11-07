import { add } from "date-fns";
import { create_new_item } from "./todo";
import { delete_project, delete_from_project, find_project, complete_project_item } from "./projects";

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
    document.getElementById('new-priority').value = 'normal';
    document.getElementById('new-project').value = '';
  });

  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
  });

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('new-title').value;
    const description = document.getElementById('new-description').value;
    const due_date = document.getElementById('new-due-date').value;
    const priority = document.getElementById('new-priority').value;
    const project = document.getElementById('new-project').value;

    if (!title || !project) {
      alert('Please fill out all required fields.');
      return;
    }
    create_new_item(title, description, due_date, priority, project);
    // console.log(title, description, due_date, priority, project);
    dialog.close();
  });

}

export function dom_initialize() {
  dom_add_task();
}

export function dom_select_project(project, project_name) {
  const allProjects = document.querySelectorAll('.project');
  let project_div = document.getElementById(project_name);
  if (!project_div) {
    dom_project_add(project, project_name);
    project_div = document.getElementById(project_name);
  }
  allProjects.forEach(proj => proj.classList.remove('project-selected'));
  project_div.classList.add('project-selected');
  dom_display_project(project, project_name);
}

function dom_project_remove(project_name) {
  // console.log(`removing project ${project_name}`);
  if (!confirm(`Are you sure you want to delete the project ${project_name}?`)) {
    return;
  }
  const project_div = document.getElementById(project_name);
  if (project_div) {
    // console.log('calling .remove()');
    project_div.remove();
    // Force a repaint by manipulating the DOM slightly
    const project_list = document.getElementById('project-list');
    if (project_list) {
      // console.log('forcing repaint');
      project_list.style.display = 'none';
      project_list.offsetHeight; // Trigger a reflow
      project_list.style.display = '';
    }
  } else {
    console.error(`Project div with id ${project_name} not found`);
  }
  const project_list = document.getElementById('project-list');
  const firstProject = project_list.firstElementChild;
  if (firstProject) {
    const projectName = firstProject.getAttribute('id');
    // console.log(`selecting project ${projectName}`);
    const project = find_project(projectName);
    // console.log(`Selecting ${project.title}`);
    if (project) {
      dom_select_project(project, projectName);
    } else {
      console.error(`Project with name ${projectName} not found`);
    }
  }
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
  const delete_button = document.createElement('button');
  delete_button.classList.add('delete-project-button');
  delete_button.textContent = 'Delete';
  project_div.appendChild(delete_button);
  delete_button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    delete_project(project_name);
    dom_project_remove(project_name);
  });

  project_list.appendChild(project_div);
  project_div.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dom_select_project(project, project_name);
  });
}

// Zoom in on selected card
function select_card(item_div) {
  const display = document.querySelector('.project-display-right');
  display.remove();
  const full_card_display = document.createElement('div');
  full_card_display.classList.add('full-card-display');
  const title = document.createElement('h2');
  title.setAttribute('id', 'full-card-title');
  title.textContent = item_div.querySelector('.item-title').textContent;
  full_card_display.appendChild(title);
  const container_2 = document.createElement('div');
  container_2.setAttribute('id', 'full-card-container-2');
  full_card_display.appendChild(container_2);
  const due_date = document.createElement('p');
  due_date.setAttribute('id', 'full-card-due-date');
  due_date.textContent = item_div.querySelector('.attributes-left').textContent;
  container_2.appendChild(due_date);
  const priority = document.createElement('p');
  priority.setAttribute('id', 'full-card-priority');
  priority.textContent = item_div.querySelector('.attributes-right').textContent;
  container_2.appendChild(priority);
  const description = document.createElement('p');
  description.setAttribute('id', 'full-card-description');
  description.textContent = item_div.querySelector('.item-description').textContent;
  full_card_display.appendChild(description);
  const div_buttons = document.createElement('div');
  div_buttons.setAttribute('id', 'full-card-button-container');
  full_card_display.appendChild(div_buttons);
  const close_button = document.createElement('button');
  close_button.textContent = 'Close';
  close_button.classList.add('close-button');
  div_buttons.appendChild(close_button);
  close_button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dom_display_project(find_project(document.querySelector('.project-selected').id), document.querySelector('.project-selected').id);
  });
  const edit_button = document.createElement('button');
  edit_button.textContent = 'Edit';
  edit_button.classList.add('edit-button');
  div_buttons.appendChild(edit_button);
  edit_button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('edit button clicked');
  });

  container_right.appendChild(full_card_display);
  container_right.classList.add('align-center');

}

// displays the todo items in selected project in the right container
function dom_display_project(project, project_name) {
  const full_card = document.querySelector('.full-card-display');
  if (full_card) {
    full_card.remove();
    container_right.classList.remove('align-center');
  }
  const existing_project_display = document.querySelector('.project-display-right');
  if (existing_project_display) {
    existing_project_display.remove();
  }
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
    // complete and delete buttons
    const button_container = document.createElement('div');
    button_container.classList.add('button-container');
    item_div.appendChild(button_container);
    const del_button = document.createElement('button');
    del_button.classList.add('delete-button');
    del_button.textContent = 'Delete';
    button_container.appendChild(del_button);
    const complete_button = document.createElement('button');
    complete_button.classList.add('complete-button');
    complete_button.textContent = 'Completed!';
    button_container.appendChild(complete_button);
    // event listeners
    item_div.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      select_card(item_div);
      console.log(`clicked on item ${item.title}`);
    });

    del_button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!confirm(`Are you sure you want to delete the item: ${item.title}?`)) {
        return;
      }

      delete_from_project(project, item);
      dom_display_project(project, project_name);
    });
    complete_button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!confirm(`Confirming completion of item: ${item.title}?`)) {
        return;
      }
      complete_project_item(project, item);
      dom_display_project(project, project_name);
    });
  });
  container_right.appendChild(project_div);
}
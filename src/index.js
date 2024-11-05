import { greeting, TodoItem } from "./todo";
import "./style.css";
// import { storageAvailable } from "./local_storage";
import { compareAsc, format } from "date-fns";
import { new_project, all_projects, add_to_project } from "./projects";
import { dom_project_add, dom_display_project, dom_initialize } from "./DOM_generate";

const default_proj = new_project("Default");
// all_projects.push(default_proj);
const item1 = new TodoItem("Buy groceries", "Milk, Cheese, Pizza, Fruit, Tylenol", "2021-12-31", "High");
const item2 = new TodoItem("Sell groceries", "Milk, Cheese, Pizza, Fruit, Tylenol", "2021-12-31", "High");
dom_project_add(default_proj, default_proj.title);
// default_proj.items.push(item1);
// default_proj.items.push(item2);
add_to_project(default_proj, item1);
add_to_project(default_proj, item2);

const ollie = new_project("Ollie");
// all_projects.push(ollie);
const item3 = new TodoItem("Walk Ollie", "Play ball ball", "2025-12-31", "High");
const item4 = new TodoItem("Feed Ollie", "80g per meal", "2024-12-31", "High");
dom_project_add(ollie, ollie.title);
ollie.items.push(item3);
ollie.items.push(item4);

dom_display_project(default_proj, default_proj.title);
dom_display_project(ollie, ollie.title);

dom_initialize();

// test existing project
const ollie2 = new_project("Ollie");

// console.log(default_proj.items[0]);
// console.log(item1.title);

// item1.priority = "Low";
// console.log(item1.priority);

// format(new Date(2014, 1, 11), "yyyy-MM-dd");
// //=> '2014-02-11'

// const dates = [
//     new Date(1995, 6, 2),
//     new Date(1987, 1, 11),
//     new Date(1989, 6, 10),
// ];
// dates.sort(compareAsc);
// console.log(dates);
//=> [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]


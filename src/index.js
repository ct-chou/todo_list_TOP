import { greeting, TodoItem } from "./todo";
import "./style.css";
import { store_projects, retrieve_projects } from "./local_storage";
import { compareAsc, format } from "date-fns";
import { load_all_projects, new_project, all_projects, add_to_project, retrieve_db_projects } from "./projects";
import { dom_project_add, dom_initialize, dom_select_project } from "./DOM_generate";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

// // POPULATE WITH DEFAULT INFO
// const default_proj = new_project("Default");
// const item1 = new TodoItem("Buy groceries", "Milk, Cheese, Pizza, Fruit, Tylenol", "2021-12-31", "High");
// const item2 = new TodoItem("Practice guitar", "Practice finding individual notes", "2024-12-31", "Low");
// dom_project_add(default_proj, default_proj.title);
// add_to_project(default_proj.title, item1);
// add_to_project(default_proj.title, item2);
// const ollie = new_project("Ollie");
// const item3 = new TodoItem("Walk Ollie", "Play ball ball", "2025-12-31", "High");
// const item4 = new TodoItem("Feed Ollie", "80g per meal", "2024-12-31", "High");
// dom_project_add(ollie, ollie.title);
// add_to_project(ollie.title, item3);
// add_to_project(ollie.title, item4);
// dom_select_project(ollie, ollie.title);
// dom_select_project(default_proj, default_proj.title);
// store_all_projects();
// // END POPULATION OF DEFAULT LISTS

dom_initialize();
console.log('initialized');
load_all_projects();
console.log('loaded projects');
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


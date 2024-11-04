import { greeting, TodoItem } from "./todo";
import "./style.css";
// import { storageAvailable } from "./local_storage";
import { compareAsc, format } from "date-fns";

console.log(greeting);

// const item1 = newItem("Buy groceries", "Milk, Cheese, Pizza, Fruit, Tylenol", "2021-12-31", "High");
const item1 = new TodoItem("Buy groceries", "Milk, Cheese, Pizza, Fruit, Tylenol", "2021-12-31", "High");

console.log(item1.title);
item1.priority = "Low";
console.log(item1.priority);

format(new Date(2014, 1, 11), "yyyy-MM-dd");
//=> '2014-02-11'

const dates = [
    new Date(1995, 6, 2),
    new Date(1987, 1, 11),
    new Date(1989, 6, 10),
];
dates.sort(compareAsc);
console.log(dates);
//=> [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]


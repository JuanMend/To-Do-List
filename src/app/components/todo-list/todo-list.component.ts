import { Component, OnInit } from "@angular/core";
import { Todo } from "../../interface/todo";
import { trigger, transition, style, animate } from "@angular/animations";
@Component({
  selector: "todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"],
  animations: [
    trigger("fade", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate(200, style({ opacity: 1, transform: "translateY(0px)" }))
      ]),
      transition(":leave", [
        animate(200, style({ opacity: 0, transform: "translateY(30px)" }))
      ])
    ])
  ]
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEdit: string;
  filter: string;
  anyRemainingModel: boolean;
  constructor() {}

  ngOnInit() {
    this.anyRemainingModel = true;
    this.filter = "all";
    this.todoTitle = "";
    this.idForTodo = 4;
    this.todos = [
      {
        id: 1,
        title: "Eggs",
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: "Milk",
        completed: false,
        editing: false
      },
      {
        id: 3,
        title: "Water",
        completed: false,
        editing: false
      }
    ];
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    });

    this.todoTitle = "";
    this.idForTodo++;
  }
  //  Not Returning Anything
  editTodo(todo: Todo): void {
    this.beforeEdit = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEdit;
    }

    this.anyRemainingModel = this.anyRemaining();
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEdit;
    todo.editing = false;
  }
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  checkAllTodos(): void {
    this.todos.forEach(
      todo => (todo.completed = (<HTMLInputElement>event.target).checked)
    );
    this.anyRemainingModel = this.anyRemaining();
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  todosFiltered(): Todo[] {
    if (this.filter === "all") {
      return this.todos;
    } else if (this.filter === "active") {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === "completed") {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }
}

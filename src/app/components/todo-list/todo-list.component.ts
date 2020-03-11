import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interface/todo';
@Component({
	selector: 'todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
	todos: Todo[];
	todoTitle: string;
	idForTodo: number;
	beforeEdit: string;
	constructor() {}

	ngOnInit() {
		this.todoTitle = '';
		this.idForTodo = 4;
		this.todos = [
			{
				id: 1,
				title: 'Eggs',
				completed: false,
				editing: false
			},
			{
				id: 2,
				title: 'Milk',
				completed: false,
				editing: false
			},
			{
				id: 3,
				title: 'Water',
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

		this.todoTitle = '';
		this.idForTodo++;
	}
	//  Not Returning Anything
	editTodo(todo: Todo): void {
		this.beforeEdit = todo.title;
		todo.editing = true;
	}

	deleteTodo(id: number): void {
		this.todos = this.todos.filter((todo) => todo.id !== id);
	}
}

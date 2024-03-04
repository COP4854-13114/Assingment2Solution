import { TodoListItem } from "./todolistitem.model";

export class TodoList {
    id: number;
    title: string;
    created_at: Date;
    list_items: TodoListItem[];

    constructor(title:string) {
        this.list_items = [];
        this.id = myTodoLists.length ? Math.max(...myTodoLists.map(todoList => todoList.id)) + 1 : 1;
        this.title = title;
        this.created_at = new Date();
    }
}

const myTodoLists:TodoList[]=[];
export default myTodoLists;
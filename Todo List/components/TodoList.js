import html from "../core.js";
import { connect } from "../store.js";

import TodoItem from "./TodoItem.js";

const connector = connect(); 

function TodoList({ todos, filter, filters }) { 
    return html`
        <section class="main">
            <input 
                id="toggle-all" 
                class="toggle-all" 
                type="checkbox" 
                onchange="dispatch('toogleAll', this.checked)"
                ${todos.every(todo => todo.completed) && 'checked'}
            >
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${todos.map((todo, index) => {
                    if(filters[filter](todo)){
                        return TodoItem({ todo, index })
                    }
                })}
            </ul>
        </section>
    `;
}

export default connector(TodoList);
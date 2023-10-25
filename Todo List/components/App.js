import html from "../core.js";
import { connect } from "../store.js";

import Header from "./Header.js";
import TodoList from "./TodoList.js";
import Footer from "./Footer.js";

const connector = connect(); // func(component) : function(props, ...args) => component({props, ...args})

function App({ todos }) { 
    return html`
        <section class="todoapp">
            ${Header()}
            ${todos.length > 0 && TodoList()}
            ${todos.length > 0 && Footer()}
        </section>
    `;
}

// Nếu có thêm tham số truyền vào thì sử dụng như bên dưới còn nếu không chỉ cần đơn giản là export default App;
export default connector(App);
// -> component là App, mà connector(App) là một function có tham số là props và ...args => khi connector(App) 
// được gọi thì sẽ gọi hàm App({props, selector(state),..args})
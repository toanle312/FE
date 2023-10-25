const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (function(){
    const names = ["Toan"];
    const addBtn = $('.add');
    const list = $('ul')
    const input = $('input');
    return {
        add(name){
            names.push(name);
        },
        delete(index){
            names.splice(index, 1);
        },
        render(){
            const html = names.map((name, index)=>{
                return `<li>
                            ${name}
                            <button class="delete" data-index="${index}">Delete</button>
                        </li>`
            })

            list.innerHTML = html.join('');
        },

        handleDelete: function(e){
            // delegate event
            const deleteBtn = e.target.closest('.delete');
            if(deleteBtn)
            {
                const index = deleteBtn.dataset.index;
                this.delete(index);
                this.render();
            }
        },

        handleEvent: function(){
            addBtn.onclick = () =>{// Không cần tách ra do xử lý sự kiện click đơn giản
                this.add(input.value);

                input.value = '';
                input.focus();
                this.render();
            }
            // this trong handleDelete lúc này là của list (ul) chứ không phải của app => do ta gán hàm
            // Do đó => ta cần binding this
            list.onclick = this.handleDelete.bind(this); // Tách hàm do cần xử lý sự kiện click phức tạp hơn
            
        },
        init(){
            this.render();
            this.handleEvent();
        }
    }
})()

app.init();
// 1. IIFE - Immediately Invoked Function Expression
(function(){
    console.log('Hello world!')
})()

// Sử dụng IIFE để bảo vệ tính toàn vẹ của dữ liệu
const app = (() =>{
    const cars = []
    return{
        addCar(car){
            cars.push(car)
        },

        removeCar(car)
        {
            cars.splice(cars.indexOf(car),1)
        },

        editCar(oldCar, newCar){
            cars[cars.indexOf(oldCar)] = newCar
        }
    }
})()

// 2. Scope

// Biến có phạm vi global
var globalScope = 'global scope'
let globalScope1 = 'global scope'
const globalScope2 = 'global scope'

{
    // Đây là 2 trường hợp biến có phạm vi code block
    let codeBlockScope = 'code block scope'
    const codeBlockScope1 = 'code block scope'

    // Trong trường hợp này codeBlockScope2 vẫn là global scope khi khai báo biến var
    var codeBlockScope2 = 'global scope' 
}

function logger(){
    // Không như code block scope, khi khai biến biến var thì biến chỉ có phạm vi local chứ không global 
    var localScope = 'local scope'

    function localScopeFunc(){
        console.log('local scope function')
    }
}

// 3. Closure

function createCounter(){
    let counter = 0

    // là một closure
    function increase(){
        return ++counter
    }

    return increase
}

const counter1 = createCounter() // một cái phạm vi được tạo ra, trả về hàm increase()
counter1()
counter1()
counter1()
// vấn đề xảy ra ở đây là sau khi hàm increase() trong createCounter() được gán cứng vào counter1 thì sau
// khi counter1 lúc này là biến toàn cục và chỉ bị xóa khỏi bộ nhớ khi đóng chương trình do đó
// biến counter trong createCounter() không được xóa khỏi bộ nhớ dù hàm counter1() đã được chạy xong
// nên kết quả từng phép gọi hàm luôn tăng do biến counter vẫn còn lưu trong bộ nhớ 

function createLogger(namespace){

    // là một closure
    function logger(message){
        console.log(`[${namespace}] ${message}`)
    }

    return logger
}

function createStorage(storageKey){
    const stores = JSON.parse(localStorage.getItem(storageKey)) ?? {}

    const save = function(){
        localStorage.setItem(storageKey, JSON.stringify(stores))
    }

    const storage = {
        // đây là một closure
        get(key){
            return stores[key]
        },

        // đây là một closure
        set(key, value){
            stores[key] = value
            save()
        },

        // đây là một closure
        remove(key){
            delete stores[key]
            save()                   
        }

    }

    return storage
}

const storage = createStorage('storage')
storage.set('name', 'name')
storage.remove('name')

// 4. Strict mode
{
    var sum = (a, b) => a + b;
    function myFunc(a, b){
        return a + b
    }
}

console.log(sum(9,6));

// 5. this key word
this.firstName = 'Toàn';
this.lastName = 'Lê';

const student = {
    firstName: 'Toàn',
    lastName: 'Nguyễn',
    getStudentName : function(){
        return `${this.firstName} ${this.lastName}`;
    }
}

console.log(student.getStudentName()); // this => student

const getStudent = student.getStudentName;// Gán hàm cho một biến chứ chưa gọi hàm và this trong hàm chưa mang giá trị gì cả
                                        // chỉ khi hàm được gọi mới xác định được this trong hàm, this => Windows (global)
console.log(getStudent());

// bind() cho phép ràng buộc this cho một phương thức bất kì (function)

// bind() không thay đổi this, mà trả về hàm mới với this mới và hàm mới vẫn truyền đối số như hàm cũ

// có thể truyền đối số trong bind(this, arg1, arg2, arg3, ...) => tuy nhiên làm cách này sẽ 
// không thể linh hoạt được tham số truyền vào hàm mà chỉ gán cứng các tham số được bind

// gọi bind() bằng function
const getStudent1 = student.getStudentName.bind(student)// Ràng buộc this = student cho getStudent1
console.log(getStudent1());

// this trong hàm tạo đại diện cho đối tượng được tạo
function Animal(name, weight){
    this.name = name;
    this.weight = weight;
}

function Chicken(name, weight, leg){
    this.leg = leg;
    // Nếu gọi thẳng hàm tạo như bên dưới thì this trong hàm Animal chính là Windows (global)
    // Animal(name, weight);
    Animal.call(this, name, weight);    
}

const chicken = new Chicken('Chicken', 100, 2);
console.log(chicken);

function logger(){
    const arr = Array.prototype.slice.call(arguments);

    arr.forEach(item => console.log(item));
}

logger(1,2,3,4,5)
var x = 1;
var y = 1;

var a = 6

b = ++a;
b = a++;
console.log(b)
console.log(a)

var num = 5;
console.log(typeof num);
console.log(num++ + ++num);

var s = 'My-string';
console.log(typeof s.charAt(1))

temp = s.split('-');
console.log(temp);

var array = [
    'HTML',
    'CSS',
    'JavaScript'
];
console.log(array.join(''));
console.log(array.slice(-2,-1));

function showDialog(){
    console.log("Đây là hàm đầu tiên");
}

function writeLog(message){
    console.log("Đây là: " + message);
}

function getAllArguments(){
    console.log(arguments)
}

function getEachArguments(){
    var myString = '';
    var i = 0;
    var n = arguments.length;
    for (var param of arguments)
    {
        if(i == n - 1){
            myString += `${param}`;
        }
        else
        {
            myString += `${param} - `;
        }
        i++;
    }
    console.log(myString)
}

function Sum(a, b){
    return '2' + '8';
}

showDialog();

writeLog("hàm đầu tiên");

getAllArguments('Tham số 1', 'Tham số 2');

getEachArguments('Tham số 1', 'Tham số 2', 'Tham số 3', 'Tham số 4');

console.log(Sum(4, 5));

// Object
var email = 'email';

var myIn4 = {
    fullName: 'Lê Phước Toàn',
    age: 13,
    address: 'Tây Ninh, Việt Nam',
    [email]: 'toanl3122002@gmail.com'
};

// Nếu tên key là một biến thì trong object phải để trong []

console.log(myIn4);

// Object constructor

// Function này không phải là Object mà chỉ là hàm tạo
// Hoặc làm như này: var User = function(firstName, lastName, avatar)
function User(firstName, lastName, avatar){
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;
    
    this.getName = function() {
        return `${this.firstName} ${this.lastName}`;
    };
}

// Object prototype 
User.prototype.className = 'CNTT';
User.prototype.getClassName = function(){
    return `Your class is: ${this.className}`;
};


// Từ khóa 'new' giúp tạo ra một Object từ function
var author = new User('Toàn','Lê','Avatar 1');

for(var ind in author)
{
    if(author.hasOwnProperty(ind))
    {
        console.log(ind);
    }

        
}
console.log(author);
console.log(author.getClassName());
console.log(author.getName())
var user = new User('Dương','Nguyễn','Avatar 2')

// Date 
// Get current date
var date = new Date();

var month = date.getMonth() + 1;
var day = date.getDate();
var year = date.getFullYear();
console.log(`${day}/${month}/${year}`)

// For - Loop

var s = 'Hello World!!!';

var myInfor = {
    name: 'Toan Le',
    age: 21,
    address: 'Tay Ninh',
    'hello' : 'world'
};
// For/in => get index of object, array, string
for (var i in s){
    console.log(i)
}

for (var key in myInfor){
    console.log(typeof key)
}

// For/of => get value of array, string
for (var c of s){
    console.log(c)
}

var language = [
    'HTML',
    'CSS',
    'JS'
];

for (var value of language){
    console.log(value)
}

// Object.values/keys(object name) => array of values/keys
for (var value of Object.values(myInfor)){
    console.log(value)
}

// Array
var courses = [
    {
        id: 1,
        name: 'Java Script',
        coin: 250
    },
    {
        id: 2,
        name: 'HTML, CSS',
        coin: 0
    },
    {
        id: 3,
        name: 'PHP',
        coin: 150
    },
    {
        id: 4,
        name: 'NodeJS',
        coin: 350
    },
    {
        id: 5,
        name: 'ReactJS',
        coin: 350
    }
];

// loop all element => no return
console.log('forEach()');
courses.forEach(function(course){
    console.log(course);
});

// Need predicate to check if all element meet the predicate => return boolean
console.log('every()');
var isCourse = courses.every(function(course){
    return course.id > 0;
});
console.log(isCourse);

// Need predicate to check if exists element meet the predicate => return boolean
console.log('some()');
var isExistsFree = courses.some(function(course){
    return course.coin > 0;
});
console.log(isExistsFree);

// find element => return found element
console.log('find()');
var courseFound = courses.find(function(course){
    return course.name === 'PHP';
});
console.log(courseFound);

// filter all element in list => return list of element
console.log('filter()');
var listCourse = courses.filter(function(course, index, originArray){
    console.log(index);
    console.log(originArray);
    return course.coin === 350;
});
console.log(listCourse);

// MAP - return array with new format

function coursesHandler(course, index, originArray){
    return {
        id: course.id,
        name: `Khoa hoc: ${course.name}`,
        coin: course.coin,
        coinText: `Gia: ${course.coin}`,
        index: index,
        originArray: originArray,
        originArray1: courses
    };
}

// Loop for all element to return object
// if coursesHandler return A then newCourses (array) have value A
console.log('map()');
var newCourses = courses.map(coursesHandler);
console.log(newCourses);

// REDUCE - need to get a single value
console.log('reduce()');

// first argument is output value
function coinHandler(accumulator, curentValue){
    return accumulator + curentValue.coin;
};

// set accumulator = 0 (init value for storage variable)
// , 0 is optional if we don't set 0 then accumulator is first element of Array
// and current value is next element
var totalCoin = courses.reduce(coinHandler, 0);
console.log(totalCoin);

var numbers = [100, 200, 300, 400, 500]

var totalNumbers = numbers.reduce(function(total, number){
    return total + number;
});

console.log(totalNumbers);

var depthArrays = [1, 2, [3, 4], 5, 6, [7, 8, 9]];
var flatArrays = depthArrays.reduce(function(arr, value){
    return arr.concat(value)
},[]);

console.log(flatArrays)

var topics = [
    {
        topic: "Front-end",
        courses: [
            {
                id: 1,
                title: "HTML, CSS"
            },
            {
                id: 2,
                title: "JavaScript"
            }
        ]
    },
    {
        topic: "Back-end",
        courses: [
            {
                id: 1,
                title: "PHP"
            },
            {
                id: 2,
                title: "NodeJS"
            }
        ]
    }
];

var couresArray = topics.reduce(function(arr, topic){
    course = topic.courses;
    titles = course.reduce(function(titles, course){
        return titles.concat(course.title);
    },[]);
    return arr.concat(titles)
},[]);

console.log(couresArray)

// Includes Method (String/Array)

// Polyfill

// Callback Function
Array.prototype.map2 = function(callback){
    var output = [];

    for (var i in this){
        // Check if value at index is property of object
        if(this.hasOwnProperty(i))
        {
            var result = callback(this[i], i);
            output.push(result);
        }
    }

    return output;
}

Array.prototype.forEach2 = function(callback){
    for (var i in this){
        // Check if value at index is property of object
        if(this.hasOwnProperty(i))
        {
            callback(this[i], i, this);
        }
    }
}

Array.prototype.every2 = function(callback){
    for (var i in this){
        // Check if value at index is property of object
        if(this.hasOwnProperty(i))
        {
            var result = callback(this[i], i);
            if(!result){
                return false;
            }
        }
    }
    return true;
}

Array.prototype.some2 = function(callback){
    for (var i in this){
        // Check if value at index is property of object
        if(this.hasOwnProperty(i))
        {
            var result = callback(this[i], i);
            if(result){
                return true;
            }
        }
    }

    return false;
}

Array.prototype.find2 = function(callback){
    for (var i in this){
        // Check if value at index is property of object
        if(this.hasOwnProperty(i))
        {
            var result = callback(this[i], i);
            if(result){
                return this[i];
            }
        }
    }
    return undefined;
}

Array.prototype.filter2 = function(callback){
    var output = [];

    for (var i in this){
        // Check if value at index is property of object
        if(this.hasOwnProperty(i))
        {
            var result = callback(this[i], i, this);
            if(result){
                output.push(this[i]);
            }
        }
    }
    return output;
}

Array.prototype.reduce2 = function(callback, initValue){
    var output = [];

    if(arguments.length == 1)
    {
        var init = this[0];

        for (var i in this){
            // Check if value at index is property of object
            if(this.hasOwnProperty(i) && i != 0)
            {
                var result = callback(init, this[i], i, this);
                init = result;
            }
        }
    }
    else{
        var init = initValue;
        for (var i in this){
            // Check if value at index is property of object
            if(this.hasOwnProperty(i))
            {
                var result = callback(init, this[i], i, this);
                init = result;
            }
        }
    }
    return result;
}

var programs = [
    'HTML',
    'CSS',
    'JavaScript',
    'CSS',
    'Ruby',
    'CSS',
    'PHP'
];


var res = programs.map2(function(program){
    return program;
});

console.log(res)

programs.length = 10;
programs.forEach2(function(program){
    console.log(`This is: ${program}`);
});

var res = programs.every2(function(program){
    return program.length >= 4;
});

console.log(res)

var res = programs.some2(function(program){
    return program.length >= 4;
});

console.log(res)

var res = programs.find2(function(program){
    return program === 'CSS';
});

console.log(res)

var res = programs.filter2(function(program, index, originArray){
    if(program === 'CSS')
    {
        console.log(index);
        console.log(originArray);
        return program === 'CSS';
    }
});

console.log(res)

var numbers = [100, 200, 300, 400, 500]

var totalNumbers = numbers.reduce2(function(total, number){
    if(total > 90)
    {
        return total;
    }
    else{
        if(total >= 0)
        {
            return total + number;
        }
    }
},0);

console.log(totalNumbers)

var depthArrays = [1, 2, [3, 4], 5, 6, [7, 8, 9]];
var flatArrays = depthArrays.reduce2(function(arr, value){
    return arr.concat(value)
},[]);

console.log(flatArrays)

var topics = [
    {
        topic: "Front-end",
        courses: [
            {
                id: 1,
                title: "HTML, CSS"
            },
            {
                id: 2,
                title: "JavaScript"
            }
        ]
    },
    {
        topic: "Back-end",
        courses: [
            {
                id: 1,
                title: "PHP"
            },
            {
                id: 2,
                title: "NodeJS"
            }
        ]
    }
];

var couresArray = topics.reduce2(function(arr, topic){
    course = topic.courses;
    titles = course.reduce2(function(titles, course){
        return titles.concat(course.title);
    },[]);
    return arr.concat(titles)
},[]);

console.log(couresArray)

// HTML DOM
function arrToObj(arr){
    var result = arr.reduce(function(object, element){
        object[element[0]] = element[1];
        return object;
    },{});
    return result;
}
 
// Expected results:
var arr = [
    ['name', 'Sơn Đặng'],
    ['age', 18],
];
console.log(arrToObj(arr)); // { name: 'Sơn Đặng', age: 18 }

var courses = ['HTML & CSS', 'Javascript', 'PHP', 'Java']

function render(courses) {
    var coursesName = courses.map(function(course){
        return `<li>${course}</li>`;
    });
    return coursesName.join('');
}

console.log(render(courses));

// Promise
var promise = new Promise(
    function(resolve, reject){
        resolve();
    }
);

// promise
//     .then(function(){
//         return new Promise(function(resolve){
//             // Không thể truyền hàm dạng resolve() vì sẽ thực thi ngay lập tức
//             // Ta phải gói hàm resolve() trong một hàm định nghĩa để hàm được delay
//             setTimeout(function(){
//                 resolve([1,2,3])
//             },0);
//         });
//     })  
//     .then(function(data){
//         console.log(data);
//     })
//     .catch(function(){
//         console.log('Failure !!!')
//     })
//     .finally(function(){
//         console.log('Done !!!')
//     })


// function sleep(ms){
//     return new Promise(function(resolve){
//             setTimeout(function(){
//                 resolve([1]);
//             }, ms);
//         });
// }

// sleep(1000)
//     // Sau 1s thì vào then
//     .then(function(){
//         console.log(1);
//         // Sau khi in ra 1 thì trả về promise và tiếp tục sleep trong 1s
//         return sleep(1000);
//     })
//     // Do hàm then trước đã trả về promise nên phải chờ hàm trước thực thi xong mới được thực hiện
//     // Chờ sleep 1s do hàm trước trả về
//     .then(function(){
//         console.log(2);
//         return sleep(1000);
//     })
//     // Cứ tiếp tục như vậy cho đến hết
//     .then(function(){
//         console.log(3);
        
//     });

// var promise1 = new Promise(function(resolve)
// {
//         setTimeout(function(){
//             resolve([1]);
//         }, 5000);
// });

// var promise2 = new Promise(
//     function(resolve){
//         setTimeout(function(){
//             resolve([2, 3]);
//         }, 7000);
// });

// // Khi gọi promise trong một promise (return promise trong then )thì promise được gọi 
// // phải là một promise được tạo mới -> return new Promise(function(){...})
// promise1
//     .then(function(newarray){
//         console.log(newarray);
//         // return promise2; -> không hẳn là SAI nhưng không thỏa tính đồng bộ
//         return new Promise(
//             function(resolve){
//                 setTimeout(function(){
//                     resolve([2, 3]);
//                 }, 2000);
//             }); // -> ĐÚNG
//     })
//     .then(function(newarray){
//         console.log(newarray);
//     });

// var users = [
//     {
//         id: 1,
//         name: 'Fong Fat'
//     },
//     {
//         id: 2,
//         name: 'Toan Le'
//     },
//     {
//         id: 3,
//         name: 'Huy Vu'
//     }
// ];

// var comments = [
//     {
//         id: 1,
//         user_id: 1,
//         content: 'Comment cai gi cung duoc !!!'
//     },
//     {
//         id: 2,
//         user_id: 2,
//         content: 'Tra loi cai gi cung duoc !!!'
//     }
// ];

// // Fake API - Hành động lấy dữ liệu thông qua API là một hành vi xử lý bất đồng bộ -> Sử dụng Promise

// // B1: Lấy comments
// function getComments(){
//     return new Promise(function(resolve){
//         setTimeout(function(){
//             resolve(comments)
//         }, 1000);
//     });
// }

// // Lấy user thông qua id
// function getUsersByIds(userId){
//     return new Promise(function(resolve){
//         setTimeout(function(){
//             var result = users.filter(function(user){
//                 return userId.includes(user.id);
//             })
//             resolve(result);
//         }, 1000);
//     });
// }

// getComments()
//     .then(function(comments){
//         var userIds = comments.map(function(comment){
//             return comment.user_id;
//         });
//         // Nếu sau khi return promise mà không có .then thì kết quả trả về cho hàm sau là kết quả trả về của resolve
//         return getUsersByIds(userIds)
//             .then(function(users){ // Nếu có .then thì kết quả trả về cho hàm sau là kết quả trả về của hàm .then
//                 return {
//                     users: users,
//                     comments: comments
//                 };
//             });
//             // Hạn chế làm cách này vì sẽ dẫn đến Promise Hell
//             // Nên return Promise thông thường và hàm .then sau sẽ lấy dữ liệu và tiếp tục xử lý chứ không nên 
//             // xử lý lồng nhau như trên

//     })
//     .then(function(data){
//         var commentBox = document.getElementById('comment-box');
//         var html = '';
//         data.comments.forEach(function(comment){
//             var user = data.users.find(function(user){
//                 return user.id === comment.user_id;
//             })
//             html += `<li>${user.name}: ${comment.content}</li>`;
//         })
//         commentBox.innerHTML = html;
//         console.log(html);
//     })

// var postAPI = 'https://jsonplaceholder.typicode.com/posts';

// fetch(postAPI)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(posts){
//         console.log(posts);
//     }) 


// Destructuring, Rest
var newArray = ['JavaScript', 'PHP', 'Ruby'];

// destructuring
var [a,b,c] = newArray;
console.log(a,b,c);

var [a1,,c1] = newArray;
console.log(a1,c1);

// rest
var [a2, ...rest] = newArray;
console.log(rest);

var newObject = {
    name: 'JavaScript',
    price: 1000,
    image: 'image-address',
    children: {
        name: 'ReactJS'
    }
}
var {price, ...rest} = newObject;
var {children} = newObject

// Đổi tên hiển thị, và lấy thuộc tính trong Object
var {name: parentName, children:{name: childrenName}} = newObject
console.log(parentName);
console.log(childrenName);

// Nếu không tồn tại description trong Object thì sẽ được gán giá trị mặc định là Default Value
// Nếu có tồn tại thì in ra description
var {name, description = 'Default Value'} = newObject;
console.log(description);

// Nếu ... được sử dụng trong Destructuring hay truyền vào tham số hàm thì ... chính là Rest
// Còn những trường hợp còn lại là Spread, truyền vào đối số hàm thì cũng là spread

function logger(...params){
    for (var param of arguments)
    {
        console.log(param);
    }
    console.log(...params);
}

logger(1,2,3,4,5,6);

// Tagged template literals
function highlight([first, ...strings], ...values){
    return values.reduce(
        (acc, curr) => [...acc, `<span>${curr}</span>`, strings.shift()].join(''), 
        [first]
    )
}

var brand = 'F8';
var course = 'JavaScript';

console.log(highlight`Học lập trình ${course} tại ${brand} !!!`);

function testFunc(){
    var testVar = 123;
}

const promiseTest = () => {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('Đây là lỗi');
        }, 1000);
       
    });
}

const executeAsync = async () => {
    try{
        const response = await promiseTest();
        console.log(`${response} + 1`);
        const response1 = await promiseTest();
        console.log(`${response1} + 2`);
        const response2 = await promiseTest();
        console.log(`${response2} + 3`);
    }
    catch(err){
        console.log(1);
        console.log(err);
    }
}

executeAsync();
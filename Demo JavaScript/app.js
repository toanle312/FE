

var coursesAPI = 'http://localhost:3000/courses';

function start()
{
    getCourses(renderCourses);

    handleCreateUpdateForm();
}

start();

// 

function getCourses(callback)
{
    fetch(coursesAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}

function renderCourses(courses)
{
    var coursesListBlock = document.querySelector('#coursesList');
    var htmls = courses.map(function(course){
        return `
        <li class="course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="handleDeleteCourse(${course.id})">Delete</button> 
            <button onclick="handleUpdateCourse(${course.id})">Update</button> 
        </li>`
    })

    var html = htmls.join('');
    coursesListBlock.innerHTML = html;
}

function createCourse(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(coursesAPI, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)

}

// Có tham số id => update
// Không có tham số id => create
// Hoặc có thể giải quyết bằng EventListener => Tạo hai hàm createCourseFunction và updateCourseFunction
function handleCreateUpdateForm(id = undefined)
{
    var createBtn = document.querySelector('#createBtn');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var newCourse = {
            name: name, 
            description: description
        }

        if(createBtn.innerHTML === 'Create')
        {
            createCourse(newCourse, function()
            {
                getCourses(renderCourses);
            })
        }
        else if(createBtn.innerHTML === 'Update')
        {
            updateCourse(newCourse, id, function()
            {
                createBtn.innerHTML = 'Create';
                document.querySelector('input[name="name"]').value = '';
                document.querySelector('input[name="description"]').value = '';
                getCourses(renderCourses);
            })
        }
    }
}

function handleDeleteCourse(id)
{
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(coursesAPI + '/' + id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            var courseItem = document.querySelector(`.course-item-${id}`);
            if(courseItem)
            {
                courseItem.remove();
            };
        })
}

function updateCourse(data, id, callback){
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(coursesAPI + '/' + id, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}

function handleUpdateCourse(id)
{
    var createBtn = document.querySelector('#createBtn');
    createBtn.innerHTML = 'Update';
    var name = document.querySelector(`.course-item-${id} > h4`).innerHTML;
    var description = document.querySelector(`.course-item-${id} > p`).innerHTML;

    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="description"]').value = description;

    handleCreateUpdateForm(id);
}
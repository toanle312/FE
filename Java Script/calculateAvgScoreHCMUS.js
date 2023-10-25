var courseList = document.querySelectorAll('#tbDiemThiGK > tbody > tr');
var newCourseList = [...courseList].map(function(course){
    return {
        courseName : course.cells[1].innerText,
        credit : parseInt(course.cells[2].innerText),
        score : parseFloat(course.cells[5].innerText)
    };
});

var totalCredit = newCourseList.reduce(function(total,course){
    if(course.courseName.includes('Anh văn') || course.courseName.includes('Thể dục') || course.courseName.includes('quốc phòng') || course.courseName.includes('đầu khóa')){
        return total;
    }
    else{
        if(isNaN(course.score) || course.score < 5.0){
            return total;
        }
    }
    console.log(course.courseName + ': ' + course.credit);
    return total + course.credit;
},0);

var totalScore = newCourseList.reduce(function(total, course){
    if(course.courseName.includes('Anh văn') || course.courseName.includes('Thể dục') || course.courseName.includes('quốc phòng') || course.courseName.includes('đầu khóa')){
        return total;
    }
    else{
        if(isNaN(course.score)){
            return total;
        }
    }
    console.log(course.courseName + ': ' + course.score);
    return total + (course.score * course.credit);
},0);


console.log('Tổng tín chỉ: ', totalCredit);
console.log('Điểm trung bình: ',totalScore / totalCredit);
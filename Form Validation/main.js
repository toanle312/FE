function Validator(options){
    // Lưu tất cả các rule test function
    var selectorRules = {};

    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    // Thay đổi trạng thái của các trường nhập liệu hiện tại
    function changeStatus(inputElement, errorMessage = '')
    {
        const parentElement = getParent(inputElement, options.formGroupSelector);
        const formMessage = parentElement.querySelector(options.errorSelector);

        if(errorMessage)
        {
            parentElement.classList.add('invalid');
        }
        else{
            parentElement.classList.remove('invalid');
        }

        formMessage.innerText = errorMessage;
    }

    // Kiểm tra trường hiện tại có valid hay không
    function validate(inputElement, rule){
        // Lấy tất cả các rule mà seclector hiện tại có áp dụng
        // rule.selector là tên của inputElement hiện tại
        const rulesTest = selectorRules[rule.selector];

        // Xử lý tất cả các rule mà seclector hiện tại có áp dụng
        for(var i = 0; i < rulesTest.length; i++){
            var errorMessage = '';
            
            switch(inputElement.type){
                case 'checkbox':
                case 'radio':
                    genderChecked = formElement.querySelector(rule.selector + ':checked');
                    errorMessage = rulesTest[i](genderChecked ? genderChecked.value : '');
                    break;
                default:
                    errorMessage = rulesTest[i](inputElement.value);

            }

            if(errorMessage) {
                break;
            }
        }

        changeStatus(inputElement, errorMessage);

        // errorMessage = '' ('' là một dạng của false) => không có lỗi => return true hay return !false
        return !errorMessage;
    }

    const formElement = document.querySelector(options.form);


    if(formElement)
    {
        formElement.onsubmit = function(e){
            // Loại bỏ sự kiện mặc định
            e.preventDefault();

            var isFormValid = true;
            var data = {};

            var enableInputElement = formElement.querySelectorAll('input[name]:not([disabled])');

            // Lặp qua tất cả các rule và validate toàn bộ
            options.rules.forEach((rule)=>{
                // Không cần lặp toàn bộ, vì hàm validate đã xử lý tất cả các trường hợp kể cả tên trùng nhau
                const inputElement = formElement.querySelector(rule.selector);

                const isValid = validate(inputElement, rule);

                if(!isValid){
                    isFormValid = false;
                }
                else{
                    //data[rule.selector.slice(1)] = inputElement.value;
                }
            })

            
            if(isFormValid){
                if(typeof options.onsubmit === 'function'){
                    data = [...enableInputElement].reduce((values, input) => {
                        // Xử lý các trường hợp input khác nhau
                        switch(input.type){
                            case 'checkbox':
                                // Nếu box được check
                                if(input.checked){
                                    // Nếu là Array thì thêm 
                                    if(Array.isArray(values[input.name])){
                                        values[input.name].push(input.value);
                                        //console.log(values[input.name]);
                                    }
                                    // Không là Array thì tạo array với input value
                                    else{
                                        values[input.name] = [input.value];
                                        //console.log(values)
                                    }
                                }
                                else{
                                    // Nếu không phải là Array thì return trường đó có giá trị = ''
                                    if(!Array.isArray(values[input.name])){
                                        values[input.name] = '';
                                        return values;
                                    }
                                }
                                break;
                            case 'radio':
                                if(input.checked){
                                    values[input.name] = input.value;
                                }
                                break;
                            default:
                                values[input.name] = input.value;

                        }
                        
                        return values;
                    }, {});
                    options.onsubmit(data);
                }
                else{
                    formElement.submit();
                }
            }
            
            console.log(data)

        }

        // Lặp qua mỗi rule và lắng nghe tất cả sự kiện của từng rule một
        options.rules.forEach(
            (rule) =>{
                // Cần lặp qua toàn bộ để xử lý tất cả sự kiện
                const inputElements = formElement.querySelectorAll(rule.selector);

                // Nếu rule hiện tại chưa có function test thì tạo mảng để thêm vào
                // Nếu có rồi thì thêm vào mảng
                // Cách này dùng để xử lý riêng lẻ, không bị ghi đè khi một selector có nhiều rules
                // Function test ở đây là function để kiểm tra cho mỗi rules
                if(Array.isArray(selectorRules[rule.selector])){
                    selectorRules[rule.selector].push(rule.test);
                }
                else{
                    selectorRules[rule.selector] = [rule.test];
                }

                [...inputElements].forEach(inputElement => {
                    if(inputElement)
                    {
                        // Xử lý sự kiện blur
                        inputElement.onblur = function(){
                            validate(inputElement, rule);
                        }
                        // Xử lý sự kiện nhập 
                        inputElement.oninput = function(){
                            changeStatus(inputElement);
                        }
                    }
                })
            }
        )
    };
    
}

Validator.isRequired = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? '' : message || 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            return pattern.test(value.trim()) ? '' : message || 'Trường này phải là email';
        }
    }
}

Validator.isPassword = function(selector, message) {
    return {
        selector: selector,
        test: function(value){
            const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?&]).{8,}$/;
            return pattern.test(value.trim()) ? '' : message || 'Tối thiểu 8 ký tự bao gồm: số, chữ thường, chữ hoa, và các ký tự đặc biệt';
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmedValue, message){
    return {
        selector: selector,
        test: function(value){
            return value === getConfirmedValue() ? '' : message || 'Giá trị nhập vào không chính xác';
        }
    }
}
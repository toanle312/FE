function Validator(formSelector){
    var _this = this;
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    const formElement = document.querySelector(formSelector);
    const formRules = {};
    const validatorRules = {
        required: function(value){
            return value.trim() ? '' : 'Vui lòng nhập trường này';
        },
        email: function(value){
            const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            return pattern.test(value.trim()) ? '' : 'Trường này phải là email';
        },
        password: function(value){
            const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?&]).{8,}$/;
            return pattern.test(value.trim()) ? '' : 'Tối thiểu 8 ký tự bao gồm: số, chữ thường, chữ hoa, và các ký tự đặc biệt';
        },
        confirmed: function(pwdSlector){
            // Nếu để ngoài đây thì nó sẽ lấy value là rỗng vì chưa có giá trị nào được nhập khi vừa mới khởi tạo
            // Khi tạo trang thì tất cả những gì được khai báo sẽ được chạy
            return function(value){
                // Để trong hàm này do cần gọi sau
                // vào hàm này tức là mật khẩu đã được nhập do đó mới chọn được mật khẩu
                var pwd = formElement.querySelector(pwdSlector).value;
                return value === pwd ? '' : 'Giá trị nhập vào không chính xác';
            }
        }
    };
    
    if(formElement){
        const inputElements = formElement.querySelectorAll('input[name][rules]');

        [...inputElements].forEach(inputElement => {
            const rules = inputElement.getAttribute('rules').split('|');
            
            rules.forEach(rule=>{
                var ruleFunction;

                if(rule.includes(':')){
                    const ruleInfo = rule.split(':');
                    ruleFunction = validatorRules[ruleInfo[0]](ruleInfo[1]);
                }
                else{
                    ruleFunction = validatorRules[rule];
                }

                if(Array.isArray(formRules[inputElement.name])){
                    formRules[inputElement.name].push(ruleFunction);
                }
                else{
                    formRules[inputElement.name] = [ruleFunction];
                }
            })

            inputElement.onblur = handleValidate;

            inputElement.oninput = handleClearError;

            formElement.onsubmit = function(e){
                e.preventDefault();
                var data = {};

                const enableInputElements = formElement.querySelectorAll('input[name][rules]:not([disabled])');
                var isFormValid = true;
                [...enableInputElements].forEach(input => {
                    if(!handleValidate({target: input})){
                        isFormValid = false;
                    }
                })
                if(isFormValid)
                {
                    if(typeof _this.onsubmit === 'function'){
                        data = [...enableInputElements].reduce((values, input) => {
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
                        _this.onsubmit(data);
                    }
                    else{
                        formElement.submit();
                    }
                }
            };

        });

        function changeStatus(element, errorMessage = ''){
            const parentElement = getParent(element, '.form-group');

            if(parentElement){
                
                const formMessage = parentElement.querySelector('.form-message');
    
                if(errorMessage){
                    parentElement.classList.add('invalid');
                }
                else{
                    parentElement.classList.remove('invalid');
                }
    
                formMessage.innerText = errorMessage;
            }
        }


        function handleValidate(event){
            const element = event.target;
            const validateRules = formRules[element.name];
            
            // Lặp qua từng rule của element nếu có tồn tại lỗi thì break
            for(var i = 0; i < validateRules.length; i++){
                var errorMessage = '';
            
                switch(element.type){
                    case 'checkbox':
                    case 'radio':
                        genderChecked = element.matches('checked');
                        errorMessage = validateRules[i](genderChecked ? genderChecked.value : '');
                        break;
                    default:
                        errorMessage = validateRules[i](element.value);

            }

            if(errorMessage) {
                break;
            }
            }

            changeStatus(element, errorMessage);

            return !errorMessage;
            
        }

        function handleClearError(event){
            const element = event.target;
            changeStatus(element)
        }
    }
}

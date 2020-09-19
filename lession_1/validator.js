// Tạo constructor function

function Validator(options) {
    var formElement = document.querySelector(options.form);
    // Lấy các rule cho vào selectorRules
    var selectorRules = {};

    
    
    if (formElement) {


        
        //  Ngăn submit form
        formElement.onsubmit = function(event) {
            event.preventDefault();
            var isFormValid = true;
            options.rules.forEach(function (rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);       
                if (!isValid) {
                    isFormValid = false;
                }
                

            });

            if (isFormValid) {
                console.log('khong co loi')
            } else {console.log('co loi')}
            
        }

        // Lặp qua mỗi rule và sử lý (sử dụng onblur, oninput)
        options.rules.forEach(function (rule){

            // Lưu lại các Rule mỗi lần input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {selectorRules[rule.selector] = [rule.test]}



          var inputElement = formElement.querySelector(rule.selector);
          // Blur khỏi input          
          inputElement.onblur = function () {
            validate(inputElement, rule);
          }
          // khi người dùng nhập value
          inputElement.oninput = function () {
            var errorElement = inputElement.parentElement.querySelector(options.errorElement);
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');

          }
        })
    }
    // Tạo function validate truyền và input và rule để xử lý 
    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = inputElement.parentElement.querySelector(options.errorElement);

        var rules = selectorRules[rule.selector];

        // Sử dụng vòng lặp để lặp ra các rule trong Array, khi gặp errorMessage thì lập tức break
        for (var i =0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.textContent = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.textContent = '';
            inputElement.parentElement.classList.remove('invalid');                  
        }
        return !errorMessage;
    }
    
};



Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    }
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
           return emailRegex.test(value) ? undefined : message ||'Trường này phải là email';            
        }
    }
};

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min  ? undefined : message||`Password phải dài hơn ${min} ký tự`;
        }
    }
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message||'Giá trị nhập vào không chính xác';
        }
    }
};
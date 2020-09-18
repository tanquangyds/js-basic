
//Constructor function
function Validator(options) {
    // Thực hiện Validate
    function validate (inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector('.form-message');
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }
    // Lấy element của form cần Validate
    var formElement = document.querySelector(options.form);

    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {

                // Trừờng hợp blur ra khỏi thẻ input
                inputElement.onblur = function () {
                    // Value = inputElement.value
                    // test function = rule.test
                    validate(inputElement, rule);
                    
                }

                // Trừờng hợp blur ra khỏi thẻ input

                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector('.form-message');
                    

                }
        })
    }
}


// Rule definition
// 1. Khi có lỗi trả ra message lỗi
// 2/ Khi không có lỗi trả về undefined 

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        },
    } ;
};

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        },
    } ;
};

// console.log(typeof Validator.isRequired);
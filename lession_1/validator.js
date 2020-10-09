// Tạo constructor function

function Validator(options) {
    var formElement = document.querySelector(options.form);
    // Lấy các rule cho vào selectorRules
    var selectorRules = {};
    
    function getParentElement (element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            } else {element = element.parentElement}


        }
    }
    
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

                // Submit với JS
                if (typeof options.onSubmit === "function") {

                    var enabledInputs = formElement.querySelectorAll('[name]:not([disabled])');

                    var formValues = Array.from(enabledInputs).reduce(function(values, input) {
                        values[input.name] = input.value;
                        return values;
                    }, {})

                    options.onSubmit(formValues);
                }
                // Submit với hành vi mặt định
                else { 
                    formElement.submit();
                }
            }
            
        }

        // Lặp qua mỗi rule và sử lý (sử dụng onblur, oninput)
        options.rules.forEach(function (rule){

            // Lưu lại các Rule mỗi lần input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {selectorRules[rule.selector] = [rule.test]}



          var inputElements = formElement.querySelectorAll(rule.selector);
            
          Array.from(inputElements).forEach(function(inputElement) {

            // Blur khỏi input          
            inputElement.onblur = function () {
                validate(inputElement, rule);
            }
            // khi người dùng nhập value
            inputElement.oninput = function () {
                var errorElement = getParentElement(inputElement, options.formGroupSelector).querySelector(options.errorElement);
                errorElement.innerText = '';
                getParentElement(inputElement, options.formGroupSelector).classList.remove('invalid');

            }
          });

          
        })
    }
    // Tạo function validate truyền và input và rule để xử lý 
    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = getParentElement(inputElement, options.formGroupSelector).querySelector(options.errorElement);

        var rules = selectorRules[rule.selector];

        // Sử dụng vòng lặp để lặp ra các rule trong Array, khi gặp errorMessage thì lập tức break
        for (var i =0; i < rules.length; ++i) {

            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':                
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            };
            
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.textContent = errorMessage;
            getParentElement(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.textContent = '';
            getParentElement(inputElement, options.formGroupSelector).classList.remove('invalid');                  
        }
        return !errorMessage;
    }
    
};



Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này';
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
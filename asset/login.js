function Validator(options) {
    var formElement = document.querySelector(options.form);
    //================================================
    function remove_invalid(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorMessage);

        errorElement.innerHTML = '';
        inputElement.parentElement.classList.remove('invalid');
    }
    //================================================
    function Validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorMessage);

        if (errorMessage) {
            errorElement.innerHTML = errorMessage;
            inputElement.parentElement.classList.add('invalid');
            // console.log(errorMessage);
        } else {
            remove_invalid(inputElement, rule);
        }
    }

    if (formElement) {
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var errorElement = inputElement.parentElement.querySelector(options.errorMessage);
            var errorMessage = rule.test(inputElement.value);


            if (inputElement) { //nếu tồn tại cái input element
                // Xử lý khi blur ra ngoài
                inputElement.onblur = function() {
                    Validate(inputElement, rule);
                }

                //Xử lý khi người dùng nhập lại input
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorMessage);
                    remove_invalid(inputElement, rule);
                };
            }
        });

    }
};

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : 'Bạn cần nhập thông tin';
        }
    }
};

Validator.isMinLength = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value >= 6 ? undefined : 'Bạn cần nhập đủ 6 ký tự trở lên';
        }
    }
};
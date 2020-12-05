var registerForm;
window.onload = function(){
    registerForm = new RegisterForm();
    registerForm.resetForm();

    $("register").onclick = function(){
        if ( registerForm.validateForm() ){
            $("register_Form").submit();
            navigate.showResults();
        }
    };

    $("reset").onclick = function(){
        registerForm.resetForm();
    };
    $("back") = function(){
        navigate.showForm();
        registerForm.resetForm();
    };
    
};
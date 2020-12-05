$(document).ready(function () {
    let Arr = [];
    $('.saveBtn').click(function () {
        $('.alPhone').html('');
        $('.alAge').html('');
        $('.alSalary').html('');
        $('.alEmail').html('');
        $('.alName').html('');
        $('.alRole').html('');
      
        let valid = true;
        let name = $('#Name').val();
        if (name == '') { $('.alName').html('<h4 style="color:red">THIS FIELD IS REQUIRED'); valid = false; }
        let email = $('#email').val();
        if (email == '') { $('.alEmail').html('<h4 style="color:red">THIS FIELD IS REQUIRED'); valid = false }
        let phone = $('#phone').val();
        if (phone == '') { $('.alPhone').html('<h4 style="color:red">THIS FIELD IS REQUIRED'); valid = false }
        let age = parseInt($('#age').val());
        if (isNaN(age)) { $('.alAge').html('<h4 style="color:red">THIS FIELD IS REQUIRED AND MUST BE A NUMBER'); valid = false }
        let role = $('#role').val();
        if (role == '') { $('.alRole').html('<h4 style="color:red">THIS FIELD IS REQUIRED'); valid = false }
        let salary = parseInt($('#salary').val());
        if (isNaN(salary)) { $('.alSalary').html('<h4 style="color:red">THIS FIELD IS REQUIRED AND MUST BE A NUMBER'); valid = false }
        let income = 0;
        
        if (!isValidEmail()) {$('.alEmail').html('<h4 style="color:red">NOT RIGHT</h4>'); valid = false }
        if (!isValidPhone()) { $('.alPhone').html('<h4 style="color:red">NOT RIGHT FORMAT</h4>') ; valid = false};
        if (age < 0 || age > 150) { $('.alAge').html('<h4 style="color:red">NOT TRUE</h4>'); valid = false };
        if (salary < 0 || salary > 1000000) { $('.alSalary').html('<h4 style="color:red">INSANE</h4>'); valid = false };
        if (role == 'FE') { salary = 1000; income = salary * 12 + salary * 12 * 20 / 100 };
        if (role == 'BE') { salary = 1100; income = salary * 12 + salary * 12 * 10 / 100 };
        if (role == 'QA') { salary = 1200; income = salary * 12 + salary * 12 * 15 / 100 };
        if (role == 'PM') { salary = 2000; income = salary * 12 + salary * 12 * 12 / 100 };

        if (valid) {
            let student = {
                name: name,
                email: email,
                phone: phone,
                age: age,
                role: role,
                salary: salary,
                income:income
            }
            Arr.push(student);
            let data = JSON.stringify(Arr);
            localStorage['data'] = JSON.stringify(Arr);
            // alert('ADD SUCCESSFULLY');
            $('#Name').val('');
            $('#email').val('');
            $('#phone').val('');
            $('#age').val('');
            $('#role').val('');
            $('#salary').val('');
            Swal.fire({
                icon: 'success',
                title: 'Add new student success',
                showConfirmButton: false,
                timer: 1500
              })
        }

        function isValidEmail() {
            let email = $('#email').val();
            let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!reg.test(email)) { return false }
            return true;
        }
    
        function isValidPhone() {
            let phone = $('#phone').val();
            let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            if (!reg.test(phone)) { return false }
            return true;
        }
    })

    $('.showBtn').click(function () {
        $('.show').html('');
        Arr.forEach(function (item,index) {
            $('.show').append(`<h3>STUDENT ${index + 1}<h3>`);
            $('.show').append(`<h4>Name: ${item.name}</h4>`);
            $('.show').append(`<h4>Email: ${item.email}</h4>`);
            $('.show').append(`<h4>Age: ${item.age}</h4>`);
            $('.show').append(`<h4>Role: ${item.role}</h4>`);
            $('.show').append(`<h4>Salary: ${item.salary}</h4>`);
            $('.show').append(`<h4>Income: ${item.income}</h4>`);
        })
    })
})
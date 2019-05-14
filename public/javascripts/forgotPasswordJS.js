/**
 * all function here are used for components in forgotPassword page.
 */

$(document).ready(function() {

    /**
     * check the answer of the security question and then reset password.
     */
    $('#resetPassword').on('submit', function(event) {
        alert('resetPassword');
        event.preventDefault();

        var d={};

        var wholeForm = $('#resetPassword').serializeArray();

        $.each(wholeForm, function() {
            d[this.name] = this.value;
        });

        d['operation'] = 'resetPwd';

        alert("data:"+JSON.stringify(d));

        $.ajax({
            type: 'POST',
            url: '/forgotPassword',
            data: d,
            success: function(data) {
                alert('ajax success.');
                if(data.result === 0){
                    alert('Sorry, cannot reset password now.')
                } else if(data.result === 1){
                    window.location.href='/';
                }
            }
        });
        return false;
    });


});

/**
 * show notification when the two passwords entered by consumers are not consistent in password reset webpage.
 * @returns {boolean}
 */
var passwordCheck = function () {
    var check = false;
    if (document.getElementById('resetPassword').value ==
        document.getElementById('resetRepeatPassword').value) {
        // alert('same password.');
        $('#passwordCheck').hide();
        check = true;
    } else {
        // alert('different password.');
        $('#passwordCheck').show();
        check = false;
    }
    return check;
}

/**
 * called by "reset" button, if all check progress passed, "reset"  button will work
 * @returns {boolean}
 */
function checkAll() {
    alert('checkAll function');
    // var check = passwordCheck() && checkpwd() && checkpwdc() && checkcb();
    var check = passwordCheck();
    return check;

}



function checkEmail() {
    var email = $('#email').val();

    $.ajax({
        type: 'POST',
        url: '/forgotPassword',
        data: {'operation':'checkEmail','email':email},
        success: function(data) {

            if(data.result === 0){
                alert('cannot reset password now.')
            } else if(data.result === 1){ // valid existing email

                if(data.securityQuestion == 1){
                    $('#secretQuestion').val("What primary school did you attend?");
                    // $("#secretAnswer").attr("disabled","disabled");
                } else if(data.securityQuestion == 2){
                    $('#secretQuestion').val("In what town or city was your first job?");
                } else if(data.securityQuestion == 3){
                    $('#secretQuestion').val("What is your mother's maiden name?");
                }

                $('#secretQuestionDiv').show();
                $('#resetPasswordDiv').show();
                $('#reset').show();
                $('#next').hide();

            } else if(data.result === 2){ // this email have not been registered before.
                alert('invalid email.');
                $('#emailExistingCheck').show();
            }
        }
    });
}


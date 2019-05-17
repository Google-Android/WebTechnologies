/**
 * all function here are used for components in header page.
 */
$(document).ready(function () {

    /**
     * get data from login form and validate the username and password.
     */
    $('#login').on('submit', function (event) {
        event.preventDefault();

        var loginInfo = {};
        loginInfo['loginEmail'] = $('#loginEmail1').val();
        loginInfo['loginPassword'] = $('#loginPassword').val();

        // alert("loginInfo: "+JSON.stringify(loginInfo));

        $.ajax({
            type: 'POST',
            url: '/login',
            data: loginInfo,
            success: function (data) {
                if (data.errInfo == 0) {
                    alert('账户不存在');
                    $('#accountDoesNotExist').show();
                } else if (data.errInfo == 1) {
                    alert('用户名密码不对');
                    $('#invalidUsernamePasswordNotification').show();
                } else {
                    window.location.reload();
                }
            }
        });
        return false;
    });


    /**
     * register for a new consumer user
     * validate the username and password; if not existed yet, add the new user.
     */
    $('#consumerRegister').on('submit', function (event) {
        // alert('get register data done.');
        event.preventDefault();

        var d = {};

        var wholeForm = $('#consumerRegister').serializeArray();

        $.each(wholeForm, function () {
            d[this.name] = this.value;
        });

        // alert(JSON.stringify(d));

        $.ajax({
            type: 'POST',
            url: '/register',
            data: d,
            success: function (data) {
                if (data.result === 0) {
                    $('#duplicateConsumerEmailNotification').show();
                } else if (data.result === 1) {
                    window.location.href = '/';
                } else if (data.result === 2) {
                    alert("Sorry, cannot create a new account now.");
                }
            }
        });
        return false;
    });


    /**
     * register for a new company user
     * validate the username and password; if not existed yet, add the new user.
     */
    $('#companyRegister').on('submit', function (event) {
        // alert('get company register data done.');
        event.preventDefault();

        var d = {};

        var wholeForm = $('#companyRegister').serializeArray();

        $.each(wholeForm, function () {
            d[this.name] = this.value;
        });

        // alert(JSON.stringify(d));

        $.ajax({
            type: 'POST',
            url: '/register',
            data: d,
            success: function (data) {
                if (data.result === 0) {
                    $('#duplicateCompanyEmailNotification').show();
                } else if (data.result === 1) {
                    window.location.href = '/';
                } else if (data.result === 2) {
                    alert("Sorry, cannot create a new account now.");
                }
            }
        });
        return false;
    });


});

/**
 * show notification when the two passwords entered by consumers are not consistent when register
 * @returns {boolean}
 */
var consumerPasswordConfirmation = function() {
    var consumerCheck = false;
    if (document.getElementById('consumerPassword').value ==
        document.getElementById('consumerRepeatPassword').value) {
        $('#consumerPasswordNotMatching').hide();
        consumerCheck = true;
    } else {
        $('#consumerPasswordNotMatching').show();
        consumerCheck = false;
    }
    return consumerCheck;
}

/**
 * show notification when the two passwords entered by companies are not consistent when register
 * @returns {boolean}
 */
var companyPasswordConfirmation = function() {
    var companyCheck = false;
    if (document.getElementById('companyPassword').value ==
        document.getElementById('companyRepeatPassword').value) {
        $('#companyPasswordNotMatching').hide();
        companyCheck = true;
    } else {
        $('#companyPasswordNotMatching').show();
        companyCheck = false;
    }
    return companyCheck;
}




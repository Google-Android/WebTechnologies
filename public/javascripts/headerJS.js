/**
 * all function here are used for components in header page.
 */
$(document).ready(function() {

    /**
     * get data from login form and validate the username and password.
     */
    $('#login').on('submit', function(event) {
        event.preventDefault();

        var loginInfo={};
        loginInfo['loginEmail'] = $('#loginEmail1').val();
        loginInfo['loginPassword'] = $('#loginPassword').val();

        // alert("loginInfo: "+JSON.stringify(loginInfo));

        $.ajax({
            type: 'POST',
            url: '/login',
            data: loginInfo,
            success: function(data) {
                // alert('ajax successfully.')
                // alert("error:"+data.errInfo);
                //do something with the data via front-end framework
                if(data.errInfo==1){
                    $('#errorNotification').show();
                } else {
                    // window.location.reload();
                    // window.location.href='/';
                    $('#loginRegister').modal('hide');

                }
            }
        });
        return false;
    });


    /**
     * register for a new customer user
     * validate the username and password; if not existed yet, add the new user. 
     */
    $('#consumerRegister').on('submit', function(event) {
        // alert('get register data done.');
        event.preventDefault();

        var d={};

        // [{name: "a1", value: "xx"},{name: "a2", value: "xx"}],
        var wholeForm = $('#consumerRegister').serializeArray();

        $.each(wholeForm, function() {
            d[this.name] = this.value;
        });

        // alert(JSON.stringify(d));

        $.ajax({
            type: 'POST',
            url: '/register',
            data: d,
            success: function(data) {
                if(data.result===0){
                    alert("Unfortunately, the email address you've entered already exists. ");
                } else if(data.result === 1){
                    window.location.href='/';
                } else if(data.result === 2){
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
    $('#companyRegister').on('submit', function(event) {
        // alert('get company register data done.');
        event.preventDefault();

        var d={};

        // [{name: "a1", value: "xx"},{name: "a2", value: "xx"}],
        var wholeForm = $('#companyRegister').serializeArray();

        $.each(wholeForm, function() {
            d[this.name] = this.value;
        });

        // alert(JSON.stringify(d));

        $.ajax({
            type: 'POST',
            url: '/register',
            data: d,
            success: function(data) {
                if(data.result===0){
                    alert("Unfortunately, the email address you've entered already exists. ");
                } else if(data.result === 1){
                    window.location.href='/';
                } else if(data.result === 2){
                    alert("Sorry, cannot create a new account now.");
                }
            }
        });
        return false;
    });



});
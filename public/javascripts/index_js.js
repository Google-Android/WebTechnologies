$(document).ready(function() {

    $('#login').on('submit', function(event) {

        alert('get form data done.');

        event.preventDefault();

        var loginInfo={};

        // [{name: "loginEmail1"", value: "xxx"},{name: "loginPassword", value: "xxx"}]

        loginInfo['loginEmail'] = $('#loginEmail1').val();
        loginInfo['loginPassword'] = $('#loginPassword').val();

        // var wholeForm = $('#login').serializeArray();
        
        // $.each(wholeForm, function() {
        //     d[this.name] = this.value;
        //   });

        alert("loginInfo: "+JSON.stringify(loginInfo));

        $.ajax({
            type: 'POST',
            url: '/login',
            data: loginInfo,
            success: function(data) {
                alert('ajax successfully.')
                alert("error:"+data.errInfo);
                //do something with the data via front-end framework
                if(data.errInfo==1){
                    //顺葆：在这里让index.ejs里隐藏的用户名密码错误提示显示出来。。。
                    $('#invalidUserMessage').show();
                    $('#invalidUserMessage').toggle();
                } else {
                    location.reload();
                }
            }
        });
        return false;
    });

    

    // $('#login').on('submit', function(event) {

    //     alert('get form data done.');

    //     event.preventDefault();

    //     var loginInfo={};

    //     // [{name: "loginEmail1"", value: "xxx"},{name: "loginPassword", value: "xxx"}]

    //     loginInfo['loginEmail'] = $('#loginEmail1').val();
    //     loginInfo['loginPassword'] = $('#loginPassword').val();

    //     // var wholeForm = $('#login').serializeArray();
        
    //     // $.each(wholeForm, function() {
    //     //     d[this.name] = this.value;
    //     //   });

    //     alert("loginInfo: "+JSON.stringify(loginInfo));

    //     $.ajax({
    //         type: 'POST',
    //         url: '/login',
    //         data: loginInfo,
    //         success: function(data) {
    //             alert('ajax successfully.')
    //             alert("error:"+data.errInfo);
    //             //do something with the data via front-end framework
    //             if(data.errInfo==1){
    //                 //顺葆：在这里让index.ejs里隐藏的用户名密码错误提示显示出来。。。
    //                 $('#invalidUserMessage').show();
    //                 $('#invalidUserMessage').toggle();
    //             } else {
    //                 location.reload();
    //             }
    //         }
    //     });
    //     return false;
    // });

});
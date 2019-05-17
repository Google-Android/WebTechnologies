/**
 * all function here are used for components in consumerUserDetails page.
 */
$(document).ready(function() {

    /**
     * get the cv information of the user and send cv to the company
     */
    $('#consumerCvManagement').on('submit', function(event) {
        // alert('consumerCvManagement');
        event.preventDefault();

        var d={};

        // [{name: "a1", value: "xx"},{name: "a2", value: "xx"}],
        var wholeForm = $('#consumerCvManagement').serializeArray();

        $.each(wholeForm, function() {
            d[this.name] = this.value;
        });

        d['operation'] = 'updateCv';
        // alert("data:"+JSON.stringify(d));

        $.ajax({
            type: 'POST',
            url: '/consumerUserDetails',
            data: d,
            success: function(data) {
                // alert('ajax success.');
                if(data.result === 0){
                    alert('can not change cv now.');
                } else if(data.result === 1){
                    window.location.reload();
                }
            }
        });
        return false;
    });

});


/**
 * show notification when the two passwords entered by consumers are not consistent in account management.
 */
var companyManagementPasswordConfirmation = function() {
    var check;
    if (document.getElementById('companyManagementPassword').value ==
        document.getElementById('companyManagementRepeatPassword').value) {
        $('#companyManagementPasswordNotMatching').hide();
        check = true;
    } else {
        $('#companyManagementPasswordNotMatching').show();
        check = false;
    }
    return check;
}
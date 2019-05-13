/**
 * show notification when the two passwords entered by consumers are not consistent in account management.
 */
var consumerManagementPasswordConfirmation = function () {
    var check = false;
    if (document.getElementById('consumerManagementPassword').value ==
        document.getElementById('consumerManagementRepeatPassword').value) {
        $('#consumerManagementPasswordNotMatching').hide();
        check = true;
    } else {
        $('#consumerManagementPasswordNotMatching').show();
        check = false;
    }
    return check;
}


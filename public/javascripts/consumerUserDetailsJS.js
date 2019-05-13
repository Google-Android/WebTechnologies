/**
 * show notification when the two passwords entered by consumers are not consistent in account management.
 */
var consumerManagementPasswordConfirmation = function() {
    if (document.getElementById('consumerManagementPassword').value ==
        document.getElementById('consumerManagementRepeatPassword').value) {
        $('#consumerManagementPasswordNotMatching').hide();

    } else {
        $('#consumerManagementPasswordNotMatching').show();

    }
}
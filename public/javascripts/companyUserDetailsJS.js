/**
 * show notification when the two passwords entered by consumers are not consistent in account management.
 */
var companyManagementPasswordConfirmation = function() {
    if (document.getElementById('companyManagementPassword').value ==
        document.getElementById('companyManagementRepeatPassword').value) {
        $('#companyManagementPasswordNotMatching').hide();

    } else {
        $('#companyManagementPasswordNotMatching').show();

    }
}
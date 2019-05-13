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
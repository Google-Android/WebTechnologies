/**
 * all function here are used for components in index page.
 */
$(document).ready(function() {

     /**
     * add a review of one specific company
     * validate the username and password; if not existed yet, add the new user. 
     */
    $('#companyReview').on('submit', function(event) {
        alert('get companyReview data done.');
        event.preventDefault();

        var d={};

        // [{name: "a1", value: "xx"},{name: "a2", value: "xx"}],
        var wholeForm = $('#companyReview').serializeArray();

        $.each(wholeForm, function() {
            d[this.name] = this.value;
        });

        alert("image:"+ $('#reviewImage').val());
        alert(JSON.stringify(d));

        $.ajax({
            type: 'POST',
            url: '/companyDetails',
            data: d,
            success: function(data) {
                if(data.result===0){
                    alert("Please login first.");
                } else if(data.result === 1){
                    window.location.reload();
                } else if(data.result === 2){
                    alert("Sorry, cannot create a new account now.");
                }
            }
        });
        return false;
    });



});
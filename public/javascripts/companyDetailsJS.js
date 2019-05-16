/**
 * all function here are used for components in company detail page.
 */
$(document).ready(function() {

    // the initial value of crontabStatus is zero.
    // when crontabStatus equals one, it means the crontab need to be run.
    // when crontabStatus equals two, it means the crontab need to be stopped.
    // var crontabStatus = 0;

    /**
     * add a review of one specific company
     * validate the username and password; if not existed yet, add the new user.
     */
    $('#companyReview').on('submit', function(event) {
        crontab();
    });



    function crontab(){
        alert('get companyReview data done.');
        event.preventDefault();

        var companyName = $('#companyName').val();
        var reviewTitle = $('#reviewTitle').val();
        var reviewRating = $('#reviewRating').val();
        var reviewComment = $('#reviewComment').val();
        var reviewImage = document.getElementById("reviewImage");

        alert('companyName:'+companyName+",reviewTitle:"+reviewTitle+",reviewRating:"+reviewRating+",reviewComment:"+reviewComment)

        var d = new FormData();
        d.append('companyName',companyName);
        d.append('reviewTitle',reviewTitle);
        d.append('reviewRating',reviewRating);
        d.append('reviewComment',reviewComment);
        d.append('reviewImage',reviewImage.files[0]);

        $.ajax({
            type: 'POST',
            url: '/companyDetails',
            data: d,
            timeout:12000,
            contentType: false,
            processData: false,
            success: function(data) {
                alert('ajax successfully.');
                if(data.result === 1){
                    window.location.reload();
                } else if(data.result === 2){
                    alert("Sorry, cannot add a new review now.");
                }
            },
            error: function(){ 
                alert('Error loading document');
                crontab();
            }
        });
        return false;
    }


});
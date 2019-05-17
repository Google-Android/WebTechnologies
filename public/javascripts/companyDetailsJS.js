/**
 * all function here are used for components in companyDetails page.
 */
$(document).ready(function() {

    /**
     * add a review of one specific company
     * validate the username and password; if not existed yet, add the new user.
     */
    $('#companyReview').on('submit', function(event) {
        crontab();
    });


    /**
     * if the method has not been implemented successfully, it would be called again.
     * @return {boolean}
     */
    function crontab(){
        // alert('get companyReview data done.');
        event.preventDefault();

        var companyName = $('#companyName').val();
        var reviewTitle = $('#reviewTitle').val();
        var reviewRating = $('#reviewRating').val();
        var reviewComment = $('#reviewComment').val();
        var reviewImage = document.getElementById("reviewImage");

        // alert(companyName+","+reviewTitle+","+reviewRating+","+reviewComment);

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
                // alert('ajax successfully.');
                if(data.result === 1){
                    window.location.reload();
                } else if(data.result === 2){
                    alert("Sorry, cannot add a new review now.");
                }
            },
            error: function(){ 
                crontab();
            }
        });
        return false;
    }


});
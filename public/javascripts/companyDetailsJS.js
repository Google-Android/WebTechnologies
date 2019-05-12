/**
 * all function here are used for components in company detail page.
 */
$(document).ready(function() {

     /**
     * add a review of one specific company
     * validate the username and password; if not existed yet, add the new user. 
     */
    $('#companyReview').on('submit', function(event) {
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
            contentType: false,
            processData: false,
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
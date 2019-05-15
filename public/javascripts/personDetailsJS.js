/**
 * all function here are used for components in person detail page.
 */
$(document).ready(function() {

    /**
     * add a review of one specific company
     * validate the username and password; if not existed yet, add the new user.
     */
    $('#personReview').on('submit', function(event) {
        alert('get personReview data done.');
        event.preventDefault();

        var ownerName = $('#ownerName').val();
        var reviewTitle = $('#reviewTitle').val();
        var reviewRating = $('#reviewRating').val();
        var reviewComment = $('#reviewComment').val();
        var reviewImage = document.getElementById("reviewImage");

        alert('ownerName:'+ownerName+",reviewTitle:"+reviewTitle+",reviewRating:"+reviewRating+",reviewComment:"+reviewComment)

        var d = new FormData();
        d.append('ownerName',ownerName);
        d.append('reviewTitle',reviewTitle);
        d.append('reviewRating',reviewRating);
        d.append('reviewComment',reviewComment);
        d.append('reviewImage',reviewImage.files[0]);

        $.ajax({
            type: 'POST',
            url: '/personDetails',
            data: d,
            contentType: false,
            processData: false,
            success: function(data) {
                alert('ajax successfully.');
                if(data.result === 1){
                    window.location.reload();
                } else if(data.result === 2){
                    alert("Sorry, cannot add a new review now.");
                }
            }
        });
        return false;
    });
});
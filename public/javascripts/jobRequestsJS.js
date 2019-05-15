/**
 * all function here are used for components in jobRequests page.
 */
$(document).ready(function() {


    /**
     * store information about the job request and turn to cv page.
     */
    $('#jobRequest').on('submit', function(event) {
        alert('jobRequest');
        event.preventDefault();

        var achievement = $('#achievement').val();
        var education = $('#education').val();
        var workExperience = $('#workExperience').val();
        var requestJobTitle = $('#requestJobTitle').val();
        var requestJobType = $('select#requestJobType option:selected').val();
        var requestJobIndustry = $('select#requestJobIndustry option:selected').val();
        var salary = $('#salary').val();
        var route = $('#route').val();
        var requestProfilePhoto = document.getElementById("requestProfilePhoto");
        var postal_town = $('#postal_town').val();
        var administrative_area_level_1 = $('#administrative_area_level_1').val();
        var postal_code = $('#postal_code').val();
        var country = $('#country').val();

        var d = new FormData();

        d.append('achievement',achievement);
        d.append('education',education);
        d.append('workExperience',workExperience);
        d.append('requestJobTitle',requestJobTitle);
        d.append('requestJobType',requestJobType);
        d.append('requestJobIndustry',requestJobIndustry);
        d.append('salary',salary);
        d.append('route',route);
        d.append('requestProfilePhoto',requestProfilePhoto.files[0]);
        d.append('postal_town',postal_town);
        d.append('administrative_area_level_1',administrative_area_level_1);
        d.append('postal_code',postal_code);
        d.append('country',country);

        alert("data:"+JSON.stringify(d));
        
        $.ajax({
            //no need to change to get method.
            type: 'POST',
            url: '/jobRequests',
            data: d,
            contentType: false,
            processData: false,
            success: function(data) {
                alert('ajax success.');
                if(data.result === 1){
                    alert('insert or update cv successfully.')
                    window.location.href='/cvDetails?operation=showMyCv&cvId='+data.cvId;
                } else if(data.result === 2){
                    alert('Sorry, cannot insert or update cv now.');
                }
            }
        });
        return false;
    });



    //Show the name of the file appear on select
    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });



});
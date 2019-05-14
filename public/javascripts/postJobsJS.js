/**
 * all function here are used for components in post job page.
 */
$(document).ready(function () {

    /**
     * post a new job
     */
    $('#postJob').on('submit', function (event) {

        alert('get postJob data done.');

        event.preventDefault();

        var companyName = $('#companyName').val();
        var companyEmail = $('#companyEmail').val();
        var title = $('#title').val();
        var requestJobType = $('select#requestJobType option:selected').val();
        var requestJobIndustry = $('select#requestJobIndustry option:selected').val();
        var salary = $('#salary').val();
        var description = $('#description').val();
        var jobImage = document.getElementById("jobImage");
        var route = $('#route').val();
        var postal_town = $('#postal_town').val();
        var administrative_area_level_1 = $('#administrative_area_level_1').val();
        var postal_code = $('#postal_code').val();
        var country = $('#country').val();

        var d = new FormData();

        d.append('companyName',companyName);
        d.append('companyEmail',companyEmail);
        d.append('title',title);
        d.append('requestJobType',requestJobType);
        d.append('requestJobIndustry',requestJobIndustry);
        d.append('salary',salary);
        d.append('description',description);
        d.append('JobImage',jobImage.files[0]);
        d.append('route',route);
        d.append('postal_town',postal_town);
        d.append('administrative_area_level_1',administrative_area_level_1);
        d.append('postal_code',postal_code);
        d.append('country',country);

        alert('ajax begin.....');
        $.ajax({
            type: 'POST',
            url: '/postJobs',
            data: d,
            contentType: false,
            processData: false,
            success: function(data) {
                if(data.result === 1){
                    var jobId = data.jobId;
                    window.location.href='/jobDetails?jobId='+jobId;
                } else if(data.result === 2){
                    alert('cannot post job now.');
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



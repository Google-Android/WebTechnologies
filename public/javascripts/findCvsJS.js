/**
 * all function here are used for components in findCvs page.
 */
$(document).ready(function() {

    /**
     * The first searching
     * find cvs according to the condition, including keyword and location.
     */
    $('#findCvs').on('submit', function(event) {
        alert('findCvs');
        event.preventDefault();

        var d={};
        
        var wholeForm = $('#findCvs').serializeArray();

        $.each(wholeForm, function() {
            d[this.name] = this.value;
        });
        
        alert("data:"+JSON.stringify(d));
        
        $.ajax({
            type: 'POST',
            url: '/findCvs',
            data: d,
            success: function(data) {
                alert('ajax success.');
                window.location.href=data.url;



                // $('#cvSearching').attr("style","display:none;");//hide the div
                // $('#cvSearchingResults').attr("style","display:block;");//display the div

                // $('#secondCvKeyword').val(data.firstKeyword);
                // $('#secondCvLocation').val(data.firstLocation);

                // var html = '';
                // if(data.result == 1){// find cvs
                //     data.cvs.forEach(function(cv){
                //         html += '<div class="card mb-2">';
                //         html += '<h5 class="card-header"><a href="/cvDetails?operation=showOthersCv&cvId='+cv._id+'">'+cv.title+'</a></h5>';
                //         html += '<div class="card-body">';
                //         html += '<p class="font-weight-lighter font-italic">'+cv.city+'</p>';
                //         html += '<hr>';
                //         html += '<p class="card-text d-none d-lg-block">'+cv.jobType+'</p>';
                //         html += '<p class="card-text">$'+cv.salary+'/month</p>';
                //         html += '</div>';
                //         html += '</div>';
                //     });
                //     $('#jobSeekerResults').html(html);
                // } else if(data.result == 2){// cannot find cv
                //     html += '<div class="jumbotron jumbotron-fluid">';
                //     html += '<div class="container text-center">';
                //     html += '<h1 class="display-4">No Related Result! </h1>';
                //     html += '</div>';
                //     html += '</div>';
                //     $('#jobSeekerResults').html(html);                    
                // }
            }
        });
        return false;
    });


    /**
     * The second searching
     * find cvs according to the condition, e.g. keyword, location, salary and job types.
     */
    $('#cvSecondarySearch').on('submit', function(event) {
        alert('cvSecondarySearch');
        event.preventDefault();

        var d={};
        
        var wholeForm = $('#cvSecondarySearch').serializeArray();

        $.each(wholeForm, function() {
            d[this.name] = this.value;
        });

        d['operation'] = 'secondSearch';
        
        alert("data:"+JSON.stringify(d));
        
        $.ajax({
            type: 'POST',
            url: '/findCvs',
            data: d,
            success: function(data) {
                alert('ajax success.');
    
                var html = '';
                if(data.result == 1){// find cvs
                    data.cvs.forEach(function(cv){
                        html += '<div class="card mb-2">';
                        html += '<h5 class="card-header"><a href="/cvDetails?operation=showOthersCv&cvId='+cv._id+'">'+cv.title+'</a></h5>';
                        html += '<div class="card-body">';
                        html += '<p class="font-weight-lighter font-italic">'+cv.city+'</p>';
                        html += '<hr>';
                        html += '<p class="card-text d-none d-lg-block">'+cv.jobType+'</p>';
                        html += '<p class="card-text">$'+cv.salary+'/month</p>';
                        html += '</div>';
                        html += '</div>';
                    });
                    $('#jobSeekerResults').html(html);
                } else if(data.result == 2){// cannot find cv
                    html += '<div class="jumbotron jumbotron-fluid">';
                    html += '<div class="container text-center">';
                    html += '<h1 class="display-4">No Related Result! </h1>';
                    html += '</div>';
                    html += '</div>';
                    $('#jobSeekerResults').html(html);                    
                }
            }
        });
        return false;
    });


});
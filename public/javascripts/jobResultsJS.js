/**
 * all function here are used for components in job results page.
 */
$(document).ready(function() {


    /**
     *
     */
    $('#secondarySearch').on('submit', function(event) {
        // alert('get secondarySearch data done.');
        event.preventDefault();

        var d={};

        // // [{name: "a1", value: "xx"},{name: "a2", value: "xx"}],
        // var wholeForm = $('#secondarySearch').serializeArray();
        //
        // $.each(wholeForm, function() {
        //     d[this.name] = this.value;
        // });

        var keyword = $("input[name='keyword']").val();
        var location = $("input[name='location']").val();
        var salary = $("input[name='salary']:checked").val();
        var industry = $("input[name='industry']:checked").val();
        var jobType = $("input[name='jobType']:checked").val();

        alert('keyword:'+keyword+',location:'+location+',salary:'+salary+",industry:"+industry+",jobType:"+jobType);


        d['searchType']='2';

        alert(JSON.stringify(d));

        $.ajax({
            type: 'GET',
            url: '/jobResults?keyword='+keyword+'&location='+location+'&salary='+salary+'&industry='+industry+'&jobType='+jobType,
            // url: '/jobResults',
            data: d,
            success: function(data) {
                var html = '';
                if(data.result===0){
                    alert("Sorry, cannot search for jobs now.");
                } else if(data.result === 1){
                    alert("find jobs:"+data.jobResults.length);
                    var jobResults = data.jobResults;

                    for(var i=0; i<jobResults.length; i++){
                        html += '<div class="card mb-2" id="jobResults">';
                        html += '<h5 class="card-header"><a href="/jobDetails?jobId='+jobResults[i]._id+'">'+jobResults[i].title+'</a></h5>';
                        html += '<div class="card-body">';
                        html += '<h5 class="card-title">';
                        html += '<a href="/companyDetails?companyName='+jobResults[i].companyName+'">'+jobResults[i].companyName+'</a>';
                        html += '</h5>';
                        html += '<p class="font-weight-lighter font-italic">'+jobResults[i].city+'</p>';
                        html += '<hr>';
                        html += '<p class="card-text d-none d-lg-block">'+jobResults[i].description+'</p>';
                        html += '<p class="card-text">'+jobResults[i].salary+'</p>';
                        html += '</div>';
                        html += '</div>';
                    }
                } else if(data.result === 2){
                    // cannot find any jobs within the condition
                    alert("cannot find jobs!");
                    html += '<div class="jumbotron jumbotron-fluid">';
                    html += '<div class="container text-center">';
                    html += '<h1 class="display-4">No Related Result! </h1>';
                    html += '</div>';
                    html += '</div>';
                }
                // do sth
                $('#searchingResultDiv').html(html);
            }
        });
        return false;
    });

    /**
     * get location when the the browser was ready
     */
    window.onload=function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    /**
     * give the position to the hidden input area for calculating the distance.
     * @param position
     */
    function getPosition(position) {
        $('#cityLat').val(position.coords.latitude);
        $('#cityLng').val(position.coords.longitude);
    }


    // var url = window.location.search;
    // alert('url:'+url);
    //
    // //url:?keyword=Amazon&location=
    // var params = url.substr(url.indexOf('?'));
    // alert('params:'+params);//?keyword=Amazon&location=
    //
    // var paramList =new Array();
    // paramList = params.split("&");
    //
    // var keyword;
    // var location;
    //
    // for (i=0;i<paramList.length ;i++ ) {
    //     if(param[i].indexOf('keyword')!=-1){
    //         keyword=param[i].substring(param[i].indexOf('='));
    //     }
    //     if(param[i].indexOf('location')!=-1){
    //         location=param[i].substring(param[i].indexOf('='));
    //     }
    // }
    //
    // alert('keyword:'+keyword);
    // alert('location:'+location);
    //
    // var params ={};
    // params['keyword']=keyword;
    // params['location']=location;
    //
    //
    // $.ajax({
    //     type: 'POST',
    //     url: '/jobResults',
    //     data: d,
    //     success: function(data) {
    //         alert('ajax success.');
    //
    //         // alert('jobResults:'+data.jobResults.length);
    //         // if(data.result === 0){
    //         //     alert('jobResults is null.')
    //         //     window.location.href='/jobResults?jobResults='+data.jobResults;
    //         // } else if(data.result === 1){
    //         //     // var jobs = eval("("+data.jobResults+")");
    //         //     // alert('jobResults:'+jobs[0].title);
    //         //     window.location.href='/jobResults?jobResults='+data.jobResults;
    //         // }
    //     }
    // });
    

})

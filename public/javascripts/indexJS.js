/**
 * all function here are used for components in index page.
 */
$(document).ready(function() {


    // /**
    //  * get the parameter of searching jobs and turn to the result page.
    //  */
    // $('#jobSearch').on('submit', function(event) {
    //     alert('jobSearch');
    //     event.preventDefault();

    //     // var keyword = $('#keyword').val();
    //     // var location = $('#location').val();

    //     // window.location.href='/jobResults?keyword='+keyword+'&location='+location;
    //     var d={};
        
    //     // [{name: "a1", value: "xx"},{name: "a2", value: "xx"}],
    //     var wholeForm = $('#jobSearch').serializeArray();
        
    //     $.each(wholeForm, function() {
    //         d[this.name] = this.value;
    //     });
        
    //     alert("data:"+JSON.stringify(d));
        
    //     $.ajax({
    //         type: 'POST',
    //         url: '/jobResults',
    //         data: d,
    //         success: function(data) {
    //             alert('ajax success.');
        
    //             alert('jobResults:'+data.jobResults.length);
    //             if(data.result === 0){
    //                 alert('jobResults is null.')
    //                 window.location.href='/jobResults?jobResults='+data.jobResults;
    //             } else if(data.result === 1){
    //                 // var jobs = eval("("+data.jobResults+")");
    //                 // alert('jobResults:'+jobs[0].title);
    //                 window.location.href='/jobResults?jobResults='+data.jobResults;
    //             }
    //         }
    //     });
    //     return false;
    // });




});
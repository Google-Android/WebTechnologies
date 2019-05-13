/**
 * all function here are used for components in jobDetails page.
 */
$(document).ready(function() {


    /**
     * get the cv information of the user and send cv to the company
     */
    $('#consumerCv').on('submit', function(event) {
        alert('consumerCv');
        event.preventDefault();

        var d={};

        // [{name: "a1", value: "xx"},{name: "a2", value: "xx"}],
        var wholeForm = $('#consumerCv').serializeArray();

        $.each(wholeForm, function() {
            d[this.name] = this.value;
        });

        alert("data:"+JSON.stringify(d));

        $.ajax({
            type: 'POST',
            url: '/jobDetails',
            data: d,
            success: function(data) {
                alert('ajax success.');

                // alert('jobResults:'+data.jobResults.length);
                // if(data.result === 0){
                //     alert('jobResults is null.')
                //     window.location.href='/jobResults?jobResults='+data.jobResults;
                // } else if(data.result === 1){
                //     // var jobs = eval("("+data.jobResults+")");
                //     // alert('jobResults:'+jobs[0].title);
                //     window.location.href='/jobResults?jobResults='+data.jobResults;
                // }
            }
        });
        return false;
    });


})
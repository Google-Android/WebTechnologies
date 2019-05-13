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
                if(data.result === 0){
                    alert('cannot send cv now.');
                    window.location.href='/jobDetails?jobId='+data.jobId;
                } else if(data.result === 1){
                    window.location.href='/jobDetails?jobId='+data.jobId;
                }
            }
        });
        return false;
    });


})
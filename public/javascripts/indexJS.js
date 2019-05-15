/**
 * all function here are used for components in index page.
 */
$(document).ready(function() {


    /**
     * get the parameter of searching jobs and turn to the result page.
     */
    $('#jobSearch').on('submit', function(event) {
        alert('jobSearch');
        event.preventDefault();

        // var keyword = $('#keyword').val();
        // var location = $('#location').val();

        var d={};
        var wholeForm = $('#jobSearch').serializeArray();
        $.each(wholeForm, function() {
            d[this.name] = this.value;
        });

        alert("data:"+JSON.stringify(d));
        
        $.ajax({
            type: 'POST',
            url: '/',
            data: d,
            success: function(data) {
                alert('ajax success.');
                alert('url:'+data.url);
                window.location.href=data.url;
            }
        });
        return false;
    });



});
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


/**
 * get location when the the browser was ready
 */
window.onload=function getLocation() {
    alert('get location....');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        alert('Please allow us to use your location.');
    }
}


/**
 * give the position to the hidden input area for calculating the distance.
 * @param position
 */
function getPosition(position) {
    $('#cityLat').val(position.coords.latitude);
    alert(position.coords.latitude+'---'+position.coords.longitude);
    $('#cityLng').val(position.coords.longitude);
}

/**
 * all function here are used for components in jobDetails page.
 */
$(document).ready(function() {


    /**
     * get the cv information of the user and send cv to the company
     */
    $('#consumerCv').on('submit', function(event) {
        // alert('consumerCv');
        event.preventDefault();

        var d={};

        // [{name: "a1", value: "xx"},{name: "a2", value: "xx"}],
        var wholeForm = $('#consumerCv').serializeArray();

        $.each(wholeForm, function() {
            d[this.name] = this.value;
        });

        // alert("data:"+JSON.stringify(d));

        $.ajax({
            type: 'POST',
            url: '/jobDetails',
            data: d,
            success: function(data) {
                // alert('ajax success.');
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

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
/**
 * map function
 * add similar job markers into the map
 */
var map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        //set university as the center of map when initialize
        center: {lat: 53.380707, lng: -1.483981999999969},
        zoom: 15
    });


    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(pos);

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });




        // alert('gonna to show similar jobs.');
        // show the similar jobs in map.
        var similarJobCount = $('#similarJobCount').val();
        // alert('similarJobCount:'+similarJobCount);

        for (var i=0;i<similarJobCount;i++) {
            // alert('i:'+(i+1));
            var jobId = $('#jobId'+(i+1)).val();
            var jobTitle = $('#jobTitle'+(i+1)).val();
            var companyName = $('#companyName'+(i+1)).val();
            var latValue = $('#lat'+(i+1)).val();
            var lngValue = $('#lng'+(i+1)).val();

            // alert('jobId:'+jobId+",jobTitle:"+jobTitle+",companyName:"+companyName+",latValue:"+latValue+",lngValue:"+lngValue);

            //set location
            var jobPositionJob = {lat: parseFloat(latValue), lng: parseFloat(lngValue)};
            //set content of pop out information panel
            var contentStringJob = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h5 id="firstHeading" class="firstHeading">' +
                '<a href="/jobDetails?jobId='+jobId+'">'+jobTitle+'</a>' +
                '</h5>'+
                '<div id="bodyContent">'+
                '<p>'+companyName+'</p>'+
                '</div>'+
                '</div>';
            //set information panel
            var infowindowJob = new google.maps.InfoWindow({
                content: contentStringJob,
                maxWidth: 200
            });
            //set marker on the map
            var markerJob = new google.maps.Marker({
                position: jobPositionJob,
                map: map,
                title: jobTitle

            });
            //set action when click
            markerJob.addListener('click', function() {
                infowindowJob.open(map, markerJob);
            });
        }


    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
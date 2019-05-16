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

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
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

        //set location
        var jobOne = {lat: 53.3830004, lng: -1.477871499999992};
        //set content of pop out information panel
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            '</div>'+
            '</div>';

        //set information panel
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
        });

        //set marker on the map
        var markerOne = new google.maps.Marker({
            position: jobOne,
            map: map,
            title: 'Job One'
        });
        //set action when click
        markerOne.addListener('click', function() {
            infowindow.open(map, markerOne);
        });

        var jobTwo = {lat: 53.3848933, lng: -1.4817054000000098};
        var contentStringTwo = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

        var infowindowTwo = new google.maps.InfoWindow({
            content: contentStringTwo,
            maxWidth: 200
        });

        var markerTwo = new google.maps.Marker({
            position: jobTwo,
            map: map,
            title: 'Job Two'
        });
        markerTwo.addListener('click', function() {
            infowindowTwo.open(map, markerTwo);
        });
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
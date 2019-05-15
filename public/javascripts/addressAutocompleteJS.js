/**
 * autofill the form for the users by using Google map API
 * @Author Shunbao Li
 * @last_modify_date     15/05/2019
 * @type {{country: string, route: string, postal_town: string, administrative_area_level_1: string, postal_code: string}}
 */
var componentForm = {
    route: 'long_name',
    postal_town: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

/**
 * search for the place input by users and autofill in the searching results into specific place
 */
function autoFillAddress() {
    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        //fill in latitude and longitude into hidden input boxes
        document.getElementById('cityLat').value = place.geometry.location.lat();
        document.getElementById('cityLng').value = place.geometry.location.lng();
        for (var component in componentForm) {
            document.getElementById(component).value = '';
        }

        // Get each component of the address from the place details,
        // and then fill-in the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                document.getElementById(addressType).value = val;
            }
        }
    });
}
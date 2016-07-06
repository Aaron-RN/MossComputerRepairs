<section class="row contact expanded">
    <a name="contact"></a>
    <div class="row small-12 small-centered columns">
        <div class="column text-left small-centered small-9">
            <h2 class="show-for-small-only text-center">CONTACTS US</h2>
            <h2 class="show-for-medium">Get in touch with us</h2>
        </div>
    </div>
    <div class="row">
        <div class="column small-centered small-12 medium-10">
            <div class="column  small-12 small-centered medium-uncentered medium-6">
                <form>
                    <input required="required" pattern="^([a-zA-Z0-9)$" minlength="2" maxlength="20" type="text" name="fname" value="" data-validation-length="2-20" data-validation-error-msg="Please enter a correct name." placeholder="First Name">
                    <input type="text" name="lname" pattern="^([a-zA-Z0-9)$" data-validation-length="2-20" minlength="2" maxlength="20" value="" placeholder="Last Name">
                    <input required="required" data-validation="email" type="email" name="email" value="" placeholder="Email">
                    <input required="required" type="tel" data-validation-length="7-12" name="tel" value="" placeholder="Telephone">
                    <textarea required="required" minlength="6" type="text" rows="9" name="message" placeholder="Message"></textarea>
                    <button class="button" name="submit" type="submit">Submit</button>
                </form>
            </div>
            <div class="column hide-for-small-only medium-6">
                <div id="map">
                <script>
                    function initMap() {
                        var myLatLng = {lat: 25.0379, lng: -77.3368};
                        var mapDiv = document.getElementById('map');
                        var info = '<div class="map"><h1>'+"Moss Computer Repairs</h1><p>#13 Kennedy Subdivision<br>Peach and White</p></div>";
                        var map = new google.maps.Map(mapDiv, {
                            center: myLatLng,
                            zoom: 17
                        });
                        var infowindow = new google.maps.InfoWindow({
                            content: info,
                            position: myLatLng
                        });
                        infowindow.open(map);
                       var marker = new google.maps.Marker({
                            position: myLatLng, title: "Moss Computer Repair's"
                        });
                        marker.setMap(map);
                    }
                </script>
                <script src="https://maps.googleapis.com/maps/api/js?callback=initMap" ></script>
                </div>
            </div>
        </div>
    </div>
</section>
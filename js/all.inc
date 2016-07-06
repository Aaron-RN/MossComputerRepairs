<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/lightslider.js"></script>
<script src="js/smoothscroll.js"></script>
<script src="js/drag_JS.js"></script>
<script src="js/phoneApp_JS.js"></script>
<script>
    $(document).ready(function() {
        $('#image-gallery').lightSlider({
            gallery:true,
            item:1,
            thumbItem:5,
            slideMargin: 0,
            speed: 2000,
            pause: 4500,
            auto:true,
            loop:true,
            pauseOnHover: true,
            pager: true,
            currentPagerPosition: 'middle',
            controls: true,
            onSliderLoad: function() {
                $('#image-gallery').removeClass('cS-hidden');
            }
        });
    });
</script>




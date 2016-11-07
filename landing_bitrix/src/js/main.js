;(function($) {
    $(document).ready(function() {

        $('.js-linkToAnchorName a').on('click', function (event) {
            event.preventDefault();

            var $this = $(this),
                href = $this.attr('href').slice('1'),
                $a = $('a[name="'+href+'"]');

            if ( !$a.length ) return true;

            var pos = $a.offset();

            $('html,body').animate({
                scrollTop: pos.top - 46
            }, 500, function () {
                location.hash = href;
            });

            return false;
        })

    });
})(jQuery);
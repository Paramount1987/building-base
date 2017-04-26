require('./ion.rangeSlider');

import APP from '../app';

//--------------------------------slider for product
APP.slider = {
    mainSlider: '.js-slider',
    catalogSlider: '.js-catalog-slider',
    rangeSlider: '.slider-range__input',

    init: function(){
        let _this = this;

        $(document).ready(function(){
           _this.createSlider();
           _this.initRangeSlider();
        });
    },

    createSlider: function(){
        let _this = this;

        if($(_this.mainSlider).length){
            $(_this.mainSlider).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                swipe:false,
                accessibility:false,
                dots: true
            });
        }

        //-----catalog slider
        if($(_this.catalogSlider).length){
            $(_this.catalogSlider).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                swipe:false,
                accessibility:false
            });
        }
    },

    initRangeSlider: function(){
        let _this = this;
        let $rangeSlider = $(_this.rangeSlider);
        let $minInput = $('.js-input-min');
        let $maxInput = $('.js-input-max');

        if($rangeSlider.length){
            $rangeSlider.ionRangeSlider({
                keyboard: false,
                min: 500,
                max: 5000,
                from: 500,
                to: 5000,
                type: 'double',
                step: 100
            });

            $minInput.val($rangeSlider.data("from"));
            $maxInput.val($rangeSlider.data("to"));

            $rangeSlider.on('change', function( ){
                var from = $(this).data("from");
                var to = $(this).data("to");
                $minInput.val(from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") );
                $maxInput.val(to.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") );
            });
        }
    }
}

//-------modal bootstrap
require('./transition');
require('./modal');

import APP from '../app';

//------------modal common
APP.modal = {
    modalBrowser: '#modal-browser',
    modalDev: '#modal-dev',
    modalSuccess: '#modal-success',
    modalFeedback: '#modal-feedback',
    bannerLink: '.info-container__el-link',
    mapsiteLink: '.js-mapsite-link',
    emailModalLink: '.js-modal-email',

    init: function($){
        var _this = this;
        $(document).ready(function(){
            _this.detectFlexBox($);
            _this.clickLinkModal($);
            _this.clickEmailLink($);
        });
    },

    detectFlexBox: function($){
        if (!Modernizr.flexbox) {
            this.showModalBrowser($);
        }
    },

    showModalBrowser: function($){
        $(this.modalBrowser).modal('show');
    },

    clickEmailLink: function($){
        var _this = this;

        $('body').on('click', this.emailModalLink, function(e){
            e.preventDefault();
            $(_this.modalFeedback).modal('show');
        });
    },

    // show modal for absent pages
    clickLinkModal: function($){
        var _this = this;
        $('body').on('click', this.bannerLink + ',' + this.mapsiteLink, function(e){
            if($(this).attr('href') == 'modal'){
                e.preventDefault();
                $(_this.modalDev).modal('show');
            }
        });
    }
};

//-----popup for product
APP.popup = {
    container: '.product-popup',
    closeBtn: '.product-popup__close',
    openBtn: '.js-product-more',
    popupContainer: '.product-info__body',

    init: function($){
        var _this = this;
        $(document).ready(function(){
            _this.closePopup($);
            _this.openPopup($);
        });
    },

    closePopup: function($){
        var _this = this;
        $('body').on('click', _this.closeBtn, function(e){
            $(this).parent(_this.container).fadeOut(300, function(){
                _this.clearPopup($);
            });
        })
    },

    openPopup: function($){
        var _this = this;
        $('body').on('click', _this.openBtn, function(){
            var urlRequest = $(this).data('url');

            //disabled btn for none click for more request
            $(this).prop('disabled', true);

            _this.clearPopup($);
            _this.getProduct($,urlRequest, $(this));
        })
    },

    getProduct: function($,url, $btn){
        var _this = this;
        $.ajax({
            url: url
        })
        .done(function(product){
                _this.pasteProduct($,product);
                $(_this.container).fadeIn();

                //enable bt for request
                $btn.prop('disabled',false);
        })
        .fail(function(error){
                //enable bt for request
                $btn.prop('disabled',false);
               console.log(error);
        });
    },

    pasteProduct: function($,product){
        $(this.container).append(product);
    },

    clearPopup: function($){
        $(this.popupContainer).remove();
    }
}
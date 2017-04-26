import APP from '../app';

APP.form = {
    btnSubmit: '.btn-submit',
    modalSuccess: '#modal-success',
    modalFeedback: '#modal-feedback',
    form: '.form',
    formControl: '.form-control',
    emptyError: '<div class="form__info-error empty-error"><p class="form__info-error__text">Обязательное поле для заполнения</p></div>',
    emailError: '<div class="form__info-error email-error"><p class="form__info-error__text">Email is not valid</p></div>',
    serverError: '<div class="form__info-error server-error"><p class="form__info-error__text">Ошибка отправки</p></div>',
    formBottom: '.form__bottom-error',
    empty: false,
    emailErrorIsShow: false,

    init: function($){
        var _this = this;

        $(document).ready(function(){
           _this.submitForm($);
            _this.inputChange($);
        });
    },


    submitForm: function($){
        var _this = this;

        $('body').on('click', _this.btnSubmit, function(e){
           e.preventDefault();
            var email = $('#form-email').val();

            //clear server error
            if(('.server-error').length){
                $('.server-error').remove();
            }

            var isEmpty = _this.inputIsEmpty($);
            var emailIsValid = _this.validateEmail($, email);

            if(!isEmpty && emailIsValid){
                _this.sendData($);
            }
        });
    },

    sendData: function($){
        var _this = this;

        var data = {
            Username: $('#form-username').val(),
            Email: $('#form-email').val(),
            Subject: $('#form-subject').val(),
            Text: $('#form-text').val()
        }

        $.post('feedback/send', data)
            .done(function(reply){
                $(this.modalSuccess).modal('show');
                $(this.modalFeedback).modal('hide');
                $('.modal-content__feedback .form-control').val('');
            })
            .fail(function(error){
                $(_this.formBottom).append(_this.serverError);
            });
    },

    inputChange: function($){
        var _this = this;

        $('body').on('keyup', _this.formControl, function(e){
            var $parent = $(this).parent('.form-group');

            //clear server error
            if(('.server-error').length){
                $('.server-error').remove();
            }


            if($parent.hasClass('error')){
                $parent.removeClass('error empty-error');
            }

            if( !$('.form-group.empty-error').length ){
                $('.form__info-error.empty-error').remove();
                _this.empty = false;
            }

        });

        $('body').on('keyup', "#form-email", function(e){
            var email = $('#form-email').val();
            _this.validateEmail($, email);
        });
    },

    inputIsEmpty: function($) {

        var _this = this;
        var $formControl = $(_this.formControl);

        $formControl.each(function(){

            if(!$(this).val().length){
                $(this).parent('.form-group').addClass('error empty-error');

                if(!_this.empty){
                    _this.empty = true;
                    $(_this.formBottom).append(_this.emptyError);
                }
            }
        });

        return _this.empty;
    },

    validateEmail: function($,email){
        var _this = this;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValid = re.test(email);
        var $emailGroup = $('#form-email').parent('.form-group');

        if(!isValid){

            if(!_this.emailErrorIsShow){
                $(_this.formBottom).append(_this.emailError);
                $emailGroup.addClass('error email-error');
            }

            _this.emailErrorIsShow = true;

        }else{
            $('.form__info-error.email-error').remove();
            $emailGroup.removeClass('error email-error');
            _this.emailErrorIsShow = false;
        }
        return isValid;
    }
}
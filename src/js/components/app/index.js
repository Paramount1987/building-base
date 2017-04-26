const APP = {
    domLoaded: function() {
        $(document).ready(function(){
            //hide preload
            setTimeout(function(){$('#preloader').fadeOut()},300);
        });

    }
}

export default APP;

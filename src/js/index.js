'use strict';

//------------------------------------------
import APP  from './components/app';
require('./components/slider');
require('./components/tab');
require('./components/collapse');

//--------------dom is loaded
APP.domLoaded();

//------------------slider
APP.slider.init();

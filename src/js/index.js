import $ from "jquery";
import 'bootstrap'; //breathecode dom for more explicit errors
import 'breathecode-dom';//include your own styles
import '../style/index.scss';

window.onload = function(){
    console.log('Hello Rigo from the console!');
    document.querySelector('.error').style.display = "none";
};
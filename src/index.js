import _ from 'lodash';
import './style.css';
import './normalize.css';
import './skeleton.css';
import './skeletonstyle.css';
import timGraph from './tim.js';
import renderMath from './rendermath.js';

/*
function component() {
  var element = document.createElement('div');
  element.innerHTML = _.join(['wtf', 'webpack'], ' ');
  return element;
}

var element2 = document.getElementById('myid1');
element2.appendChild(component());
*/

timGraph();
renderMath();

import katex from 'katex';
import './katex.css';

export default function renderMath() {

  var elt0 = document.getElementById("eqn0");
  katex.render("P(s) = {e}^{-s}", elt0, {
    throwOnError: false
  });

  var elt01 = document.getElementById("eqn01");
  katex.render("P(s) \\approx {\\frac{1}{2}}{\\pi}{s}{e}^{-{\\frac{\\pi{s}^2}{4}}}", elt01, {
    throwOnError: false
  });

  var elt1 = document.getElementById("eqn1");
  katex.render("W = {\\frac{1}{P}}{XX}^T", elt1, {
    throwOnError: false
  });

  var elt2 = document.getElementById("eqn2");
  katex.render("{λ}_i", elt2, {
    throwOnError: false
  });
  
  var elt3 = document.getElementById("eqn3");
  katex.render("{ψ}_i", elt3, {
    throwOnError: false
  });

  var elt4 = document.getElementById("eqn4");
  katex.render("W{ψ}_i = {{λ}_i}{{ψ}_i}", elt4, {
    throwOnError: false
  });

}
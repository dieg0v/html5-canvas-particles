
function randomRange(min, max) {
	return ((Math.random() * (max - min)) + min);
}
function hexToR(h) {
	return parseInt((cutHex(h)).substring(0,2),16);
}
function hexToG(h) {
	return parseInt((cutHex(h)).substring(2,4),16);
}
function hexToB(h) {
	return parseInt((cutHex(h)).substring(4,6),16);
}
function cutHex(h) {
	return (h.charAt(0)=="#") ? h.substring(1,7):h;
}
function postwith (to,p) {
  var myForm = document.createElement("form");
  myForm.method="post" ;
  myForm.action = to ;
  for (var k in p) {
    var myInput = document.createElement("input") ;
    myInput.setAttribute("name", k) ;
    myInput.setAttribute("value", p[k]);
    myForm.appendChild(myInput) ;
  }
  document.body.appendChild(myForm) ;
  myForm.submit() ;
  document.body.removeChild(myForm) ;
}
/**
 *  trick to enable html5 element in ie
 */

// element list
var html5Element = [
    'header', 'section', 'footer', 'nav'
];
for (var i = 0; i< html5Element.length; i++) {
    document.createElement(html5Element[i]);
}
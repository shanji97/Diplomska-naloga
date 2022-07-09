"use strict";
// jQuery.fn.centerV = function () {
//     this.css("position", "absolute");
//     this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
//         $(window).scrollTop()) + "px");

//     return this;
// }

function setAsideElement(){
    $("aside").css("position", "absolute");
    let centerV = Math.max(0, (($(window).height() - $("aside").outerHeight()) / 2) + $(window).scrollTop());
    $("aside").css("top", centerV.toString() + "px");
}    

$(document).ready(function () {

    setAsideElement();
    // console.log(centerV.toString());
});

function test(){
    console.log("test");
}
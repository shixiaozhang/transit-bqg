function loadad(name) {
    var placeholder = document.getElementById(name);
    var adhtml = document.getElementById("span_" + name);
    if (adhtml == null) return (false);
    placeholder.innerHTML = adhtml.innerHTML;
    adhtml.innerHTML = "";
    return (true)
}
loadad("readtools");
var inputId = "xssk";
var Auto_count = 10;
var BeginCount = 1;

var wrapper = document.getElementById("box_con");
var content = document.getElementById("content");
if (typeof(getCookie("bgcolor")) != 'undefined') {
    wrapper.style.background = getCookie("bgcolor");
    document.getElementById("bcolor").value = getCookie("bgcolor")
}
if (typeof(getCookie("sizecolor")) != 'undefined') {
    content.style.color = getCookie("sizecolor");
    document.getElementById("txtcolor").value = getCookie("sizecolor")
}
if (typeof(getCookie("fontsize")) != 'undefined') {
    document.getElementById("fonttype").value = getCookie("fontsize");
    var inputlist = document.getElementById("content").getElementsByTagName("p");
    for (var i = 0; i < inputlist.length; i++) {
        inputlist[i].style.fontSize = getCookie("fontsize")
    }
    document.getElementById("content").style.fontSize = getCookie("fontsize")
}
function changebgcolor(id) {
    wrapper.style.background = id.options[id.selectedIndex].value;
    setCookie("bgcolor", id.options[id.selectedIndex].value, 365)
}
function changecolor(id) {
    content.style.color = id.options[id.selectedIndex].value;
    setCookie("sizecolor", id.options[id.selectedIndex].value, 365)
}
function changesize(id) {
    setCookie("fontsize", id.options[id.selectedIndex].value, 365);
    var inputlist = document.getElementById("content").getElementsByTagName("p");
    for (var i = 0; i < inputlist.length; i++) {
        inputlist[i].style.fontSize = id.options[id.selectedIndex].value
    }
}
function setCookie(name, value, day) {
    var exp = new Date();
    exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
    document.cookie = name + "= " + escape(value) + ";expires= " + exp.toGMTString()
}
function getCookie(objName) {
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1])
    }
}
var speed = 5;
var currentpos = 1;
var timer;
var scrollspeed = document.getElementById('scrollspeed');
function setSpeed(id) {
    speed = parseInt(scrollspeed.value);
    if (speed < 1 || speed > 10) {
        speed = 5;
        scrollspeed.value = 5
    }
    setCookie("scroll", id.options[id.selectedIndex].value, 365);
    stopScroll();
    beginScroll()
}
function stopScroll() {
    clearInterval(timer)
}
function beginScroll() {
    stopScroll();
    timer = setInterval("scrolling()", Math.ceil(300 / Number(speed)))
}
function scrolling() {
    currentpos = document.documentElement.scrollTop;
    window.scroll(0, ++currentpos);
    if (currentpos != document.documentElement.scrollTop) clearInterval(timer)
}
function loadSet() {
    if (typeof(getCookie("scroll")) == 'undefined') {
        speed = 5;
        scrollspeed.value = "5"
    } else {
        scrollspeed.value = getCookie("scroll");
        speed = Number(getCookie("scroll"))
    }
}
//document.onmousedown = stopScroll;
//document.ondblclick = beginScroll;
loadSet();
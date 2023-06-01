var Cookie = {
  get: function (a) {
    if (!a) {
      return null;
    }
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(a).replace(/[\-\.\+\*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    );
  },
  set: function (d, g, c, b, a, e) {
    if (!d || /^(?:expires|max\-age|path|domain|secure)$/i.test(d)) {
      return false;
    }
    var f = "; max-age=" + c;
    document.cookie =
      encodeURIComponent(d) +
      "=" +
      encodeURIComponent(g) +
      f +
      (a ? "; domain=" + a : "") +
      (b ? "; path=" + b : "") +
      (e ? "; secure" : "");
    return true;
  },
};
function getXMLHttpRequest() {
  try {
    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (a) {
      return new ActiveXObject("Msxml2.XMLHTTP");
    }
  } catch (a) {
    return new XMLHttpRequest();
  }
}
function doAjax(url, query, callback, reqtype, getxml) {
  var myreq = getXMLHttpRequest();
  myreq.onreadystatechange = function () {
    if (myreq.readyState == 4) {
      if (myreq.status == 200) {
        var item = myreq.responseText;
        if (getxml == 1) {
          item = myreq.responseXML;
        }
        eval(callback + "(item)");
      }
    } else {
    }
  };
  if (reqtype.toUpperCase() == "POST") {
    requestPOST(url, query, myreq);
  } else {
    requestGET(url, query, myreq);
  }
}
function requestGET(b, d, c) {
  var e = parseInt(Math.random() * 99999999);
  if (d == "") {
    var a = b + "?rand" + e;
  } else {
    var a = b + "?" + d + "&rand=" + e;
  }
  c.open("GET", a, true);
  c.send(null);
}
function requestPOST(a, c, b) {
  b.open("POST", a, true);
  b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  b.send(c);
}
function ajaxCallback(a) {
  alert(a.replace(/<br[^<>]*>/g, "\n"));
}
function login_code() {
  var a = document.getElementById("username").value;
  var b = document.getElementById("userpass").value;
  var c = document.getElementById("authcode").value;
  if (!a || !b || !c) {
    document.getElementById("logintips").innerHTML = "请输入登录账号、密码和验证码！";
    return false;
  } else {
    document.getElementById("logintips").innerHTML = "登录中...";
  }
  doAjax("/login_do.php", "chname=" + a + "&chpass=" + b + "&authcode=" + c, "go_login", "POST", 0);
}
function go_login(c) {
  reloadcode();
  var a = document.getElementById("logintips");
  switch (c) {
    case "nodata":
      a.innerHTML = "所有注册项必须填写！";
      return false;
    case "nologin":
      a.innerHTML = "账号密码错误！";
      return false;
    case "yeslogin":
      a.innerHTML = "登录成功！";
      var d = new Array();
      d = document.URL.split("?url=");
      var b = d[1];
      if (b) {
        b = b.replace(/\%2F/g, "/");
        b = b.replace(/\%3A/g, ":");
        b = b.replace(/\%23/g, "");
        b = b.replace(/\%3F/g, "?");
        b = b.replace(/\%3D/g, "=");
        b = b.replace(/\%26/g, "&");
        window.location.href = b;
      } else {
        window.location.href = "/";
      }
      return false;
    case "nocode":
      a.innerHTML = "请输入验证码！";
      return false;
    case "err_code":
      a.innerHTML = "验证码错误！";
      return false;
    default:
      a.innerHTML = c || "未知错误！";
      return false;
  }
}
function is_login(a) {
  if (a == "right") {
    document.getElementById("logintips").innerHTML = "登录成功！";
    var b = new Array();
    b = document.URL.split("?url=");
    url = b[1];
    if (url) {
      url = url.replace(/\%2F/g, "/");
      url = url.replace(/\%3A/g, ":");
      url = url.replace(/\%23/g, "");
      url = url.replace(/\%3F/g, "?");
      url = url.replace(/\%3D/g, "=");
      url = url.replace(/\%26/g, "&");
      window.location.href = url;
    } else {
      window.location.href = "/";
    }
  } else {
    document.getElementById("logintips").innerHTML = "帐号或密码错误，登录失败！";
  }
}
function reloadcode() {
  var a = document.getElementById("showcode");
  if (a) {
    a.setAttribute("src", "/checkcode.php?" + Math.random());
  }
}
function register_code() {
  var a = document.getElementById("regname").value;
  var b = document.getElementById("regpass").value;
  var d = document.getElementById("regemail").value;
  var c = document.getElementById("authcode").value;
  if (!a || !b || !d || !c) {
    go_register("nodata");
    return false;
  }
  doAjax(
    "/register_do.php",
    "uname=" + a + "&upass=" + b + "&uemail=" + d + "&authcode=" + c,
    "go_register",
    "POST",
    0
  );
}
function go_register(b) {
  reloadcode();
  var a = document.getElementById("logintips");
  switch (b) {
    case "nodata":
      a.innerHTML = "所有注册项必须填写！";
      return false;
    case "bigname":
      a.innerHTML = "用户名太长！10个中问或者30个英文以内！";
      return false;
    case "bigpass":
      a.innerHTML = "密码太长！16位以内！";
      return false;
    case "bigemail":
      a.innerHTML = "邮箱太长！";
      return false;
    case "emailerror":
      a.innerHTML = "邮箱格式错误！";
      return false;
    case "havename":
      a.innerHTML = "用户名已被注册！";
      return false;
    case "haveemial":
      a.innerHTML = "邮箱已被注册！";
      return false;
    case "yesregister":
      a.innerHTML = "注册成功并已经登录！";
      window.location.href = "/";
    case "nocode":
      a.innerHTML = "请输入验证码！";
      return false;
    case "err_code":
      a.innerHTML = "验证码错误！";
      return false;
    default:
      a.innerHTML = b || "未知错误";
      return false;
  }
}
function toggleSort() {
  var a = document.getElementById("submenu");
  if (a.style.display == "none") {
    a.style.display = "block";
  } else {
    a.style.display = "none";
  }
}
function case_del(a) {
  doAjax("/modules/article/wapajax.php", "aid=" + a, "case_del2", "POST", 0);
  document.getElementById("" + a).innerHTML =
    "<tr><td style='height:30px;line-height:30px;'><font color=red>删除中，请稍后...</font></td></tr>";
}
function case_del2(a) {
  if (a != "") {
    table = document.getElementById("" + a);
    table.style.backgroundColor = "#D3FEDA";
    table.innerHTML =
      "<tr><td style='height:30px;line-height:30px;'><font color=red>已从书架删除！</font></td></tr>";
  }
}
function shuqian(a, d) {
  var c = "/modules/article/addbookcase.php";
  var b = "bid=" + a + "&cid=" + d + "&ajax_request=1";
  doAjax(c, b, "ajaxCallback", "GET", 0);
}
function shujia(a) {
  var c = "/modules/article/addbookcase.php";
  var b = "bid=" + a + "&ajax_request=1";
  doAjax(c, b, "ajaxCallback", "GET", 0);
}
function uservote(b) {
  var a = "/modules/article/uservote.php";
  var c = "id=" + b + "&ajax_request=1";
  doAjax(a, c, "ajaxCallback", "GET", 0);
}
function show_search() {
  var b = document.getElementById("type");
  var a = document.getElementById("searchType");
  if (b.innerHTML == "书名") {
    b.innerHTML = "作者";
    a.value = "author";
  } else {
    b.innerHTML = "书名";
    a.value = "articlename";
  }
}
function page(a) {
  var b = document.getElementById("pageinput").value;
  location.href = a + b;
}
var checkbg = "#ccc";
function nr_setbg(b) {
  var c = document.getElementById("huyandiv");
  var a = document.getElementById("lightdiv");
  if (b == "huyan") {
    if (c.style.backgroundColor == "") {
      set("light", "huyan");
      document.cookie = "light=huyan;path=/";
    } else {
      set("light", "no");
      document.cookie = "light=no;path=/";
    }
  }
  if (b == "light") {
    if (a.innerHTML == "关灯") {
      set("light", "yes");
      document.cookie = "light=yes;path=/";
    } else {
      set("light", "no");
      document.cookie = "light=no;path=/";
    }
  }
  if (b == "big") {
    set("font", "big");
    document.cookie = "font=big;path=/";
  }
  if (b == "middle") {
    set("font", "middle");
    document.cookie = "font=middle;path=/";
  }
  if (b == "small") {
    set("font", "small");
    document.cookie = "font=small;path=/";
  }
}
function getset() {
  var e = document.cookie;
  var f = e.split("; ");
  var b;
  var c;
  for (var d = 0; d < f.length; d++) {
    var a = f[d].split("=");
    if ("light" == a[0]) {
      b = a[1];
      break;
    }
  }
  for (var d = 0; d < f.length; d++) {
    var a = f[d].split("=");
    if ("font" == a[0]) {
      c = a[1];
      break;
    }
  }
  if (b == "yes") {
    set("light", "yes");
  } else {
    if (b == "no") {
      set("light", "no");
    } else {
      if (b == "huyan") {
        set("light", "huyan");
      }
    }
  }
  if (c == "big") {
    set("font", "big");
  } else {
    if (c == "middle") {
      set("font", "middle");
    } else {
      if (c == "small") {
        set("font", "small");
      } else {
        set("", "");
      }
    }
  }
}
function set(n, i) {
  var r = document.getElementById("nr_body");
  var g = document.getElementById("huyandiv");
  var c = document.getElementById("lightdiv");
  var l = document.getElementById("fontfont");
  var q = document.getElementById("fontbig");
  var a = document.getElementById("fontmiddle");
  var e = document.getElementById("fontsmall");
  var j = document.getElementById("nr1");
  var b = document.getElementById("nr_title");
  var b = document.getElementById("nr_title");
  var d = document.getElementById("shuqian");
  var m = document.getElementById("pt_mulu");
  var k = document.getElementById("pt_index");
  var f = document.getElementById("pt_bookcase");
  var s = document.getElementById("pb_prev");
  var h = document.getElementById("pb_mulu");
  var t = document.getElementById("pb_next");
  if (n == "light") {
    if (i == "yes") {
      var o = "background-color:#666;color:#ccc;border:1px solid #444";
      c.innerHTML = "开灯";
      r.style.backgroundColor = "#444";
      g.style.backgroundColor = "";
      b.style.color = "#ddd";
      j.style.color = "#999";
      d.style.cssText = o;
      m.style.cssText = o;
      k.style.cssText = o;
      f.style.cssText = o;
      s.style.cssText = o;
      h.style.cssText = o;
      t.style.cssText = o;
    } else {
      if (i == "no") {
        c.innerHTML = "关灯";
        r.style.backgroundColor = "rgb(251, 246, 236)";
        j.style.color = "#000";
        b.style.color = "#000";
        g.style.backgroundColor = "";
        d.style.cssText = "";
        m.style.cssText = "";
        k.style.cssText = "";
        f.style.cssText = "";
        s.style.cssText = "";
        h.style.cssText = "";
        t.style.cssText = "";
      } else {
        if (i == "huyan") {
          var o =
            "background-color:rgb(204, 226, 191);color:green;border:1px solid rgb(187, 214, 170)";
          c.innerHTML = "关灯";
          g.style.backgroundColor = checkbg;
          r.style.backgroundColor = "rgb(220, 236, 210)";
          j.style.color = "#333";
          d.style.cssText = o;
          m.style.cssText = o;
          k.style.cssText = o;
          f.style.cssText = o;
          s.style.cssText = o;
          h.style.cssText = o;
          t.style.cssText = o;
        }
      }
    }
  }
  if (n == "font") {
    q.style.backgroundColor = "";
    a.style.backgroundColor = "";
    e.style.backgroundColor = "";
    if (i == "big") {
      q.style.backgroundColor = checkbg;
      j.style.fontSize = "24px";
    }
    if (i == "middle") {
      a.style.backgroundColor = checkbg;
      j.style.fontSize = "20px";
    }
    if (i == "small") {
      e.style.backgroundColor = checkbg;
      j.style.fontSize = "16px";
    }
  }
}
function saveCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 3);
    var expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}
function check_bid_by_cookie(bid) {
  var clickbids = readCookie("clickbids");
  if (null == clickbids) {
    return false;
  }
  var arr_bid = clickbids.split(",");
  for (var i = arr_bid.length - 1; i >= 0; i--) {
    if (parseInt(bid) == parseInt(arr_bid[i])) {
      return true;
    }
  }
  return false;
}
function set_bid_in_cookie(bid) {
  var clickbids = readCookie("clickbids");
  if (null == clickbids) {
    clickbids = bid;
  } else {
    clickbids = clickbids + "," + bid;
  }
  saveCookie("clickbids", clickbids, 1);
}
function addvisit(bid) {
  if (!check_bid_by_cookie(bid)) {
    url = "/modules/article/articlevisit.php?id=" + bid;
    doAjax(url, "", "", "GET", 0);
    set_bid_in_cookie(bid);
  }
}
function bd_push() {
  var c = document.createElement("script");
  var b = window.location.protocol.split(":")[0];
  if (b === "https") {
    c.src = "https://zz.bdstatic.com/linksubmit/push.js";
  } else {
    c.src = "http://push.zhanzhang.baidu.com/push.js";
  }
  var a = document.getElementsByTagName("script")[0];
  a.parentNode.insertBefore(c, a);
}
var isUC = /UCBrowser/i.test(navigator.userAgent);
function _0em01() {
  _0xap01();
}
function _0ee01() {}
function _0xap01() {}

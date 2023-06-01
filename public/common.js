var jieqiUserId = 0;
var jieqiUserName = "";
var jieqiUserPassword = "";
var jieqiUserGroup = 0;
var jieqiNewMessage = 0;
var jieqiUserVip = 0;
var jieqiUserHonor = "";
var jieqiUserGroupName = "";
var jieqiUserVipName = "";

function get_cookie_value(Name) {
  var search = Name + "=";
  var returnvalue = "";
  if (document.cookie.length > 0) {
    offset = document.cookie.indexOf(search);
    if (offset != -1) {
      offset += search.length;
      end = document.cookie.indexOf(";", offset);
      if (end == -1) end = document.cookie.length;
      returnvalue = unescape(document.cookie.substring(offset, end));
    }
  }
  return returnvalue;
}

if (document.cookie.indexOf("jieqiUserInfo") >= 0) {
  var jieqiUserInfo = get_cookie_value("jieqiUserInfo");
  //document.write(jieqiUserInfo);
  start = 0;
  offset = jieqiUserInfo.indexOf(",", start);
  while (offset > 0) {
    tmpval = jieqiUserInfo.substring(start, offset);
    tmpidx = tmpval.indexOf("=");
    if (tmpidx > 0) {
      tmpname = tmpval.substring(0, tmpidx);
      tmpval = tmpval.substring(tmpidx + 1, tmpval.length);
      if (tmpname == "jieqiUserId") jieqiUserId = tmpval;
      else if (tmpname == "jieqiUserName_un") jieqiUserName = tmpval;
      else if (tmpname == "jieqiUserPassword") jieqiUserPassword = tmpval;
      else if (tmpname == "jieqiUserGroup") jieqiUserGroup = tmpval;
      else if (tmpname == "jieqiNewMessage") jieqiNewMessage = tmpval;
      else if (tmpname == "jieqiUserVip") jieqiUserVip = tmpval;
      else if (tmpname == "jieqiUserHonor_un") jieqiUserHonor = tmpval;
      else if (tmpname == "jieqiUserGroupName_un") jieqiUserGroupName = tmpval;
    }
    start = offset + 1;
    if (offset < jieqiUserInfo.length) {
      offset = jieqiUserInfo.indexOf(",", start);
      if (offset == -1) offset = jieqiUserInfo.length;
    } else {
      offset = -1;
    }
  }
}

// 搜索框
function SearchBox() {
  document.writeln(
    '<form method="get" target=\'_blank\' action="/modules/article/search.php">'
  );
  document.writeln(
    '                <input  type="text" name="searchkey" class="search" placeholder="提示：宁可少字也别错字" autocomplete="off"/>'
  );
  document.writeln('                <button type="submit">搜索小说</button>');
  document.writeln("            </form>");
}

//滑动门
function getNames(obj, name, tij) {
  var p = document.getElementById(obj);
  var plist = p.getElementsByTagName(tij);
  var rlist = new Array();
  for (i = 0; i < plist.length; i++) {
    if (plist[i].getAttribute("name") == name) {
      rlist[rlist.length] = plist[i];
    }
  }
  return rlist;
}

function fod(obj, name) {
  var p = obj.parentNode.getElementsByTagName("td");
  var p1 = getNames(name, "f", "div");
  // document.getElementById(name).getElementsByTagName("div");

  for (i = 0; i < p1.length; i++) {
    if (obj == p[i]) {
      p[i].className = "tab" + i + "1";
      p1[i].className = "dis";
    } else {
      p[i].className = "tab" + i + "0";
      p1[i].className = "undis";
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
//增加阅读数
function addvisit(bid) {
  if (!check_bid_by_cookie(bid)) {
    url = "/modules/article/articlevisit.php?id=" + bid;
    $.get(url);
    set_bid_in_cookie(bid);
  }
}

// 提交动作并弹出提示
function showpop(url) {
  $.get(url, function (data) {
    alert(data.replace(/<br[^<>]*>/g, "\n"));
  });
}

// 添加到收藏夹
function addBookmark(title, url) {
  if (!title) {
    title = document.title;
  }
  if (!url) {
    url = window.location.href;
  }
  if (window.sidebar) {
    window.sidebar.addPanel(title, url, "");
  } else if (document.all) {
    window.external.AddFavorite(url, title);
  } else if (window.opera || window.print) {
    alert("浏览器不支持，请使用Ctrl + D 收藏！");
    return true;
  }
}

function Login() {
  // if (
  //   jieqiUserId != 0 &&
  //   jieqiUserName != "" &&
  //   (document.cookie.indexOf("PHPSESSID") != -1 || jieqiUserPassword != "")
  // ) {
  //   document.write(
  //     'Hi,<a href="/userdetail.php" target="_top">' +
  //       jieqiUserName +
  //       '</a> | <a href="/logout.php" target="_self">退出登录</a>'
  //   );
  // } else {
  //   document.writeln(
  //     '<a href="/login.php">登录</a>、<a href="/register.php">注册</a>'
  //   );
  // }
  document.writeln(
    '<br><a target="_blank" class=\'red\' href="' +
      location.origin.replace("www", "m") +
      '">手机阅读</a>'
  );
}

// 底部文字说明
function foot() {
  document.writeln(
    "<p>所有小说和章节均由网友上传，转载只为宣传本书让更多读者欣赏。</p>"
  );
  document.writeln(
    "<p>Copyright &copy; " +
      new Date().getFullYear() +
      location.host.replace("www.", " ").toUpperCase() +
      "</p>"
  );
}

// 加载JS
function loadJs(url) {
  if (arguments.length >= 2 && typeof arguments[1] == "function")
    funload = arguments[1];
  if (arguments.length >= 3 && typeof arguments[2] == "function")
    funerror = arguments[2];
  var ss = document.getElementsByTagName("script");
  for (i = 0; i < ss.length; i++) {
    if (ss[i].src && ss[i].src.indexOf(url) != -1) {
      if (typeof funload == "function") funload();
      return;
    }
  }
  s = document.createElement("script");
  s.type = "text/javascript";
  s.defer = "defer";
  s.src = url;
  document.getElementsByTagName("head")[0].appendChild(s);

  s.onload = s.onreadystatechange = function () {
    if (this.readyState && this.readyState == "loading") return;
    if (typeof funload == "function") funload();
  };
  s.onerror = function () {
    this.parentNode.removeChild(this);
    if (typeof funerror == "function") funerror();
  };
}

// 阅读页顶部文字颜色风格操作区域代码
function ReadOptions() {
  document.writeln(
    '背景：<select onChange="changebgcolor(this)" id="bcolor" name="bcolor"><option value="#E9FAFF" style="background-color: #E9FAFF;">默认底色</option><option value="#E9FAFF" style="background-color: #E9FAFF;">淡蓝海洋</option><option value="#FFFFED" style="background-color: #FFFFED;">明黄清俊</option><option value="#EEFAEE" style="background-color: #EEFAEE;">绿意淡雅</option><option value="#FCEFFF" style="background-color: #FCEFFF;">红粉世家</option><option value="#FFFFFF" style="background-color: #FFFFFF;">白雪天地</option><option value="#EFEFEF" style="background-color: #EFEFEF;">灰色世界</option></select>'
  );
  document.writeln(
    '字色：<select  onchange="changecolor(this)" id="txtcolor" name="txtcolor"><option value="#555555" style="color: #555555;">默认</option><option value="#000000" style="color: #000000;">黑色</option><option value="#ff0000" style="color: #FF0000;">红色</option><option value="#006600" style="color: #006600;">绿色</option><option value="#0000ff" style="color: #0000FF;">蓝色</option><option value="#660000" style="color: #660000;">棕色</option></select>'
  );
  document.writeln(
    '字号：<select onChange="changesize(this)" id="fonttype" name="fonttype"><option value="20px" selected="selected">默认</option><option value="12px">小号</option><option value="15px">中号</option><option value="18px">大号</option><option value="20px">较大</option><option value="24px">特大</option></select>'
  );
  document.writeln(
    '双击滚屏：<select onChange="setSpeed(this)" id="scrollspeed" name="scrollspeed"><option value="1">最慢</option><option value="3">较慢</option><option value="5" selected="selected">适中</option><option value="7">较快</option><option value="10">最快</option></select>'
  );
}

// 阅读页底部提示
function readtip() {
  document.writeln(
    '<p style="color:#B2B2B2;font-size: 12px;padding:10px 0;text-align: center;">小技巧：按 Ctrl+D 快速保存当前章节页面至浏览器收藏夹；按 回车[Enter]键 返回章节目录，按 &larr;键 回到上一章，按 &rarr;键 进入下一章。</p>'
  );
}

// 阅读页左右操作提示
function mark(id, cid) {
  document.writeln(
    '<div class="reader_mark1"><a href="javascript:;" onclick="showpop(\'/modules/article/addbookcase.php?id=' +
      id +
      "&cid=" +
      cid +
      "&ajax_request=1');\"></a></div>"
  );
  document.writeln(
    '<div class="reader_mark0"><a href="javascript:;" onclick="showpop(\'/modules/article/uservote.php?id=' +
      id +
      "&ajax_request=1');\"></a></div>"
  );
}

//书签
function addbookcasemark(bid, cid) {
  url =
    "/modules/article/addbookcase.php?bid=" +
    bid +
    "&cid=" +
    cid +
    "&ajax_request=1";
  $.post(url, function (res) {
    alert(res.replace(/<br[^<>]*>/g, "\n"));
  });
}

//书架
function addbookcase(bid) {
  url = "/modules/article/addbookcase.php?bid=" + bid + "&ajax_request=1";
  $.post(url, function (res) {
    alert(res.replace(/<br[^<>]*>/g, "\n"));
  });
}

//投票
function vote(id) {
  url = "/modules/article/uservote.php?id=" + id + "&ajax_request=1";
  $.post(url, function (res) {
    alert(res.replace(/<br[^<>]*>/g, "\n"));
  });
}

function keyevent() {
  var index_page = $("#link-index").attr("href");
  var prev_page = $("#link-preview").attr("href");
  var next_page = $("#link-next").attr("href");

  function jumpPage() {
    var event = document.all ? window.event : arguments[0];
    if (event.keyCode == 37) document.location = prev_page;
    if (event.keyCode == 39) document.location = next_page;
    if (event.keyCode == 13) document.location = index_page;
  }

  document.onkeydown = jumpPage;
}

//跳转到手机版
function Go(url) {
  function is_mobile() {
    var regex_match =
      /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
    return (
      navigator.userAgent == null ||
      regex_match.exec(navigator.userAgent) != null
    );
  }

  if (is_mobile()) {
    window.top.location.href = url;
  }
}

// 百度自动推送
function bd_push() {
  var bp = document.createElement("script");
  var curProtocol = window.location.protocol.split(":")[0];
  if (curProtocol === "https") {
    bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
  } else {
    bp.src = "http://push.zhanzhang.baidu.com/push.js";
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
}

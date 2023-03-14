if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i))
{
    document.location = "mobile.html";
}
var terminal = document.getElementById("terminal");
var height1 = document.getElementById("terminal-wrap").clientHeight;
var height = Math.round(document.body.scrollHeight * .5625 / height1) * height1;
var width = terminal.clientWidth;
document.getElementById("terminal-wrap").style.height = height + "px";
terminal.style.height = height + "px";

terminal.addEventListener('wheel', function(e)
{
    var delta = e.deltaY || e.detail || e.wheelDelta;
    if (delta < 0)
    {
    e.preventDefault();
    terminal.scrollTop -= height1;
    }
    else
    {
        e.preventDefault();
        terminal.scrollTop += height1;
    }
});
  
document.getElementById("themeWrapper").onmouseleave = () => changeOrder();
var theme1 = document.getElementById("first");
var theme2 = document.getElementById("second");
var theme3 = document.getElementById("third");
var theme4 = document.getElementById("fourth");
var theme5 = document.getElementById("fifth");
var prevTheme = theme1,
newTheme = theme1;
theme1.onclick = () => changeColor(theme1, "blackTheme");
theme2.onclick = () => changeColor(theme2, "pinkTheme");
theme3.onclick = () => changeColor(theme3, "blueTheme");
theme4.onclick = () => changeColor(theme4, "blueScreenTheme");
theme5.onclick = () => changeColor(theme4, "grassTheme");

function changeColor(themeObj, theme)
{
    newTheme = themeObj;
    document.getElementById("theme").innerHTML = `<link rel='stylesheet' href='styles/${theme}.css' />`;
}

function changeOrder()
{
    let classes = prevTheme.className;
    prevTheme.className = newTheme.className;
    newTheme.className = classes;
    prevTheme = newTheme;
}
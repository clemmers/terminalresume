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

/*
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

*/
  
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
theme5.onclick = () => changeColor(theme5, "grassTheme");

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


var title = document.getElementById("title");
var subtitle = document.getElementById("subtitle");
var subCursor = document.getElementById("subtitle-cursor");

// reveal title

var titleText = "Hi, my name's Chris!"
var subtitleText = "The following site contains my resume inside an interactive and navigable temrinal si";
var subtitleTextTwo = "rminal simulation";

function revealText(i = 0)
{
    if(i > titleText.length)
    {
        // call next action
        document.getElementById("title-cursor").style.visibility = "hidden";
        subCursor.style.visibility = "visible";
        revealSubtitle();
        return;
    }
    setTimeout(() => {
        title.innerHTML += titleText.charAt(i);
        revealText(i+1);
    }, Math.floor(Math.random() * 20 + 90));
}

function revealSubtitle(i = 0)
{
    if(i > subtitleText.length)
    {
        // call next action
        setTimeout(() => {
            deleteMistake();
        }, 150);
        return;
    }
    setTimeout(() => {
        subtitle.innerHTML += subtitleText.charAt(i);
        revealSubtitle(i+1);
    }, Math.floor(Math.random() * 20 + 50));
}

function deleteMistake(i = 0)
{
    if(i > 8)
    {
        // call next action
        correctMistake();
        return;
    }
    setTimeout(() => {
        subtitle.innerHTML = subtitle.innerHTML.slice(0, -1);
        deleteMistake(i+1);
    }, Math.floor(Math.random() * 20 * i + 50));
}

function correctMistake(i = 0)
{
    if(i > subtitleTextTwo.length)
    {
        // call next action
        cursorBlink();
        document.getElementById("buttons").style.transform = "translate(0, 0)";
        setTimeout(() => {
        document.getElementById("download-button").style.opacity = "1";
        }, 2000);
        return;
    }
    setTimeout(() => {
        subtitle.innerHTML += subtitleTextTwo.charAt(i);
        correctMistake(i+1);
    }, Math.floor(Math.random() / i * 20 + 50));
}

function cursorBlink()
{
    setTimeout(() => {
        subCursor.style.visibility = "visible";
        setTimeout(() => {
            subCursor.style.visibility = "hidden";
            cursorBlink();
        }, 500);
    }, 500);
}

revealText();


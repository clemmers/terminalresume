/*
known issues in function besides basic developmental issues rooted in lack of intended development
(ex. issues such as " 'help' is not a valid command " are not listed as they are not rooted from
development bugs, rather the code is just not fully developed yet, but issues such as
" 'cd ..' moves user ahead a folder instead of behind a folder " are valid issues as they are caused
from buggy code)

- [FIXED] typing "chrisclem" will make it impossible to delete following 
          text because it thinks that it is a newline
          IDEA TO FIX THIS !!! IDEA IS whenever enter is pressed it takes
          the index of the newline and uses that instead of the
          lastindexof"chrisclem" 11
  
- [FIXED] after clearing terminal a ">" key appears to be somewhere?? so no commands work
      [FIXED] =>  no > anymore after changing how input is handled, however commands still do
      do not work after clearing the terminal
      
- [FIXED] does not read first line properly

- [FIXED] fix all of the above problems and make it overall more efficient if instead of just
  looking at a substring of html element keep track of typed characters in seperate
  string
  
- user can type out of margins and bounds whops

- cannot delete '<', '>', '&' characters, dont know why (deleted from input string
  but does not disappear in html visual)
  
- Initiating shortcuts such as ctrl a will cause letter such as 'a' to be displayed
  
- [FIXED (mostly) ] history function does not work properly i kinda broke it lol trying to make it better

- moving cursor back and forth does not work properly

- [FIXED] cd dir works but cd dir/ does not

- [FIXED] user is able to cd into files that are not folders

- [FIXED] make 'cd ..' from '/root' not send user to ' ' or decide that there should not be a '/root' and just a ' '

- [FIXED] ls files and folders both folder font/color

- [FIXED] 'cd' will cause error because it is trying to split an undefined

- [FIXED] 'cd invalidDirectory' error message will contain '0' instead of 'invalidDirectory' do not know why

- [FIXED] 'ls directory' does not work

- [FIXED] 'chrisclem:~ cd chrisclem/folder1/invalidDirectory' expected to stay in / directory, rather goes into chrisclem/folder1 directory before encountering error

- consider curDirStr to be arr rather than formatted string

- folders should be sorted in alphabetical order (or atleast printed as such in ls) by default without manual sorting

- tab autofill prints not in alphabetical order

- once anything is inputted into terminal, can no longer unfocus

- directories printing to terminal are not conventionally spaced and sorted

*/

var cursorCharacter;
var prevCharacter = '';

if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)) {
            document.location = "mobile.html";
         }

// parseInt(window.getComputedStyle(document.getElementById("terminal")).fontSize, 10)
var height1 = document.getElementById("terminal-wrap").clientHeight;
var height = Math.round(document.body.scrollHeight * .5625 / height1) * height1;
var width = document.getElementById("terminal").clientWidth;

document.getElementById("terminal-wrap").style.height = height + "px";

document.getElementById("terminal").style.height = height + "px";


var terminal = document.getElementById("terminal");

var terminalWrap = document.getElementById("terminal-wrap");
var cursor = document.getElementById("cursor");


var isClickedIn = false;

bodyClick();

function bodyClick()
{
  cursor.style.backgroundColor = 'black';
  isClickedIn = false;
}

document.body.addEventListener('click', bodyClick());

terminalWrap.addEventListener('click', function terminalClick(e)
{
  e.stopPropagation();
  cursor.style.backgroundColor = 'white';
  isClickedIn = true;
});

var input = "";
const history = [""];
var historyIndex = 0;




const commands = [
['cat [FILE]', 'Concatenate files and print on the standard output'],
['cd [dir]', 'Change the shell working directory'],
['clear', 'Clear the terminal screen'],
['download', 'Downloads the latest uploaded version of resume (03.05.23)'],
['help [command]', 'Display information about builtin commands'],
['ls [FILE]', 'List directory contents'],
['pwd', 'Print the name of the current working directory'],
['resume', 'Prints resume to terminal'],
['projects', 'Prints some of my favorite projects']
];

const cmnd = []; 
commands.forEach(e => cmnd.push(e[0].split(" ")[0] + ' '));

const fileStructure = 
{
    chrisclem : 
    {
      contact: '<font style="font-size: 6px"><br></font><b><a href="mailto: chrisclem244@yahoo.com"><font style="font-size: 12px; line-height: 0px">&#128231;</font> chrisclem244@yahoo.com</a><br>'
                + '<font style="font-size: 6px"><br></font><font style="font-size: 12px; line-height: 0px">&#128222;</font> (818)497-1045<br><font style="font-size: 6px"><br></font>'
                + '<a href="https://github.com/clemmers"><img src="github-mark-white.svg" alt="Github:" height="12px" width="relative"> clemmers</a></b><font style="font-size: 6px"><br></font>',
      education: '<b style="color: DodgerBlue"><a target="_blank" href="https://goo.gl/maps/C6VW1p2zdhyGBFXc8">Crescenta Valley High School</a> (August 2020 to Current)</b>'
                + '<br>info about my academic achievements<br>interesting info',
      employment: '<b>Mitch Clem Management<br><a target="_blank" href="https://goo.gl/maps/HQi3KsBrJepPHcN66"><font style="font-size: 12px; line-height: 0px">&#128205</font> Glendale, CA</a></b>'
                + '<br>Social Media Presence Manager (March 2020 to Current)<br> Improved page content,'
                + ' keyword releveancy, and branding to achieve search engine optimization goals<br>'
                + ' Discussed site requirements with client to produce actionable development plans and budgets',
      projects: 
      {
        // github: '<a target="_blank" href="https://github.com/clemmers"><font style="font-size: 12px; line-height: 0px">&#128279;</font> <b>GitHub/clemmers</a></b>',
      },
      skills: '- Fast Learner<br>- Complex Problem Solving<br>- Advanced Analytical Thinking<br>'
              + '- Teamwork<br>- Agile Development Methodology<br>- Unix Shell<br>'
              + '- Code Analysis and Development<br>- Programing Languages: Java, JavaScript, Python'
    }
};

var request = new XMLHttpRequest();


request.open('GET', 'https://api.github.com/users/clemmers/repos', true)

request.onload = function () {
  var data = JSON.parse(this.response);
  data.forEach(function(e){
    
    let description = "<a target='_blank' href='" + e.html_url + "'><font style='font-size: 12px; line-height: 0px'>&#128279;</font><b>" + e.full_name + "</b></a><br>"
                      + e.description
                      + "<br>Made in " + e.language
                      + "<br><font style='font-size: 12px; line-height: 0px'>&#11088;</font>: " + e.stargazers_count
                      + "<br><font style='font-size: 12px; line-height: 0px'>&#128064;</font>: " + e.watchers_count;
  
    eval('Object.assign(fileStructure.chrisclem.projects, {"' + e.name.replace(/-/g, '_') + '" : "' + description + '"});');
    
  });
  console.log(fileStructure);
};

request.send();



var currentDirectory = fileStructure.chrisclem;
var curDirStr = "/chrisclem";

const dateS = new Date();
var date = document.getElementById("date");
date.innerHTML = "<font color='grey'>" + dateS + "</font>";


var cursorPositionLeft = 0;

var tabNum = 0;

// printCursor("white");

/*
const res = await fetch('https://api.github.com/users/clemmers/repos');
if (res.ok) {
  const data = await res.json();
  addText(JSON.stringify(data, null, 4));
}

*/

terminal.addEventListener('wheel', function(e) {
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

document.onkeydown = function(e) {
  if(isClickedIn)
  {
    var key = e.key;
    
    if(key === "Tab")
    {
      e.preventDefault();
      
      let desiredDir = input.split(" ");
      if(desiredDir.length === 1)
      {
        if(input !== "")
          checkTab(currentDirectory, input, cmnd);
      }
      else
      {
        desiredDir = desiredDir[desiredDir.length - 1];
        if(desiredDir !== undefined)
        {
            let dir;
            if(desiredDir.indexOf("/") !== -1)
            {
              desiredDir = desiredDir.split("/");
              dir = traverseDir(desiredDir.splice(0, desiredDir.length - 1), currentDirectory, curDirStr)[0];
              desiredDir = desiredDir[0];
            }
            else
              dir = currentDirectory;
            let dirContent = [];
            switch(input.split(" ")[0])
            {
            case "cd" :
              Object.keys(dir).forEach(function(e) {if(isFolder(e, dir))dirContent.push(e + '/')});
              break;
            case "help" : 
              dirContent = cmnd;
              break;
            default :
              Object.keys(dir).forEach(function(e) {let s = ''; if(isFolder(e, dir)) s = '/'; else s = ' '; dirContent.push(e + s)});
              break;
            }
            checkTab(dir, desiredDir, dirContent);
        }
      }
    }
    
    if(key === "ArrowUp")
    {
      e.preventDefault();
      if(historyIndex < history.length - 1 && history.length != 0)
      {
        let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 67 - cursorPositionLeft;
        historyIndex ++;
        terminal.innerHTML = terminal.innerHTML.substr(0, lengthWithoutCursor - input.length) + history[historyIndex] + terminal.innerHTML.substring(lengthWithoutCursor);
        input = history[historyIndex];
      }
    }
    if(key === "ArrowDown")
    {
      e.preventDefault();
      if(historyIndex > 0)
      {
        let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 67 - cursorPositionLeft;
        historyIndex --;
        terminal.innerHTML = terminal.innerHTML.substr(0, lengthWithoutCursor - input.length) + history[historyIndex] + terminal.innerHTML.substring(lengthWithoutCursor);
        input = history[historyIndex];
        
      }
    }
    
    
    /*
    if(key === "ArrowLeft")
    {
      printCursor("black");
      cursorPositionLeft ++;
      printCursor("white");
    }
    
    */
    

    /*
    if(key === "ArrowLeft")
    {
      cursorPositionLeft ++;
      let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 67 - cursorPositionLeft;
      cursorCharacter = terminal.innerHTML.substr(lengthWithoutCursor - 1, 1);
      
      terminal.innerHTML = terminal.innerHTML.substring(0, lengthWithoutCursor - 1) + terminal.innerHTML.substring(lengthWithoutCursor + 1, lengthWithoutCursor + cursor.innerHTML.length + 65) //+ prevCharacter +  terminal.innerHTML.substr(terminal.innerHTML.length - cursorPositionLeft); //+ prevCharacter; //terminal.innerHTML.substr(lengthWithoutCursor - cursorPositionLeft + 2, 1);
      prevCharacter = cursorCharacter;
    }
    
    */
  
    
    if(key.length === 1)
    {
      addText(key);
      input += key;
      history[historyIndex] += key;
      terminal.scrollTop = terminal.scrollHeight;
      tabNum = 0;
    }
    
    else if(key === "Backspace")
    {
      if(input.length > 0)
      {
        let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 67 - cursorPositionLeft;
        terminal.innerHTML = terminal.innerHTML.substr(0, lengthWithoutCursor - 1) + terminal.innerHTML.substring(lengthWithoutCursor);
        input = input.substr(0, input.length - 1);
        if(historyIndex != -1)
        {
          history[historyIndex] = history[historyIndex].substr(0, history[historyIndex].length - 1);
        }
      }
    }
    else if(key === "Enter")
    {
      enterPress(input);
    }
  }
};

function runCommand(command)
{
  addText(command);
  input += command;
  history[historyIndex] += command;
  enterPress(command);
}

function enterPress(enterInput)
{
  if(enterInput === "clear")
      {
        let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 67 - cursorPositionLeft;
        terminal.innerHTML = "<b><font color='lime'>chrisclem</font>:~" + curDirStr + " $</b> " + terminal.innerHTML.substring(lengthWithoutCursor);
      }
      else
      {
        var command = enterInput.split(" ")[0];
        switch(command)
        {
        case '':
          newLine();
          break;
          
        case 'pwd':
          addText('<br>' + curDirStr);
          newLine();
          break;
          
        case 'help':
          help(enterInput.split(" ")[1]);
          break;
          
        case 'cd':
          cd(enterInput.split(" ")[1]);
          break;
        
        case 'ls':
          ls(enterInput.split(" ")[1]);
          break;

        case 'cat':
          cat(enterInput.split(" ").filter(e => e !== ""));
          break;
          
        case 'resume':
          resume();
          break;
          
        case 'projects':
          projects();
          break;
          
        case 'download':
          download();
          break;
          
        default:
          addText("<br>Unknown Command: " + enterInput.split(" ")[0]);
          newLine();
        }
      }
      if(historyIndex > 0)
        {
          history[0] = history[historyIndex];
        }
      if(history[historyIndex] !== "")
        if(history[0] !== "")
          history.unshift("");
      historyIndex = 0;
      input = "";
      terminal.scrollTop = terminal.scrollHeight;
      tabNum = 0;
}

function newLine()
{
  addText("<br><b><font color='lime'>chrisclem</font>:~" + curDirStr + " $</b> ");
}

function download()
{
    var link = document.createElement("a");
    link.setAttribute('download', 'resume_chris_clem.pdf');
    link.href = "resume_chris_clem.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    newLine();
}

function cd(arg)
{
  if(arg === undefined || arg === "")
  {
    currentDirectory = fileStructure;
    curDirStr = "";
  }
  else
  {
    var desiredDir = arg.split("/").filter(e => e !== ""); // "cd test/test1/test2/" = [ 'test', 'test1', 'test2' ]
      let callCd = traverseDir(desiredDir, currentDirectory, curDirStr);
      if(callCd === -1)
      {
        addText("<br>cd: " + arg + ": Not a directory");
      }
      else if(callCd === 1)
      {
       addText("<br>cd: " + arg + ": No such file or directory");
      }
      else
      {
        currentDirectory = callCd[0];
        curDirStr = callCd[1];
       }
  }
  newLine();
}

function cat(arg)
{
  arg = arg.splice(1, arg.length);
  arg.forEach(e => print(e));
  newLine();
}

function ls(inpt)
{
            if(inpt === undefined || inpt === "")
            {
              addText('<br>');
              Object.keys(currentDirectory).forEach(item => eval("if(isFolder(item, currentDirectory)){addText('<b><font color=\"DodgerBlue\">' + item + ' </font></b>');} else{addText(item + ' ');}"));
              newLine();
              return;
            }
            let lsDir = traverseDir(inpt.split("/").filter(e => e !== ""), currentDirectory, curDirStr);
            
            if(typeof lsDir[0] === 'object')
            {
              addText('<br>');
              
              Object.keys(lsDir[0]).forEach(item => eval("if(isFolder(item, lsDir[0])){addText('<b><font color=\"DodgerBlue\">' + item + ' </font></b>');} else{addText(item + ' ');}"));
            }
            
            else if(lsDir === -1 && inpt.substr(inpt.length - 1) !== '/')
            {
              addText('<br>' + inpt);
            }
            
            else if (lsDir === 1)
            {
              addText('<br>ls: cannot access '+ inpt + ': No such file or directory');
            }
            else
            {
              addText('<br>ls: cannot access '+ inpt + ': Not a directory');
            }
            newLine();
}

function help(arg)
{
  if(arg === '' || arg === undefined)
            commands.forEach(e => addText('<br>' + e[0]));
          else if(cmnd.includes(arg + ' '))
          {
            let index = cmnd.indexOf(arg + ' ');
            addText('<br>' + commands[index][0] + " - " + commands[index][1]);
          }
          else
          {
            addText('<br> help: no help topics match `' + arg + '\'. Try `help help\'.');
          }
          newLine();
}

// note: method of traversing to correct directory only works in linear file structure
function resume()
{
  newLine();
  if(curDirStr !== '/chrisclem')
    runCommand('cd ' + locateDirectory('/chrisclem', curDirStr));
  runCommand('cat contact');
  runCommand('cat education');
  runCommand('cat employment');
  runCommand('cat skills');
}

// note: method of traversing to correct directory only works in linear file structure
// note: now it works from anywhere! bc of locateDirectory function 😍
function projects()
{
  newLine();
  if(curDirStr !== '/chrisclem/projects')
    runCommand('cd ' + locateDirectory('/chrisclem/projects', curDirStr));
  runCommand('cat anti_league_discordbot ');
  runCommand('cat conways_game_of_life ');
  runCommand('cat valorant_hack ');
  runCommand('cat terminalresume ');
}

// ex. locateDirectory('/chrisclem/projects', '/chrisclem') returns 'projects/'
function locateDirectory(desiredDir, currentWorkingDirectoryStr)
{
  // the string of directory path being returned
  let dir;
  let desiredDirArr = desiredDir.split('/').filter(e => e !== "");
  let currDirArr = currentWorkingDirectoryStr.split('/').filter(e => e !== "");
  let lastCommonIndex = -1;
  // sets lastCommonIndex as the level of the lowest shared directory
  // ex. if desiredDirArr = ['home', 'folder1', 'folder2', 'subfolder3'] and currDirArr = ['home', 'folder1', 'jerry', 'crayola']
  // would return 1 as in index 1, 'folder1', their closest common folder
  desiredDirArr.forEach(function(e) {if(e === currDirArr[lastCommonIndex + 1]) lastCommonIndex++; else return;});
  // brings currentDir to common shared folder
  dir = '../'.repeat(currDirArr.length - lastCommonIndex - 1);
  // moves currentDir up filepath of desiredDir
  for(let i = lastCommonIndex + 1; i < desiredDirArr.length; i++)
  {
    dir += desiredDirArr[i] + '/';
  }
  // returns filepath necessary to traverse from currentDirectory to desiredDirectory
  return dir;
}

/*
function printCursor(color)
{
  if(cursorPositionLeft === 0)
  {
    terminal.textContent += "<font style='background-color: " + color + "'>&nbsp;</font>";
    return;
  }
  let index = terminal.textContent.length - cursorPositionLeft;
  terminal.textContent = terminal.textContent.substring(0, index-1) + "<font style='background-color: " + color + "'>" + terminal.textContent.substring(index, index+1) + "</font>" + terminal.textContent.substring(index+1);
}

*/

function addText(text)
{
  let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 67 - cursorPositionLeft;
  terminal.innerHTML = terminal.innerHTML.substring(0, lengthWithoutCursor) + text + terminal.innerHTML.substring(lengthWithoutCursor);
}

// prints file to terminal
function print(inpt)
{
  let dirArr = inpt.split("/").filter(e => e !== "");
        
  let catDir = traverseDir(dirArr, currentDirectory, curDirStr);
  
  if(catDir === -1)
  {
    let fileName = dirArr[dirArr.length - 1];
    dirArr.splice(dirArr.length - 1);
    eval("addText('<br>' + traverseDir(dirArr, currentDirectory, curDirStr)[0]." + fileName + ')');
  }
  else if(catDir === 1)
  {
    addText('<br>cat: ' + inpt + ': No such file or directory');
   }
  else
  {
    addText('<br>cat: ' + inpt + ': Is a directory');
  }
}

// takes array of strings and returns a string of first shared consecutive characters
// ex. stringMatch(['hello', 'help!', 'heliograph']) would return 'hel'
function stringMatch( strings, index = 0)
{
  if (strings.length === 1) return strings[0];
  for(let i = 0; i < strings.length - 1; i++)
    if(strings[i].substring(0, index + 1) !== strings[i + 1].substring(0, index + 1))
      return strings[i].substring(0, index);
  return stringMatch(strings, index + 1);
}



function checkTab(dir, tabInput, dirContent)
{
  let match = [];
  dirContent.forEach(function(e) {if(e.indexOf(tabInput) === 0) match.push(e)});
  
  let commonLetters = stringMatch(match);
  let fill = '';
  if(commonLetters !== '')
  {
    fill = commonLetters.substring(tabInput.length);
    addText(fill);
    input += fill;
    history[historyIndex] += fill;
  }
  if(fill === '')
  {
    tabNum++;
    if(tabNum > 1)
    {
      addText('<br>');
      match.forEach(e => addText(e + ' '));
      addText('<br><b><font color="lime">chrisclem</font>:~' + curDirStr + ' $</b> ' + input);
    }
  }
}

function isFolder(e, dir)
{
  return eval("typeof dir." + e + " === 'object'");
}



function traverseDir(desiredDir, dir, dirStr)
{
  for(let i = 0; i < desiredDir.length; i++)
  {
    let dirCheck = desiredDir[i];
    if(dirCheck in dir && isFolder(dirCheck, dir))
          {
            eval("dir = dir." + dirCheck);
            dirStr += "/" + dirCheck;
          }
    else if(dirCheck === '..')
          {
            dirStr = dirStr.substr(0, dirStr.lastIndexOf("/"));
            eval("dir = fileStructure" + dirStr.split("/").join("."));
          }
    // Not a directory
    else if(dirCheck in dir && i === desiredDir.length - 1)
    {
      return -1;
    }
    
    // No such file or directory
    else if(dirCheck !== '.')
    {
      return 1;
    }
  }
  return [dir, dirStr];
}


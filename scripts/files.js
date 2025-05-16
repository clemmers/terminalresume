const fileStructure = 
{
    chrisclem : 
    {
      contact: '<font style="font-size: 6px"><br></font><b><a href="mailto: chris@chrisclem.dev"><font style="line-height: 0px">&#128231;</font> chris@chrisclem.dev</a><br>'
              // add back later prolly its not exactly invisible + '<font style="font-size: 6px"><br></font><font style="line-height: 0px">&#128222;</font> (818)497-1045<br><font style="font-size: 6px"><br></font>'
                + '<a href="https://github.com/clemmers"><img src="github-mark-white.svg" alt="Github:" height="' + document.getElementById("terminal").style.fontSize + '" width="relative"> clemmers</a><font style="font-size: 6px"><br></font>'
                + '<a href="https://www.linkedin.com/in/chris-clem/"><img src="linkedin-logo.svg" alt="LinkedIn:" height="' + document.getElementById("terminal").style.fontSize + '" width="relative"> Chris Clem</a></b><font style="font-size: 6px"><br></font>',
      education: '<b class="dirColor"><a target="_blank" href="https://pasadena.edu/">Pasadena City College</a> (August 2024 to Current)</b>'
                + '<br>Computer Science Major',
      employment: '<b>Computer Science Tutor<br><a target="_blank" href="https://goo.gl/maps/HQi3KsBrJepPHcN66"><font style="line-height: 0px">&#128205</font> Glendale, CA</a></b>'
                + '<br>Sole Proprietor / Tutor (September 2024 to Current)<br>'
                + 'I work closely with individuals to identify weak areas in their understanding of the computer science landscape, and address them through one-on-one tutoring.<br>',
      projects: 
      {
        // user projects
      },
      skills: '- Fast Learner<br>- Complex Problem Solving<br>- Advanced Analytical Thinking<br>'
              + '- Teamwork<br>- Agile Development Methodology<br>'
              + '- Code Analysis and Development<br>- Programing Languages I\'ve used: C++, Java, JavaScript, Python, Rust'
    },
    test :
    {
      test1 :
      {
        test2 : 'test!!',
        test3 : 'testlolol'
      },
      test4: 
      {
        test5:
        {
          test6:
          {
            test7:
            {
              test8: 'lol'
            }
          }
        }
      }
    }
};

var request = new XMLHttpRequest();

request.open('GET', 'https://api.github.com/users/clemmers/repos', true)

request.onload = function () {
  var data = JSON.parse(this.response);
  data.forEach(function(e){
    
    let description = "<a target='_blank' href='" + e.html_url + "'><font style='line-height: 0px'>&#128279;</font><b>" + e.full_name + "</b></a><br>"
                      + (e.description ?? "click the link to learn more about this project!")
                      + (e.language === null ? "" : "<br>Made in " + e.language)
                      + "<br><font style='line-height: 0px'>&#11088;</font>: " + e.stargazers_count
                      + "<br><font style='line-height: 0px'>&#128064;</font>: " + e.watchers_count;
    
    fileStructure["chrisclem"]["projects"][`${e.name}`] = description;
    
    // lol!! this line of code is trash \/   \/ LOL!!
    //eval('Object.assign(fileStructure.chrisclem.projects, {"' + e.name.replace(/-/g, '_') + '" : "' + description + '"});');
    
  });
  // calls in resume.html context
  finishedAPICall();
};

request.send();

const whoisChris = `<br><font style="word-break: normal;">Hey, I'm Chris! 👋 I'm a student at Pasadena City College who's interested in everything Computer
          Science related. I enjoy learning about how things work and expanding my knowledge through hands-on
          experimenting and tinkering. You can check out some of my favorite projects through my <a href="https://www.linkedin.com/in/chris-clem/">LinkedIn</a>, or explore all of them on this website!</font>`;
          

/*
// run this to see how many documents are being accessed

function download()
{
  let test = document?.getElementById("pdf");
  console.log("print");
}
  */

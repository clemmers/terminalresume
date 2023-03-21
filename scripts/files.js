const fileStructure = 
{
    chrisclem : 
    {
      contact: '<font style="font-size: 6px"><br></font><b><a href="mailto: chrisclem244@yahoo.com"><font style="font-size: 12px; line-height: 0px">&#128231;</font> chrisclem244@yahoo.com</a><br>'
                + '<font style="font-size: 6px"><br></font><font style="font-size: 12px; line-height: 0px">&#128222;</font> (818)497-1045<br><font style="font-size: 6px"><br></font>'
                + '<a href="https://github.com/clemmers"><img src="github-mark-white.svg" alt="Github:" height="12px" width="relative"> clemmers</a></b><font style="font-size: 6px"><br></font>',
      education: '<b class="dirColor"><a target="_blank" href="https://goo.gl/maps/C6VW1p2zdhyGBFXc8">Crescenta Valley High School</a> (August 2020 to Current)</b>'
                + '<br>info about my academic achievements<br>interesting info',
      employment: '<b>Mitch Clem Management<br><a target="_blank" href="https://goo.gl/maps/HQi3KsBrJepPHcN66"><font style="font-size: 12px; line-height: 0px">&#128205</font> Glendale, CA</a></b>'
                + '<br>Social Media Presence Manager (March 2020 to Current)<br> Improved page content,'
                + ' keyword releveancy, and branding to achieve search engine optimization goals<br>'
                + ' Discussed site requirements with client to produce actionable development plans and budgets',
      projects: 
      {
        // user projects
      },
      skills: '- Fast Learner<br>- Complex Problem Solving<br>- Advanced Analytical Thinking<br>'
              + '- Teamwork<br>- Agile Development Methodology<br>- Unix Shell<br>'
              + '- Code Analysis and Development<br>- Programing Languages: Java, JavaScript, Python'
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
    
    let description = "<a target='_blank' href='" + e.html_url + "'><font style='font-size: 12px; line-height: 0px'>&#128279;</font><b>" + e.full_name + "</b></a><br>"
                      + (e.description ?? "click the link to learn more about this project!")
                      + (e.language === null ? "" : "<br>Made in " + e.language)
                      + "<br><font style='font-size: 12px; line-height: 0px'>&#11088;</font>: " + e.stargazers_count
                      + "<br><font style='font-size: 12px; line-height: 0px'>&#128064;</font>: " + e.watchers_count;
    
    fileStructure["chrisclem"]["projects"][`${e.name}`] = description;
    
    // lol!! this line of code is trash \/   \/ LOL!!
    //eval('Object.assign(fileStructure.chrisclem.projects, {"' + e.name.replace(/-/g, '_') + '" : "' + description + '"});');
    
  });
  console.log(fileStructure);
};

request.send();

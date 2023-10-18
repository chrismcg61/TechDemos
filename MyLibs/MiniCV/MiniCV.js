var birthDay = 1983 + 310/365
var birthDaySinceEpoch = birthDay - 1970
var nowY = Date.now()/(1000*60*60*24*365)
var age = nowY - birthDaySinceEpoch
// console.log(age)
// var txt = " ";
// for ( var ii=0; ii<40; ii++ ) txt+="A"
var experiences = [ 
  {
    title:"McGARRY",titleExt:"(Teaching & Co)",
    display:"none",
    // backCol:"hsla(20, 80%, 70%, 0.9)",
    duration:[1],
    subLines:[
      {title:"▫Info1",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫Info1",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
  {
    title:"McGARRY",titleExt:"(WebApp & Co)",
    // backCol:"hsla(70, 80%, 70%, 0.9)",
    duration:[1,2],
    subSkills:["JS","C/C++/C#","WebGL","GLSL",],
    subLines:[
      {title:"▫Product-Owner",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫2D/3D WebApp Architecture/Prototyping",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫Gamification / Ergonomy",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
  {
    title:"McGARRY",titleExt:"(GameDev)",
    // backCol:"hsla(120, 80%, 70%, 0.9)",
    duration:[1,2],
    subSkills:["JS","C/C++/C#","WebGL","GLSL",],
    subLines:[
      {title:"▫Product-Owner",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫GameDev Expert",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫AI/Machine-Learning Expert",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫GPU/Parallel Prog Expert",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
  {
    title:"Orange/Bouygues/Cisco",titleExt:"(TV-STB Middleware)",
    // alternateTitle:"Alternate Title 1",
    // backCol:"hsla(170, 80%, 70%, 0.9)",
    duration:[1,2,3,4,5],
    subSkills:["JS","C/C++/C#","WebGL","GLSL",],
    subLines:[
      {title:"▫Tech-Expert",titleExt:"(ScrumMaster)",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫Tools Expert",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫Middleware Expert",titleExt:"(TV-STB MW)",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫Embedded 2D/3D WebApp Dev",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
  {
    title:"Technicolor / SagemCom / Nagra",titleExt:"(Network/VoIP/Secu)",
    display:"none",
    // backCol:"hsla(220, 80%, 70%, 0.9)",
    duration:[1,],
    subLines:[
      {title:"▫Tools Dev",titleExt:"()",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"()",titleExt:"()",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
  {
    title:"NeoPost / Parrot",titleExt:"(Embedded/TestBench)",
    display:"none",
    // backCol:"hsla(220, 80%, 70%, 0.9)",
    duration:[1,],
    subLines:[
      {title:"▫Tools Dev",titleExt:"()",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"()",titleExt:"()",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
  {
    title:"Ubisoft (Phoenix & ELB)",titleExt:"(Console GameDev)",
    // alternateTitle:"Alternate Title 1",
    // backCol:"hsla(270, 80%, 70%, 0.9)",
    duration:[1,2,3],
    subSkills:["JS","C/C++/C#","WebGL","GLSL",],
    subLines:[
      {title:"▫Team-Lead / Tech-Expert",titleExt:"(ScrumMaster)",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫Lead Gameplay Programmer",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫Middleware Expert",titleExt:"(Game-Engine)",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫Tools Expert",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"▫3D-Editor Expert",titleExt:"",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
  {
    title:"Dassault Aviation",titleExt:"(Embedded/TestBench)",
    // alternateTitle:"Alternate Title 1",
    // backCol:"hsla(270, 80%, 70%, 0.9)",
    duration:[1,],
    display:"none",
    subSkills:["JS","C/C++/C#","WebGL","GLSL",],
    subLines:[
      {title:"()",titleExt:"()",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
  {
    title:"Holomatix",titleExt:"",
    // alternateTitle:"Alternate Title 1",
    // backCol:"hsla(270, 80%, 70%, 0.9)",
    duration:[1,],
    display:"none",
    subSkills:["JS","C/C++/C#","WebGL","GLSL",],
    subLines:[
      {title:"()",titleExt:"()",subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
];
//
var skills = [ 
  {
    title:"Prog Languages",titleExt:"",
    subLines:[      
      {title:"",titleExt:"",titleSkill:"JS, C/C++/C#, Lua",rating:[1,2,3,4,5],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"WebGL / GLSL",rating:[1,2,3,4,5],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},      
      {title:"",titleExt:"",titleSkill:"OpenGL/DX",rating:[1,2,3,4],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"WebCL",titleSkillExt:"(OpenCL/Cuda)",rating:[1,2,3,4],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"HTML/CSS3D, AngularJS",rating:[1,2,3,4],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"React/Vue/NodeJS",rating:[1,2,3],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"TypeScript, Python, Dart",rating:[1,2,3],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"Assembly, Bash, UML",rating:[1,2],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"Java, SQL​",rating:[1],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
  {
    title:"Tools / Environment",titleExt:"",
    subLines:[
      {title:"",titleExt:"",titleSkill:"Windows / Linux",rating:[1,2,3,4],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"Unity3D",titleSkillExt:"(Unreal)",rating:[1,2,3,4],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"Git/SVN & Co",rating:[1,2,3,4],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"VStudio/Jira/BugZilla",rating:[1,2,3,4],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"VMWare / VirtualBox",rating:[1,2,3,4],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"Android Studio",rating:[1],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
  {
    title:"Languages",titleExt:"",
    subLines:[
      {title:"",titleExt:"",titleSkill:"French/English",rating:[1,2,3,4,5],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
      {title:"",titleExt:"",titleSkill:"German/Spanish",rating:[1,2,3],subLines:[ {title:"ExtraInfo1",},{title:"ExtraInfo2",} ]},
    ]
  },
];

// Auto-Fill "IDs" :
autoFillIds(experiences)
experiences.id = 0
autoFillIds(skills)
skills.id = 1
function autoFillIds(_obj){
  for ( var ii=0; ii<_obj.length; ii++ ) {
    var title = _obj[ii]
    title.id = ii
    for ( var jj=0; jj<title.subLines.length; jj++ ) {
      title.subLines[jj].id = jj
    }
  }
}
//
var startDate0 = 2006
var startDate_ForXp = 2008
var dynStartDate = startDate0
autoFillDates( experiences )
function autoFillDates(_obj){
  for ( var ii=_obj.length-1; ii>=0; ii-- ) {
    _obj[ii].startDate = dynStartDate    
    dynStartDate += _obj[ii].duration.length;
  }
}

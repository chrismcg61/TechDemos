var birthDay = 1983 + 310/365
var birthDaySinceEpoch = birthDay - 1970
var nowY = Date.now()/(1000*60*60*24*365)
var age = nowY - birthDaySinceEpoch
// console.log(age)
// var txt = " ";
// for ( var ii=0; ii<40; ii++ ) txt+="A"
var experiences = [ 
  {
    title:"McGARRY (Teaching/Caregiver)",titleExt:"",
    display:"none",
    // backCol:"hsla(20, 80%, 70%, 0.9)",
    duration:[1],
    subLines:[
      {title:"",titleExt:"",subLines:[]},
    ]
  },
  {
    title:"McGARRY (WebApp & Co)",titleExt:"",
    // backCol:"hsla(70, 80%, 70%, 0.9)",
    duration:[1,2],
    subSkills:["JS","WebGL","AngularJS"],
    subLines:[
      {title:"▫Tech-expert / Product-Owner",titleExt:"",subLines:[]},
      {title:"▫2D/3D WebApp Architecture/Prototyping",titleExt:"",subLines:[]},
      {title:"▫Gamification / Perf / Ergonomy",titleExt:"",subLines:[]},
    ]
  },
  {
    title:"McGARRY (GameDev)",titleExt:"",
    // backCol:"hsla(120, 80%, 70%, 0.9)",
    duration:[1,2],
    subSkills:["JS","C#","WebGL","GLSL","Unity3D"],
    subLines:[
      {title:"▫Tech-expert / Product-Owner",titleExt:"",subLines:[]},
      {title:"▫GameDev Expert",titleExt:"",subLines:[ {title:"Unity3D/WebGL Game Prototypes"},{title:"Procedural Generation"} ]},
      {title:"▫AI/Machine-Learning Expert",titleExt:"",subLines:[ {title:"Game Bots AI"},{title:"Adaptive AI"},{title:"Pathfinding"},{title:"Custom Machine-Learning Lib (Multi-Lang, Trial&Error)"} ]},
      {title:"▫GPU/Parallel Prog Expert",titleExt:"",subLines:[ {title:"Shaders"},{title:"GPU-Accelerated Physics"},{title:"GPU-Accelerated Machine-Learning"} ]},
    ]
  },
  {
    title:"Orange / Bouygues / Cisco",titleExt:"(TV-STB Middleware)",
    // alternateTitle:"Alternate Title 1",
    // backCol:"hsla(170, 80%, 70%, 0.9)",
    duration:[1,2,3,4,5],
    subSkills:["JS","C/C++","WebGL","Dart"],
    subLines:[
      {title:"▫Tech-Expert",titleExt:"(ScrumMaster)",subLines:[]},
      {title:"▫Tools Expert",titleExt:"",subLines:[{title:"Perf/Quality Monitoring"},{title:"StressTest"},{title:"AutoDocs"}]},
      {title:"▫Middleware Expert",titleExt:"(TV-STB MW)",subLines:[ {title:"TV-STB Features (Scheduling,Recording,Timeshift...)"},{title:"STB Drivers (Disk,GPU,TV...)"} ]},
      {title:"▫Embedded 2D/3D WebApp Dev",titleExt:"",subLines:[{title:"Middleware/DataServer Compliance"},{title:"Ergonomy"},{title:"Mem/CPU/GPU Perf"}]},
    ]
  },
  {
    title:"Technicolor/SagemCom/Nagra",titleExt:"(Network/VoIP/Secu)",
    display:"none",
    // backCol:"hsla(220, 80%, 70%, 0.9)",
    duration:[1,],
    subLines:[
      {title:"",titleExt:"",subLines:[]},
    ]
  },
  {
    title:"NeoPost / Parrot",titleExt:"(Embedded/TestBench)",
    display:"none",
    // backCol:"hsla(220, 80%, 70%, 0.9)",
    duration:[1,],
    subLines:[
      {title:"Test-Driven Dev / UTs",titleExt:"",subLines:[]},
    ]
  },
  {
    title:"Ubisoft (Phoenix & ELB)",titleExt:"(Console GameDev)",
    // alternateTitle:"Alternate Title 1",
    // backCol:"hsla(270, 80%, 70%, 0.9)",
    duration:[1,2,3],
    subSkills:["JS","C/C++/C#","Lua","OpenGL/DX"],
    subLines:[
      {title:"▫Team-Lead / Tech-Expert",titleExt:"(ScrumMaster)",subLines:[]},
      {title:"▫Lead Gameplay Programmer",titleExt:"",subLines:[ {title:"Game Bots AI"},{title:"Cross-Platform Controls"},{title:"Cross-Platform UI/Menus"} ]},
      {title:"▫Middleware Expert",titleExt:"(Game-Engine)",subLines:[ {title:"Gameplay Features"},{title:"2D/3D Features"},{title:"Consoles Drivers (Disk,Audio,GPU,Controls...)"} ]},
      {title:"▫Tools Expert",titleExt:"",subLines:[ {title:"Feature-Tests"},{title:"SD/HD Texture Format Validation"},{title:"Distributed BigFile Compilation/Baking"} ]},
      {title:"▫3D-Editor Expert",titleExt:"",subLines:[ {title:"Design/Script Window"},{title:"3D Features Painting"},{title:"Animation Customization"} ]},
    ]
  },
  {
    title:"Dassault Aviation",titleExt:"(Embedded/TestBench)",
    // alternateTitle:"Alternate Title 1",
    // backCol:"hsla(270, 80%, 70%, 0.9)",
    duration:[1,],
    display:"none",
    // subSkills:["Java"],
    subLines:[
      {title:"",titleExt:"",subLines:[]},
    ]
  },
  {
    title:"Holomatix",titleExt:"(London Tech Internship)",
    // alternateTitle:"Alternate Title 1",
    // backCol:"hsla(270, 80%, 70%, 0.9)",
    duration:[1,],
    display:"none",
    subLines:[
      {title:"",titleExt:"",subLines:[]},
    ]
  },
];
//
var skills = [ 
  {
    title:"Prog Languages",titleExt:"",
    highlightClass:"skillHilight",
    subLines:[      
      {title:"",titleExt:"",titleSkill:"JS, C/C++/C#, Lua",rating:[1,2,3,4,5],subLines:[]},
      {title:"",titleExt:"",titleSkill:"WebGL / GLSL",rating:[1,2,3,4,5],subLines:[]},      
      {title:"",titleExt:"",titleSkill:"OpenGL/DX",rating:[1,2,3,4],subLines:[]},
      {title:"",titleExt:"",titleSkill:"WebCL",titleSkillExt:"(OpenCL/Cuda)",rating:[1,2,3,4],subLines:[]},
      {title:"",titleExt:"",titleSkill:"HTML/CSS3D, AngularJS",rating:[1,2,3,4],subLines:[]},
      {title:"",titleExt:"",titleSkill:"React/Vue/NodeJS",rating:[1,2,3],subLines:[]},
      {title:"",titleExt:"",titleSkill:"TypeScript, Python, Dart",rating:[1,2,3],subLines:[]},
      {title:"",titleExt:"",titleSkill:"Assembly, Bash, UML",rating:[1,2],subLines:[{title:"Java,SQL"}]},
      // {title:"",titleExt:"",titleSkill:"Java, SQL",rating:[1],subLines:[]},
    ]
  },
  {
    title:"Tools / Environment",titleExt:"",
    highlightClass:"skillHilight",
    subLines:[
      {title:"",titleExt:"",titleSkill:"Windows / Linux",rating:[1,2,3,4],subLines:[]},
      {title:"",titleExt:"",titleSkill:"Unity3D",titleSkillExt:"(Unreal)",rating:[1,2,3,4],subLines:[]},
      {title:"",titleExt:"",titleSkill:"Git/SVN & Co",rating:[1,2,3,4],subLines:[]},
      {title:"",titleExt:"",titleSkill:"VStudio/Jira/BugZilla",rating:[1,2,3,4],subLines:[]},
      {title:"",titleExt:"",titleSkill:"VMWare / VirtualBox",rating:[1,2,3,4],subLines:[{title:"Android Studio"}]},
      // {title:"",titleExt:"",titleSkill:"Android Studio",rating:[1],subLines:[]},
    ]
  },
  {
    title:"Languages",titleExt:"",
    highlightClass:"skillHilight",
    subLines:[
      {title:"",titleExt:"",titleSkill:"French/English",rating:[1,2,3,4,5],subLines:[]},
      {title:"",titleExt:"",titleSkill:"German/Spanish",rating:[1,2,3],subLines:[]},
      {title:"",titleExt:"",titleSkill:"Chinese",rating:[1,],subLines:[]},
    ]
  },
  {
    title:"Management",titleExt:"",
    display:"none",
    subLines:[      
      {title:"",titleExt:"",titleSkill:"AGILE Proj/Team Mgt",titleSkillExt:"",rating:[1,2,3,4,5],subLines:[]},
      {title:"",titleExt:"",titleSkill:"ScrumMaster",titleSkillExt:"(Product-Owner)",rating:[1,2,3,4],subLines:[]},
      {title:"",titleExt:"",titleSkill:"Pair/XP Prog",titleSkillExt:"",rating:[1,2,3,4],subLines:[]},
      {title:"",titleExt:"",titleSkill:"Mentoring",titleSkillExt:"",rating:[1,2,3,4],subLines:[]},
    ]
  },
  {
    title:"Code Management",titleExt:"",
    display:"none",
    subLines:[      
      {title:"",titleExt:"",titleSkill:"Perf/Quality Monitoring",titleSkillExt:"",rating:[1,2,3,4,5],subLines:[]},
      {title:"",titleExt:"",titleSkill:"RetroEngineering",titleSkillExt:"",rating:[1,2,3,4,5],subLines:[]},
      {title:"",titleExt:"",titleSkill:"API/Lib Specs",titleSkillExt:"",rating:[1,2,3,4],subLines:[]},
      {title:"",titleExt:"",titleSkill:"Unit Testing",titleSkillExt:"",rating:[1,2,3,4],subLines:[]},
    ]
  },
  {
    title:"Other Skills",titleExt:"",
    subLines:[
      {title:"",titleExt:"",titleSkill:"Tech-Survey, Game/DevTest",rating:[1,2,3,4],subLines:[]},
      {title:"",titleExt:"",titleSkill:"Teacher, Translator",rating:[1,2,3],subLines:[]},
      {title:"",titleExt:"",titleSkill:"Family Caregiver",rating:[1,2,3],subLines:[]},
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

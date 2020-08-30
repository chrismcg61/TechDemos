/*** PERS DATA ***/
var rootData_Pers = {
  subDivs:[
    {
      title:{txt:"Chris McGARRY", classes:["maintTitle"]},
      // classes:["maintTitle"],
    },
    {
      tagDiv:{title:"", tags:[
        "FR",
        small("Age: ")+getAge(1983+310/365),
        small("XP: ")+getAge(2008+1/365),
        small("Visionary-Mediator-Entrepreneur"),
      ]},
    },
    {
      tagDiv:{title:"✎🎓 Degrees: ", tags:[
        "IT-Engineer",        
        small("Elec-Robotics"),
        small("Maths"),
      ]},
      subDivs:[
        {
          hidden:true,
          subDivs:[                        
            {  
              tagDiv:{title:"BAFA "+small("(Summer Camp Animator)"), tags:[]},
            },
            {  
              tagDiv:{title:"BIA "+small("(Aircraft Pilot)"), tags:[]},
            },
            {  
              tagDiv:{title:"Security Accreditations "+small("(Secret & Elec)"), tags:[]},
            },
          ],
        },
      ],
    },
    {
      tagDiv:{title:"✈🌍 Mobility: ", tags:[
        "Global "+small("(HiTech-Cities)"),
      ]},
      subDivs:[
        {
          hidden:true,
          subDivs:[                        
            {  
              tagDiv:{title:"", tags:["FRANCE", "EU-West", "NA"]},
            },
          ],
        },
      ],
    },    
    {
      tagDiv:{title:"✉📞 Full-WebCV: ", tags:[
        "chrismcg61.wixsite.com/home"
      ]},
      subDivs:[
        {
          hidden:true,
          subDivs:[                        
            {  
              tagDiv:{title:"Mail : mail@fai.com", tags:[]},
              subDivs:[
                {
                  hidden:true,
                  subDivs:[                        
                    {  
                      tagDiv:{title:"Tel : 0123456789", tags:[]},
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },    
    {
      title:{txt:"Contracts:", classes:["title2"]},
      // classes:["title"],
      tagDiv:{title:"", tags:[
        "3-Months+",
        "FullTime", "HalfTime"+small("(Flex)"),         
      ]},   
    },
    {
      tagDiv:{title:"", tags:[
         "Mobility", "Flex-Time", "Agile", "TeleWork", 
      ]},
      subDivs:[
        {
          hidden:true,
          subDivs:[ 
            {
              tagDiv:{title:"Overtime++ : ", tags:[
                "80-140h./2W", "Telework++",
              ]},
            },
			{
              tagDiv:{title:"Proj : ", tags:[
                "Guidelines", "Strong Scope",
              ]},
            },
            
            
          ],
        },
      ],    
    },   
  ],
};



/*** JOB TITLES ***/
var rootData_JobTitles = {
  subDivs:[
    {
      // classes:["separateDiv"],
      subDivs:[
        {
          title:{txt:"Senior Versatile Programmer", classes:["maintTitle"]},
        },
        {
          tagDiv:{title:"", tags:[
            "Tech Expert",
            "Team Lead",
            small("Scrum Master"),
          ]},
        },
        {
          tagDiv:{title:"", tags:[
            "Junior Proj Manager",
            small("Product Owner"),
          ]},
        },
        {
          tagDiv:{title:"Junior Teacher : ", tags:[            
            "Prog",
            "Maths/Physics",
            "FR./ENG"
          ]},
        },  
      ],
    },    
  ],
};




/*** LANG & HOBBIES ***/
var langData = {
  subDivs:[
    {
      subDivs:[
        {
          title:{txt:"Languages", classes:["maintTitle"]},
        },
        {
          rating:95,    
          tagDiv:{title:"English / French", tags:[ ]},
        },
        {
          rating:80,    
          tagDiv:{title:"German", tags:[ ]},
        },
        {
          rating:70,    
          tagDiv:{title:"Spanish", tags:[ ]},
        },
        {
          rating:50,    
          tagDiv:{title:"Chinese", tags:[ ]},
        },        
      ],
    },    
  ]
};
var hobbiesTechData = {
  subDivs:[
    // {
      // subDivs:[
        {
          title:{txt:"Hobbies [Tech]", classes:["maintTitle"]},
        },
        {
          //rating:95,    
          tagDiv:{title:"Tech Research "+small("(Next-Gen Prog/Mgt)"), tags:[ ]},
        },
        {
          tagDiv:{title:"Gaming & Dev/Test Community", tags:[ ]},
        },
        {
          tagDiv:{title:"Documentaries", tags:[ ]},
        },
        
        
        {
          title:{txt:"Hobbies [Other]", classes:["maintTitle"]},
        },
        {
          tagDiv:{title:"Music", tags:[ ]},
        },
        {
          tagDiv:{title:"Sports", tags:[ ]},
        },
        {
          tagDiv:{title:"Culture/Arts", tags:[ ]},
        },
        
        
      // ],
    // },    
  ],
};
var miniJobsData = {
  subDivs:[
    // {
      // subDivs:[
        {
          title:{txt:"MiniJobs & Volunteer", classes:["maintTitle"]},
        },
        
        {
          tagDiv:{title:"Tech "+small("(Computer-ER, Teaching, Translate)"), tags:[]},
          subDivs:[
            {
              hidden:true,
              subDivs:[                        
                {  
                  tagDiv:{title:"Computer Install/Repair", tags:[]},
                },
                {  
                  tagDiv:{title:"Teaching (Maths, Prog)", tags:[]},
                },                
                {  
                  tagDiv:{title:"Translator (ENG/FR)", tags:[]},
                },
                
              ],
            },
          ],
        },
        
        {
          tagDiv:{title:"Other "+small("(Animator, Elder-ER, Event-Org)"), tags:[]},
          subDivs:[
            {
              hidden:true,
              subDivs:[                        
                {  
                  tagDiv:{title:"Teen Summer Camp Animator", tags:[]},
                },
                {  
                  tagDiv:{title:"Elder/Dependent People Assist", tags:[]},
                },                
                {  
                  tagDiv:{title:"Event Org°", tags:[]},
                },
                
              ],
            },
          ],
        },
        
      // ],
    // },    
  ],
};



/*** FAV & LIVE PROJs ***/
var liveProjsData = {
	subDivs:[
    // {
      // subDivs:[
        {
          title:{txt:"Projects[Live]", classes:["maintTitle"]},
        },
        {
          tagDiv:{title:"AI++", tags:[ ]},
        },
        {
          tagDiv:{title:"Mgt++", tags:[ ]},
        },                
      // ],
    // },    
  ]
}
var favProjsData = {
	subDivs:[
		{
		  title:{txt:"Projects of Interest", classes:["maintTitle"]},
		},
		
		{
		  tagDiv:{title:"Productivity", tags:[ ],  },
		  subRatings:{title:"", S:85},
		  subDivs:[
			{
			  hidden:true,
			  subDivs:[ 
				{
				  tagDiv:{title:"Workload : ", tags:[ "Continuity(Non-Work Days)", "HiWorkload Mgt"]},
				},
				{
				  tagDiv:{title:"Tasks : ", tags:[ "Automation(LoTech)", "Bonus Dev Tasks"]},
				},
				{
				  tagDiv:{title:"Tools : ", tags:[ "Async CoWorking", "Metrics(Prod+Qual)"]},
				},
				{
				  tagDiv:{title:"Mgt : ", tags:[ "Lo-ChangeReq", "Release Freq"]},
				},
				
			  ],
			},
		  ],
		}, 
		{
		  tagDiv:{title:"Quality", tags:[ ]},
		  subDivs:[
			{
			  hidden:true,
			  subDivs:[ 
				{
				  tagDiv:{title:"Product : ", tags:[ "Value Features", "ROI(Tech...)"]},
				},
				{
				  tagDiv:{title:"Code : ", tags:[ "Review", "Auto-Analysis" ]},
				},				
				
			  ],
			},
		  ],
		}, 
		{
		  tagDiv:{title:"Team", tags:[ ]},
		  subDivs:[
			{
			  hidden:true,
			  subDivs:[ 
				{
				  tagDiv:{title:"Environment : ", tags:[ "CoWorking Days++", "CoWorking Offices++" ]},
				},
				{
				  tagDiv:{title:"Training : ", tags:[ "Daily Mentoring", "Training Season" ]},
				},							
				
			  ],
			},
		  ],
		},
		{
		  tagDiv:{title:"Agile++", tags:[ ]},
		  subDivs:[
			{
			  hidden:true,
			  subDivs:[ 
				{
				  tagDiv:{title:"Strong Struct : ", tags:[ "Strong Mgt Duo (PO+SM)", "Closed Sprint" ]},
				},				
				{
				  tagDiv:{title:"Sprint++ : ", tags:[ "Sprint Review", "PairProg(COmmits)" ]},
				},															
				
			  ],
			},
		  ],
		},
		{
		  tagDiv:{title:"Risk Mgt", tags:[ ]},
		  subDivs:[
			{
			  hidden:true,
			  subDivs:[ 
				{
				  tagDiv:{title:"Prevention", tags:[  ]},
				},
				{
				  tagDiv:{title:"Actions : ", tags:[ "Lo-Workload Mgt", "Issue Escalat°", "Scope Correct°" ]},
				},	
																			
				
			  ],
			},
		  ],
		},
		
		
		
		
		
		
  ]
}



/*** SKILLS ***/
var techList = [];
addTableTag( techList, "TOOLS", {
    rating:95,
    tagDiv:{title:"Tools", tags:[ ]},
});
addTableTag( techList, "LANG", {
    rating:85,
    tagDiv:{title:"Prog-Lang.", tags:[ ]},
});
addTableTag( techList, "LIBS", {
    rating:85,
    tagDiv:{title:"Libs", tags:[ ]},
});
//
var aiSkills = [];
addTableTag( aiSkills, "GAME", {
    rating:85,
    tagDiv:{title:"AI-Game", tags:[ ]},
  });
addTableTag( aiSkills, "FLEX", {
    rating:85,
    tagDiv:{title:"AI-Flex", tags:[ ]},  
  });
//
var webAppSkills = [];
addTableTag( webAppSkills, "STB", {
    rating:85,
    tagDiv:{title:"WebApp-STB", tags:[ ]},
  });
addTableTag( webAppSkills, "Std", {
    rating:85,
    tagDiv:{title:"WebApp-Std", tags:[ ]},  
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"WebApp-Std1", tags:[ ]},
			},
			{
				rating:85,
				tagDiv:{title:"WebApp-Std2", tags:[ ]},
			},
		  ],
		},
	],
  });
//
var techSkills = [];
addTableTag( techSkills, "WebAPP",  {
  rating:85,
  tagDiv:{title:"WebApp", tags:[ ]},
  subDivs:[
    {
      hidden:true,
      subDivs:webAppSkills,
    },
  ],
  
});
addTableTag( techSkills, "GameDev", {
    rating:85,
    tagDiv:{title:"GameDev/Design", tags:[ ]},
  });
addTableTag( techSkills, "MW", {
    rating:85,
    tagDiv:{title:"MW/Tools", tags:[ ]},
  });
addTableTag( techSkills, "3D", {
    rating:85,
    tagDiv:{title:"3D/GPU", tags:[ ]},
  });
addTableTag( techSkills, "AI",  {
  rating:85,
  tagDiv:{title:"AI", tags:[ ]},
  subDivs:[
    {
      hidden:true,
      subDivs:aiSkills,
    },
  ],
  
});
addTableTag( techSkills, "Embed", {
	rating:75,
	tagDiv:{title:"Embed", tags:[ ]},
});
addTableTag( techSkills, "Misc", {
	rating:50,
	tagDiv:{title:"Misc", tags:[ ]},
});
//
var mgtSkills = [];
addTableTag( mgtSkills, "AUTO", {
    rating:90,
    tagDiv:{title:"Auto-Mgt", tags:[ ]},
  });
addTableTag( mgtSkills, "AGILE", {
    rating:85,
    tagDiv:{title:"AGILE", tags:[ ]},
  });
addTableTag( mgtSkills, "CodeQual", {
    rating:75,
    tagDiv:{title:"CodeQual", tags:[ ]},
  });
//
var skillData = {  
  // subDivs:[
    // {
      subDivs:[
        {
          title:{txt:"Skills[Tech]", classes:["maintTitle"]},
          subDivs:techSkills,
        },
		{
          title:{txt:"Skills[Mgt]", classes:["maintTitle"]},
          subDivs:mgtSkills,
        },
		{
          title:{txt:"Techs", classes:["maintTitle"]},
          subDivs:techList,
        },
      ],
    // }
  // ]
}



/*** MISSIONS ***/
START_DATE = 2004.5;
var missionsByDate = {
  subDivs:[
    {
      type:"OTHER",
      dates:getDate(2),
      tagDiv:{title:"Holomatix", tags:[ ]},
    },
	{
      dates:getDate(7),
    },
	
    { 
      type:"Embed",
      dates:getDate(3),
      tagDiv:{title:"Dassault", tags:[ ]},
    },
    { 
      type:"GameDev",
      dates:getDate(4),
      tagDiv:{title:"ELB", tags:[ ]},
    },
	{ 
      type:"GameDev",
      dates:getDate(8),
      tagDiv:{title:"Phoenix", tags:[ ]},
    },
	{
      type:"OTHER",
      dates:getDate(1),
      tagDiv:{title:"Sword", tags:[ ]},
    },
	{
      type:"Embed",
      dates:getDate(2),
      tagDiv:{title:"NeoPost", tags:[ ]},
    },
	{
      type:"Embed",
      dates:getDate(2),
      tagDiv:{title:"Nagra", tags:[ ]},
    },
	{
      type:"STB",
      dates:getDate(5),
      tagDiv:{title:"SAH", tags:[ ]},
    },
	{
      type:"OTHER",
      dates:getDate(1),
      tagDiv:{title:"Technicolor", tags:[ ]},
    },
	{
      type:"OTHER",
      dates:getDate(1),
      tagDiv:{title:"SagemCom", tags:[ ]},
    },
	{
      type:"STB",
      dates:getDate(4),
      tagDiv:{title:"BouyguesTel", tags:[ ]},
    },
	{
      type:"OTHER",
      dates:getDate(1),
      tagDiv:{title:"Parrot", tags:[ ]},
    },
	{
      type:"STB",
      dates:getDate(5),
      tagDiv:{title:"Cisco", tags:[ ]},
    },
	
	{
      type:"GameDev",
      dates:getDate(6),
      tagDiv:{title:"TechSurvey[GameDev]", tags:[ ]},
    },
	{
      dates:getDate(6),
    },
	{
      type:"WebApp++",
      dates:getDate(5),
      tagDiv:{title:"TechSurvey[WebApp++]", tags:[ ]},
    },
	
  ],  
}
//
var roleTags = [];
roleTags["LEAD"] = "Team-Lead";
roleTags["MGR"] = "Proj-Mgr";
roleTags["EXPERT"] = "Tech-Expert";
var processTags = [];
processTags["AGILE"] = "AGILE";
processTags["AUTO"] = "Auto-Mgt";
processTags["CodeQual"] = "CodeQual";
var missionsByType = {
  subDivs:[
    {
      title:{txt:"Projects[Experiences]", classes:["maintTitle"]},
      // classes:["maintTitle"],
    },
    
    {
      classes:["hilightHi"],
	  title:{txt:"WebApp++", classes:["title"]},
      subDivs:[
        {
          subDivs:getMissionsByType("WebApp++", missionsByDate.subDivs),
        },
		{
		  subDivs:[
			{
			  subDivs:[
				{
					tagDiv:{title:"", tags:[ roleTags["MGR"], roleTags["EXPERT"],   processTags["AUTO"], ]},
				},
			  ]
			},
		  ]
		},	
        {
          subDivs:[
            {
              subDivs:[ webAppSkills["Std"], techSkills["3D"], aiSkills["FLEX"], ],
            },
          ],          
        },        
      ],
    },
    {
      classes:["hilightHi"],
	  title:{txt:"GameDev", classes:["title"]},
      subDivs:[
        {
          subDivs:getMissionsByType("GameDev", missionsByDate.subDivs),
        },
		{
		  subDivs:[
			{
			  subDivs:[
				{
					tagDiv:{title:"", tags:[ roleTags["MGR"], roleTags["LEAD"], roleTags["EXPERT"],   
					processTags["AUTO"], processTags["AGILE"], ]},
				},
			  ]
			},
		  ]
		},
        {
          subDivs:[
            {
              subDivs:[  techSkills["GameDev"], techSkills["MW"], techSkills["3D"],  aiSkills["GAME"],   ],
            },
          ],          
        },
      ],
    },
	{
      classes:["hilightHi"],
	  title:{txt:"STB", classes:["title"]},
      subDivs:[
        {
          subDivs:getMissionsByType("STB", missionsByDate.subDivs),
        },
		{
		  subDivs:[
			{
			  subDivs:[
				{
					tagDiv:{title:"", tags:[  roleTags["EXPERT"],   
						processTags["AGILE"], ]},
				},
			  ]
			},
		  ]
		},
        {
          subDivs:[
            {
              subDivs:[ webAppSkills["STB"], techSkills["MW"],   ],
            },
          ],          
        },        
      ],
    },
	
	{
	  classes:["hilightLo"],
      title:{txt:"Embed", classes:["title"]},
      subDivs:[
        {
          subDivs:getMissionsByType("Embed", missionsByDate.subDivs),
        },
		{
		  subDivs:[
			{
			  subDivs:[
				{
					tagDiv:{title:"", tags:[  processTags["CodeQual"] ]},
				},
			  ]
			},
		  ]
		},
        {
          subDivs:[
            {
              subDivs:[ techSkills["Embed"],   ],
            },
          ],          
        },        
      ],
    },
	{
	  classes:["hilightLo"],
      subDivs:[
	  {
		  subDivs:[
		  {
			
		  title:{txt:"OTHER", classes:["title", ]},
		  // classes:["hilightLo"],
		  subDivs:[
			{
			  subDivs:getMissionsByType("OTHER", missionsByDate.subDivs),
			},
			
			{
			  subDivs:[
				{
				  subDivs:[
					{
						tagDiv:{title:"", tags:[  ]},
					},
				  ]
				},
			  ]
			},
			{
			  subDivs:[
				{
				  subDivs:[ techSkills["Misc"],   ],
				},
			  ],          
			},
		  ],
		  }
		  ]
		},
	]
	}
    
    
    
  ],
};


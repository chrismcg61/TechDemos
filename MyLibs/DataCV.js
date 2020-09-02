/*** Tags ***/
var roleTags = [];
roleTags["LEAD"] = "Team-Lead";
roleTags["MGR"] = "Proj-Mgr";
roleTags["EXPERT"] = "Tech-Expert";
var processTags = [];
processTags["AGILE"] = "AGILE";
processTags["AUTO"] = "Auto-Mgt";
processTags["CodeQual"] = "Code-Quality";



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
        "IT-Engineer"+small("(2006)"),        
        small("HMI-Robotics"),
      ]},
      subDivs:[
        {
          hidden:true,
          subDivs:[
			{  
              tagDiv:{title:"Maths-Sup/Spe"+small("(2003)"), tags:[]},
            }, 		  
            {  
              tagDiv:{title:"BAFA "+small("(Summer-Camp Animator)"), tags:[]},
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
              tagDiv:{title:"Mail: mail@fai.com", tags:[]},
              subDivs:[
                {
                  hidden:true,
                  subDivs:[                        
                    {  
                      tagDiv:{title:"Tel: 0123456789", tags:[]},
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
         "Mobility", "Flex-Time", "Agile", "TeleWork++", 
      ]},
      subDivs:[
        {
          hidden:true,
          subDivs:[ 
            {
              tagDiv:{title:"Overtime++: ", tags:[
                "80-140h./2W", "FlexTime Rewards",
              ]},
            },
			{
              tagDiv:{title:"Proj: ", tags:[
                "Strong Scope",  "Clear Needs"+small(" (Expertise/Time)"),
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




/*** LANG ***/
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









/*** HOBBIES ***/
var hobbiesTechData = {
  subDivs:[
    // {
      // subDivs:[
        {
          title:{txt:"Hobbies [Tech]", classes:["maintTitle"]},
        },
        {
          //rating:95,    
          tagDiv:{title:"Tech Research ", tags:[ ]},
		  subDivs:[
			{
			  hidden:true,
			  subDivs:[                        
				{  
				  tagDiv:{title:"", tags:[
				    "Coding++"+small(" (Tech/Methods)"), "Mgt++"+small(" (Tools/Methods)"),  ]},
				},
			  ]
			}
		  ]
        },
        {
          tagDiv:{title:"Gaming/Test Community", tags:[ ]},
		  subDivs:[
			{
			  hidden:true,
			  subDivs:[                        
				{  
				  tagDiv:{title:"", tags:[
				    "Retro-Gaming"+small(" (90s-2010s)"), "Competitive", "Early-Access",  ]},
				},
			  ]
			}
		  ]
        },
        {
          tagDiv:{title:"Documentaries", tags:[ ]},
		  subDivs:[
			{
			  hidden:true,
			  subDivs:[                        
				{  
				  tagDiv:{title:"", tags:[
				    "Techs", "Sciences", "History", "Soft-Skills",  ]},
				},
			  ]
			}
		  ]
        },
        
        
        {
          title:{txt:"Hobbies [Other]", classes:["maintTitle"]},
        },
		
		{
			subDivs:[
				{
				  tagDiv:{title:"Music: ", tags:[ "Piano++", "Guitar", "Singing/Musicals", ]},
				},
				{
				  tagDiv:{title:"Sports"+small(" (Running/Cycling, Rackets, Football, Ski)"), tags:[  ]},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[                        
						{  
						  tagDiv:{title:"", tags:[
						  "Semi-Marathon", "Mountain-Bike", "Racket Sports",  ]},
						},
						{  
						  tagDiv:{title:"", tags:[
							"Football",  "Ski/Snowboard"  ]},
						},
					  ]
					}
				  ]
				},
				{
				  tagDiv:{title:"Culture/Arts"+small(" (SF/Fantasy, Sport-Evts, Politics)"), tags:[ ]},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[                        
						{  
						  tagDiv:{title:"TV-Series"+small("(Books): "), tags:[
							"SF", "Fantasy", "Thriller", "History",  ]},
						},
						{  
						  tagDiv:{title:"Sport-Events: ", tags:[
							"Football", "Tennis", "Cycling", "Olympics",  ]},
						},
						{  
						  tagDiv:{title:"Other Events: ", tags:[
							"Music", "E-Sport", "Politics",  ]},
						},
					  ]
					}
				  ]
				},
			]
		},
      // ],
    // },    
  ],
};













/*** MiniJobs ***/
var miniJobsData = {
  subDivs:[
    // {
      // subDivs:[
        {
          title:{txt:"MiniJobs & Volunteer", classes:["maintTitle"]},
        },
        
		{
          tagDiv:{title:"Proficient+"+small(" (PC/Elec-ER & Teaching)"), tags:[]},
          subDivs:[
            {
              hidden:true,
              subDivs:[                        
                {  
                  tagDiv:{title:"Computer/Robot/Electronics Install/Repair", tags:[]},
                },
                {  
                  tagDiv:{title:"Teaching (Maths, Prog)", tags:[]},
                },                
                
                
              ],
            },
          ],
        },
		
        {
          tagDiv:{title:"Proficient"+small(" (Translator & Animator)"), tags:[]},
          subDivs:[
            {
              hidden:true,
              subDivs:[                        
                {  
                  tagDiv:{title:"Translator (ENG/FR)", tags:[]},
                },
				{  
                  tagDiv:{title:"Teen Summer Camp Animator", tags:[]},
                },
                
              ],
            },
          ],
        },
        
        {
          tagDiv:{title:"Other"+small(" (Elder-ER, Event Org°...)"), tags:[]},
          subDivs:[
            {
              hidden:true,
              subDivs:[   
                {  
                  tagDiv:{title:"Elder/Dependent People Assist", tags:[]},
                },                
                {  
                  tagDiv:{title:"Event Org°", tags:[]},
                },
				{  
                  tagDiv:{title:"Gardening/Construction", tags:[]},
                },
                
              ],
            },
          ],
        },
        
      // ],
    // },    
  ],
};
	











/*** LIVE PROJs ***/
var liveProjsData = {
	subDivs:[
    // {
      // subDivs:[
        {
          title:{txt:"Projects [Live]", classes:["maintTitle"]},
        },
        {
          tagDiv:{title:"GPU-AI++"+small(" (M-Learning++, Traffic/Pathing++, ImageAI)"), tags:[ ]},
		  subDivs:[
			{
			  hidden:true,
			  subDivs:[                        
				{  
				  tagDiv:{title:"Machine-Learning: ", tags:[
				    "GPU M-Learning", "Bots Optim"+small(" (Act°/Strat)"),]},
				},
				{  
				  tagDiv:{title:"PathFinding: ", tags:[ "Traffic Sim", "GPU-PathFinding", ]},
				},
				{  
				  tagDiv:{title:"Image Analysis AI: ", tags:[
				    "Face Detect°", "Auto-Optim", ]},
				},
			  ],
			},
		  ],
		  
        },
        {
          tagDiv:{title:"Mgt++"+small(" (Tools/Metrics++, Objectives++, WorkForce++)"), tags:[ ]},
		  subDivs:[
			{
			  hidden:true,
			  subDivs:[   
				{  
				  tagDiv:{title:"", tags:[ "Async Tools", "Metrics++", "WorkForce Correct°" ]},
				},				
				{  
				  tagDiv:{title:"Bonus Objectives", tags:[]},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[                        
						{  
						  tagDiv:{title:"Tech: ", tags:[ 
						    "AI"+small(" (Assist+DataProc)"), "Gamificat°", "Energy...",  ]},
						},
						{  
						  tagDiv:{title:"Soft: ", tags:[ 
						    "Mentoring++", "RiskPrevent°++", "Ecology/Social...",  ]},
						},
					  ],
					},
				  ],
				},
			  ],
			},
		  ],
        },                
      // ],
    // },    
  ]
}










/*** Fav Projs ***/
var favProjsData = {
	subDivs:[
		{
		  title:{txt:"Projects of Interest", classes:["maintTitle"]},
		},
		
		{
			subDivs:[			
				{
				  tagDiv:{title:"Productivity"+small(" (WorkLoad/ChangeReq)"), tags:[ ],  },
				  subRatings:{title:"", S:85},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[ 
						{
						  tagDiv:{title:"WorkLoad: ", tags:[ "Continuity(Non-Work Days)", "HiWorkload Mgt",   ]},
						},
						{
						  tagDiv:{title:"", tags:[ "Lo-ChangeReq", "Release Freq" ]},
						},
					  ],
					},
				  ],
				}, 
				{
				  tagDiv:{title:"Productivity"+small(" (Tasks/Tools++)"), tags:[ ],  },
				  subRatings:{title:"", S:85},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[ 				
						{
						  tagDiv:{title:"Tasks : ", tags:[ "Automation(LoTech)", "Bonus Dev Tasks"]},
						},
						{
						  tagDiv:{title:"Tools : ", tags:[ "Async CoWorking", "Metrics(Prod+Qual)"]},
						},				
					  ],
					},
				  ],
				},
				
				{
				  tagDiv:{title:"Quality"+small(" (Value,ROI,Regression)"), tags:[ ]},
				  subRatings:{title:"", S:80},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[ 
						{
						  tagDiv:{title:"", tags:[ "Value Features", "ROI(Tech...)", "Regression Prevent°"]},
						},				
					  ],
					},
				  ],
				}, 
				{
				  tagDiv:{title:"Team"+small(" (CoWorking/Training)"), tags:[ ]},
				  subRatings:{title:"", S:75},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[ 
						{
						  tagDiv:{title:"", tags:[ 
							"Strong Training"+small("(+Mentoring)"), "CoWorking-Env++"+small(" (Offices+Days)"), ]},
						},				
					  ],
					},
				  ],
				},
				{
				  tagDiv:{title:"Agile++", tags:[ ]},
				  subRatings:{title:"", S:70},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[ 
						{
						  tagDiv:{title:"", tags:[ 
							"X/Pair-Prog", "Strong Struct"+small("(MgtDuo+Sprint)"), "Sprint Correct°", ]},
						},				
					  ],
					},
				  ],
				},
				{
				  tagDiv:{title:"Risk Mgt"+small(" (StressTest,Plan,Act°)"), tags:[ ]},
				  subRatings:{title:"", S:65},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[ 
						{
						  tagDiv:{title:"Actions: ", tags:[ "Lo-Workload Mgt", "Issue Escalat°", ]},
						},	
						{
						  tagDiv:{title:"Prevention: ", tags:[ "Risk-Plan"+small("(Proj/Corp)"), "Risk Limit", "Risk Manager", ]},
						},	
						{
						  tagDiv:{title:"", tags:[ "StressTest",   ]},
						},	
					  ],
					},
				  ],
				},			
			]
		},				
	]
}


































/*** SKILLS ***/
var techList = [];
{
addTableTag( techList, "TOOLS", {
    rating:85,
    tagDiv:{title:"Tools", tags:[ ]},
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
		    {
				rating:85,
				tagDiv:{title:"", tags:[ 
				  "Unity"+small("(Unreal)"), "VStudio", "Win/Linux"+small("(All)"), "VMware", ]},
				subDivs:[
					{
					  hidden:true,
					  subDivs:[
					    {
							rating:85,
							tagDiv:{title:"", tags:[ 
							  "Eclipse", "Versioning"+small("(All)"), "Jira/Bugzilla", "Codepen/Github/SO" ]},
						},
					  ]
					}
				]
			},
			
			
			
		  ]
		}
	]
	
});
addTableTag( techList, "LANG", {
    rating:85,
    tagDiv:{title:"Prog-Lang.", tags:[ ]},
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"", tags:[ "JS", "C,C++,C#", "Lua", "Batch", "HTML/CSS3D" ]},
				subDivs:[
					{
					  hidden:true,
					  subDivs:[
						{
							rating:50,
							tagDiv:{title:"", tags:[ "Python", "Java", "Dart", "Flash/AS", ]},
						},
					  ],
					},
				],
			},
		  ],
		},
	],
});
addTableTag( techList, "LIBS", {
    rating:85,
    tagDiv:{title:"Libs", tags:[ ]},
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"GPU: ", tags:[ 
				  "WebGL"+small("(OpenGL/DX)"), "WebCL/GLSL"+small("(OpenCL)"), "Wii/PS3" ]},
			},
			{
				rating:75,
				tagDiv:{title:"Other: ", tags:[ "AngularJS", "ReactJS", ]},
				subDivs:[
					{
					  hidden:true,
					  subDivs:[
						{
							rating:70,
							tagDiv:{title:"", tags:[ "Jasmine/Bullseye", "Qt,WebExt", "WebWorkers,NodeJS", ".Net",  ]},
						},
					  ]
					}
				]
				
			},
			
			
		  ],
		},
	],
});
}
//
var aiSkills = [];
{
addTableTag( aiSkills, "Generic", {
	rating:85,
	tagDiv:{title:"AI-Basic"+small(" (Bots Behavior/Sync)"), tags:[ ]},
	subDivs:[
		{
			hidden:true,
			subDivs:[
				{
					rating:85,
					tagDiv:{title:"Bots: ", tags:[ "Idle/Aggro Behavior", "Team Sync AI" ]},
				},				
			]
		}
	]
});
addTableTag( aiSkills, "GAME", {
	rating:85,
	tagDiv:{title:"AI-Game"+small(" (World-Sim + User-Act°)"), tags:[ ]},
	subDivs:[
		{
			hidden:true,
			subDivs:[
				{
					rating:85,
					tagDiv:{title:"", tags:[ "Player Assist", "World Simulation", "Player Interaction", ]},
				},				
			]
		}
	]
});
addTableTag( aiSkills, "FLEX", {
    rating:85,
    tagDiv:{title:"AI-Flex"+small(" (Neural-Net. + Machine-Learning)"), tags:[ ]},  
	subDivs:[
		{
			hidden:true,
			subDivs:[
				{
					rating:85,
					tagDiv:{title:"", tags:[ "Distrib Robots AI", "Neural Network", "Machine-Learning" ]},
				},				
			]
		}
	]
});
}
//
var webAppSkills = [];
{
addTableTag( webAppSkills, "Generic", {
    rating:85,
    tagDiv:{title:"WebApp-Generic"+small(" (Modular & 3D)"), tags:[ ]},
	subDivs:[
		{
			hidden:true,
			subDivs:[
				{
					rating:85,
					tagDiv:{title:"", tags:[ "Modular", "3D (CPU-GPU)",  ]},
				},
			]
		}
	]
	
  });
addTableTag( webAppSkills, "STB", {
    rating:85,
    tagDiv:{title:"WebApp-STB"+small(" (Perf & GridUI)"), tags:[ ]},
	subDivs:[
		{
			hidden:true,
			subDivs:[
				{
					rating:85,
					tagDiv:{title:"", tags:[ "Perf/Stability", "Grid UI",  ]},
				},
			]
		}
	]
  });
addTableTag( webAppSkills, "Std", {
    rating:85,
    tagDiv:{title:"WebApp-Std++"+small(" (MultiProc & Gamif°)"), tags:[ ]},  
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"", tags:[ "Multithreads", "Gamification", ]},
			},
		  ],
		},
	],
  });
}
//
var techSkills = [];
{
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
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				subDivs:[
					{
						rating:85,
						tagDiv:{title:"", tags:[ "Controls++", "Procedural Stream", "Editor Extension",  ]},
						subDivs:[
							{
							  hidden:true,
							  subDivs:[
								{
									rating:85,
									tagDiv:{title:"", tags:[ 
									  "Scripted Events", "Area Integrity",   "Grid UI", "Dynamic HUD",
									 ]},
								},
							  ]
							}
						]
					},
				]
			}
		  ],
		},
	],
  });
addTableTag( techSkills, "MW", {
    rating:85,
    tagDiv:{title:"MiddleWare", tags:[ ]},
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"", tags:[ 
				  "Engine"+small("(Game/Video)"), "Modular App"+small("(Backend)"), "Drivers", ]},
				subDivs:[
					{
					  hidden:true,
					  subDivs:[
						{
							rating:85,
							tagDiv:{title:"", tags:[  "API Harmonization", ]},
						},
					  ]
					}
				]
					  
			},		
		  ],
		},
	],
});
addTableTag( techSkills, "Tools", {
    rating:85,
    tagDiv:{title:"Tools", tags:[ ]},
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"", tags:[  "Perf/Qual Monitor", "Auto-Docs", "Resource Proc",  ]},
				subDivs:[
					{
					  hidden:true,
					  subDivs:[
						  {
							rating:85,
							tagDiv:{title:"", tags:[ "UT+Stress",  "Distrib Process",   ]},
						},
					  ]
					}
				]				
			},						
		  ],
		},
	],
});
addTableTag( techSkills, "3D", {
    rating:85,
    tagDiv:{title:"3D/GPU", tags:[ ]},
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"CPU-GPU: ", tags:[ "3D-Mesh Anim", "Physics", ]},
			},
{
				rating:85,
				tagDiv:{title:"Parallel Prog: ", tags:[ "Script Accelerat°", "M-Learning++" ]},
			},			
		  ],
		},
	],
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
	tagDiv:{title:"Embedded"+small(" (Secu/Drivers...)"), tags:[ ]},
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				rating:75,
				tagDiv:{title:"", tags:[  "Debug Bench", "Security/Encryption", "Drivers",  ]},
			},		
		  ],
		},
	],
});
addTableTag( techSkills, "Misc", {
	rating:50,
	tagDiv:{title:"Other"+small(" (Network/Elec...)"), tags:[ ]},
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				rating:50,
				tagDiv:{title:"", tags:[ "Network/Elec", ".Net", "Data Processing",     ]},
			},		
		  ],
		},
	],
});
}
//
var mgtSkills = [];
{
addTableTag( mgtSkills, "AUTO", {
    rating:90,
    tagDiv:{title:processTags["AUTO"], tags:[ ]},
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"", tags:[ "Guidelines", "Feature/Tech Tasks", "Scope Correct°",   ]},
				subDivs:[
					{
					  hidden:true,
					  subDivs:[
					    {
							rating:85,
							tagDiv:{title:"Tasks: ", tags:[ "Important/Urgent", "MultiTask" ]},
						},
						{
							rating:85,
							tagDiv:{title:"Code: ", tags:[ "Test-Driven", "API Refactoring", ]},
						},	
						{
							rating:85,
							tagDiv:{title:"", tags:[ "RetroEngineering", "API Sharing", "Perf Monitor", ]},
						},
					  ]
					}
				]					  
			},						
		  ],
		},
	],
  });
addTableTag( mgtSkills, "AGILE", {
    rating:85,
    tagDiv:{title:processTags["AGILE"], tags:[ ]},
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			  {
				  subDivs:[
				    {
						rating:85,
						tagDiv:{title:"", tags:[ "SCRUM", "PairCommit", "CodeReview", "SprintReview"+small("(Monitor)") ]},
						subDivs:[
							{
							  hidden:true,
							  subDivs:[
								{
									rating:85,
									tagDiv:{title:"", tags:[  "Inter-Team Sync", ]},
								},
							  ]
							}
						]
					},			
				  ]
			  }		
		  ],
		},
	],
  });
addTableTag( mgtSkills, "CodeQual", {
    rating:75,
    tagDiv:{title:processTags["CodeQual"], tags:[ ]},
	subDivs:[
		{
		  hidden:true,
		  subDivs:[
			{
				rating:75,
				tagDiv:{title:"", tags:[ "Strong UTs", "Qual/Regression Monitor", ]},
			},		
		  ],
		},
	],
  });
}
//
var skillMgtData = {  
  // subDivs:[
    // {
      subDivs:[
        {
          title:{txt:"Skills [Mgt]", classes:["maintTitle"]},
          subDivs:mgtSkills,
        },
      ],
    // }
  // ]
}
//
var skillData = {  
  // subDivs:[
    // {
      subDivs:[
		{
          title:{txt:"Skills [Tech]", classes:["maintTitle"]},
          subDivs:techSkills,
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
      tagDiv:{title:"Holomatix"+small(" (London)"), tags:[ ]},
    },
	{
      dates:getDate(7),
    },
	
    { 
      type:"Embed",
      dates:getDate(3),
      tagDiv:{title:"Dassault"+small(" (Istres)"), tags:[ ]},
    },
    { 
      type:"GameDev",
      dates:getDate(4),
      tagDiv:{title:"Ubi/Etranges-Libellules"+small(" (Lyon)"), tags:[ ]},
    },
	{ 
      type:"GameDev",
      dates:getDate(8),
      tagDiv:{title:"Ubi/Phoenix"+small(" (Lyon)"), tags:[ ]},
    },
	{
      type:"OTHER",
      dates:getDate(1),
      tagDiv:{title:"Sword"+small(" (Lyon)"), tags:[ ]},
    },
	{
      type:"Embed",
      dates:getDate(2),
      tagDiv:{title:"NeoPost"+small(" (Paris)"), tags:[ ]},
    },
	{
      type:"Embed",
      dates:getDate(2),
      tagDiv:{title:"Nagra/Canal+"+small(" (Paris)"), tags:[ ]},
    },
	{
      type:"STB",
      dates:getDate(5),
      tagDiv:{title:"SAH/Orange"+small(" (Paris)"), tags:[ ]},
    },
	{
      type:"OTHER",
      dates:getDate(1),
      tagDiv:{title:"Technicolor"+small(" (Paris)"), tags:[ ]},
    },
	{
      type:"OTHER",
      dates:getDate(1),
      tagDiv:{title:"SagemCom"+small(" (Paris)"), tags:[ ]},
    },
	{
      type:"STB",
      dates:getDate(4),
      tagDiv:{title:"BouyguesTel"+small(" (Paris)"), tags:[ ]},
    },
	{
      type:"OTHER",
      dates:getDate(1),
      tagDiv:{title:"Parrot"+small(" (Paris)"), tags:[ ]},
    },
	{
      type:"STB",
      dates:getDate(5),
      tagDiv:{title:"Cisco[TV]"+small(" (Paris)"), tags:[ ]},
    },	
	{
      type:"GameDev",
      dates:getDate(6),
      tagDiv:{title:"MyProj[NextGen-Game]", tags:[ ]},
    },
	{
      dates:getDate(6),
    },
	{
      type:"WebApp++",
      dates:getDate(5),
      tagDiv:{title:"MyProj[WebApp++]", tags:[ ]},
    },	
  ],  
}



var missionsByType = {
  subDivs:[
    {
      title:{txt:"Projects [Experiences]", classes:["maintTitle"]},
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
              subDivs:[ webAppSkills["Generic"], webAppSkills["Std"], 
			    techSkills["3D"], 
				aiSkills["Generic"], aiSkills["FLEX"], 
			  ],
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
					tagDiv:{title:"", tags:[ 
					  roleTags["MGR"], roleTags["LEAD"], roleTags["EXPERT"],   
					  processTags["AUTO"], processTags["AGILE"], 
					]},
				},
			  ]
			},
		  ]
		},
        {
          subDivs:[
            {
              subDivs:[  techSkills["GameDev"],  techSkills["3D"],  
			    aiSkills["Generic"], aiSkills["GAME"],   
				techSkills["MW"],techSkills["Tools"],
			  ],
            },
          ],          
        },
      ],
    },
	{
      classes:["hilightHi"],
	  title:{txt:"SetTopBox", classes:["title"]},
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
              subDivs:[  webAppSkills["Generic"], webAppSkills["STB"], 
			    techSkills["MW"],techSkills["Tools"],   ],
            },
          ],          
        },        
      ],
    },
	
	{
	  classes:["hilightLo"],
      title:{txt:"Embedded", classes:["title"]},
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
			
		  title:{txt:"Other", classes:["title", ]},
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







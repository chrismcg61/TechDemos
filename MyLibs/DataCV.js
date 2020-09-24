var ING = "<sup>ŋ</sup>";

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
var contracts = [];
{
addTableTag( contracts, "MAIN", {
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
    }
  );
}
//
var rootData_Pers = {
  subDivs:[
    {
      title:{txt:"Christopher McGARRY", classes:["maintTitle"]},
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
		  expandPrio:1,
          hidden:true,
          subDivs:[                        
            {  
              tagDiv:{title:"Mail: ", tags:[ "mcgarrychristopher<b>@</b>"+small("yahoo.fr") ]},
              subDivs:[
                {
                  hidden:true,
                  subDivs:[                        
                    {  
                      tagDiv:{title:"Tel: ", tags:[ "0123456789", small("10am-7pm"),  ]},
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
	contracts["MAIN"],
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
            "Junior Proj-Manager",
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
    {
      subDivs:[
		  {
			subDivs:[  
	  
			{
			  title:{txt:"Hobbies [Tech]", classes:["maintTitle"]},
			},		
			
			{
			  //rating:95,    
			  tagDiv:{title:"Tech Research: ", tags:[ "Coding++"+small("(Tech/Concept)"), "Mgt++"+small("(Tools/Methods)"), ]},
			  // subDivs:[
				// {
				  // hidden:true,
				  // subDivs:[                        
					// {  
					  // tagDiv:{title:"XXX", tags:[   ]},
					// },
				  // ]
				// }
			  // ]
			},
			{
			  tagDiv:{title:"Gaming/DevTest: ", tags:[ "Early-Access", "Competitive",  "Retro"+small("(80s+)"),  ]},
			  // subDivs:[
				// {
				  // hidden:true,
				  // subDivs:[                        
					// {  
					  // tagDiv:{title:"XXX", tags:[  ]},
					// },
				  // ]
				// }
			  // ]
			},
			{
			  tagDiv:{title:"Documentaries: ", tags:[ "Tech/Science", "History/Politics", "Psycho/Mgt", ]},
			  // subDivs:[
				// {
				  // hidden:true,
				  // subDivs:[                        
					// {  
					  // tagDiv:{title:"XXX", tags:[   ]},
					// },
				  // ]
				// }
			  // ]
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
					  tagDiv:{title:"Sports: ", tags:[ "Semi-Marathon", "Mountain-Bike", "Racket Sports", "Football", ]},
					  subDivs:[
						{
						  hidden:true,
						  subDivs:[                        
							{  
							  tagDiv:{title:"", tags:[
								  "Ski/Snowboard"  ]},
							},
						  ]
						}
					  ]
					},
					{
					  tagDiv:{title:"Culture: ", tags:[ 
					    "TV-Series"+small("(Books)"), "SF/Fantasy/Thriller", "BritPop",   ]},
					  // subDivs:[
						// {
						  // hidden:true,
						  // subDivs:[ 
							// {  
							  // tagDiv:{title:"XXX", tags:[   ]},
							// },
						  // ]
						// }
					  // ]
					},
					{
					  tagDiv:{title:"Events: ", tags:[ 
					    "EU-Football", "ATP-Tennis", "Olympics", "Cycling"+small("(TdF)"),  "E-Sport",  ]},
					  // subDivs:[
						// {
						  // hidden:true,
						  // subDivs:[ 
							// {  
							  // tagDiv:{title:"XXX", tags:[  ]},
							// },
						  // ]
						// }
					  // ]
					},
				]
			},
			]
		 }
      ],
    },    
  ],
};















/*** MiniJobs ***/
var miniJobsData = {
  subDivs:[
    {
      subDivs:[
	  {
		  subDivs:[
		  
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
		  
		  
		  
		  ]
	  }
	  
        
        
      ],
    },    
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



































/*** SKILLS ***/
var techList = [];
{
addTableTag( techList, "TOOLS", {
    rating:85,
    tagDiv:{title:"Tools/Environment", tags:[ ]},
	subDivs:[
		{
		  expandPrio:1,
		  hidden:true,
		  subDivs:[
		    {
				rating:85,
				tagDiv:{title:"", tags:[ 
				  "Unity"+small("(Unreal)"), "VStudio", "Win/Linux"+small("(All)"), "VMware", ]},  //Virtools
				subDivs:[
					{
					  expandPrio:1,
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
		  expandPrio:1,
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"", tags:[ "JS", "C,C++,C#", "Lua", "Bash/Batch/PowerShell"+small(""),  ]},				
			},
			{
				rating:70,
				tagDiv:{title:"", tags:[ "HTML/CSS3D", "Python", "TypeScript", "Assembly", "Dart",  ]},
				subDivs:[
					{
					  expandPrio:1,
					  hidden:true,
					  subDivs:[
						{
							rating:50,
							tagDiv:{title:"", tags:[ 
							 "Swift", "VBA/Obj-C", "Flash/AS", "Java", "SQL", ]},
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
    tagDiv:{title:"Libs/Frameworks", tags:[ ]},
	subDivs:[
		{
		  expandPrio:1,
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"GPU: ", tags:[ 
				  "WebGL"+small("(OpenGL/DX)"), "WebCL/GLSL"+small("(OpenCL)"), "Wii/PS3" ]},  //Cuda
			},
			{
				rating:70,
				tagDiv:{title:"Other: ", tags:[ "AngularJS", "ReactJS", small("VueJS"), ]},
				subDivs:[
					{
					  expandPrio:1,
					  hidden:true,
					  subDivs:[
						{
							rating:70,
							tagDiv:{title:"", tags:[ "JasmineUT/Bullseye", "Tk,Qt,WebExt", "WebWorkers,NodeJS", "Asp.Net",  ]},
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
	tagDiv:{title:"AI-Game"+small(" (World-Sim + User-Act°/Assist)"), tags:[ ]},
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
    tagDiv:{title:"WebApp-Generic"+small(" (Modular & 3D/GPU)"), tags:[ ]},
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
	  expandPrio:1,
      hidden:true,
      subDivs:webAppSkills,
    },
  ],
  
});
addTableTag( techSkills, "AI",  {
  rating:85,
  tagDiv:{title:"AI", tags:[ ]},
  subDivs:[
    {
      expandPrio:1,
	  hidden:true,
      subDivs:aiSkills,
    },
  ],
  
});
addTableTag( techSkills, "3D", {
	rating:85,
	tagDiv:{title:"3D/GPU", tags:[ ]},
	subDivs:[
	{
	  //expandPrio:1,
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
addTableTag( techSkills, "GameDev", {
    rating:85,
    tagDiv:{title:"GameDev/Design", tags:[ ]},
	subDivs:[
		{
		  //expandPrio:1,
		  hidden:true,
		  subDivs:[
			{
				subDivs:[
					{
						rating:85,
						tagDiv:{title:"", tags:[ 
						  "Controls++", "EditorUI++", "Dyn. HUD", "Grid UI"  ]},
					},
					{
						rating:85,
						tagDiv:{title:"Scene: ", tags:[ 
						  "Procedural", "Stream", "Integrity",  "Scripted Evts",   ]},
						// subDivs:[
							// {
							  // hidden:true,
							  // subDivs:[
								// {
									// rating:85,
									// tagDiv:{title:"XXX", tags:[ ]},
								// },
							  // ]
							// }
						// ]
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
		  //expandPrio:1,
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"", tags:[ 
				  "Engine"+small("(Game/Video)"), "Embedded Modular App", "Drivers", ]},
				subDivs:[
					{
					  hidden:true,
					  subDivs:[
						{
							rating:85,
							tagDiv:{title:"", tags:[   "End-User API", "User-Tools", ]},
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
		  //expandPrio:1,
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
addTableTag( techSkills, "Embed", {
	rating:75,
	tagDiv:{title:"Embedded"+small(" (Security/Drivers...)"), tags:[ ]},
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
    tagDiv:{title:processTags["AUTO"]+": ", tags:[ small("Guidelines"), small("Scope Correct°"), ]},
	subDivs:[
		{
		  expandPrio:1,
		  hidden:true,
		  subDivs:[
			{
				rating:85,
				tagDiv:{title:"", tags:[ "RetroEng"+ING, "API Refactor"+ING, "Perf-Monitor Lib",    ]},
				subDivs:[
					{
					  hidden:true,
					  subDivs:[
					    {
							rating:85,
							tagDiv:{title:"Tasks: ", tags:[ "Important/Urgent", "Feature/Tech", ]},
						},
						{
							rating:85,
							tagDiv:{title:"Code: ", tags:[ "Test-Driven", "API Sharing",  ]},
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
    rating:90,
    tagDiv:{title:processTags["AGILE"]+": ", tags:[ 
	  small("SCRUM"), small("PairCommit"), small("SprintReview"), ]},
	subDivs:[
		{
		  expandPrio:1,
		  hidden:true,
		  subDivs:[
			  {
				  subDivs:[
				    {
						rating:85,
						tagDiv:{title:"", tags:[  "CodeReview", "Inter-Team Sync", ]},
					},			
				  ]
			  }		
		  ],
		},
	],
  });
addTableTag( mgtSkills, "CodeQual", {
    rating:75,
    tagDiv:{title:processTags["CodeQual"]+": ", tags:[ small("Strong UTs"), small("Qual/Regr° Monitor"), ]},
	subDivs:[
		{
		  expandPrio:1,
		  hidden:true,
		  subDivs:[
			{
				rating:75,
				tagDiv:{title:"", tags:[ "UT Maintenance", "UT Auto-Alerts", "API-Docs Monitor", ]},
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
          title:{txt:"Skills [Management]", classes:["maintTitle"]},
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


































/*** Fav Projs ***/
var favProjsData = {
	subDivs:[
		{
		  title:{txt:"Projects of Interest", classes:["maintTitle"]},
		},
		
		{
			subDivs:[	
			
				{
				  tagDiv:{title:"Contract++ & Mgt-Skills", tags:[ ],  },
				  subRatings:{title:"", S:85},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[ 
					    contracts["MAIN"],
					    mgtSkills["AUTO"],  mgtSkills["AGILE"],
					  ],
					},
				  ],
				},
				
				{
				  tagDiv:{title:"Productivity"+small(" (Tasks/Tools++, WorkLoad/ChangeReq)"), tags:[ ],  },
				  subRatings:{title:"", S:85},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[ 
					    {
						  tagDiv:{title:"Tasks"+small(" (Automation, Dev-Tasks++)"), tags:[ ]},
						  subDivs:[
							{
							  hidden:true,
							  subDivs:[ 
								{
								  tagDiv:{title:"Automation (LoTech)", tags:[  ]},
								},
								{
								  tagDiv:{title:"Bonus Dev Tasks", tags:[  ]},
								},				
							  ],
							},
						  ],
						},
						{
						  tagDiv:{title:"Tools"+small(" (CoWorking++, Metrics++)"), tags:[ ]},
						  subDivs:[
							{
							  hidden:true,
							  subDivs:[ 
								{
								  tagDiv:{title:"Async CoWorking", tags:[  ]},
								},
								{
								  tagDiv:{title:"Metrics (Prod+Qual)", tags:[  ]},
								},				
							  ],
							},
						  ],
						},	
						{
						  tagDiv:{title:"WorkLoad"+small(" (Continuity++, HiWorkload++)"), tags:[  ]},
						  subDivs:[
							{
							  hidden:true,
							  subDivs:[ 
								{
								  tagDiv:{title:"Continuity (Non-Work Days)", tags:[  ]},
								},
								{
								  tagDiv:{title:"HiWorkload Mgt", tags:[  ]},
								},				
							  ],
							},
						  ],
						},
						{
						  tagDiv:{title:"", tags:[ "Lo-ChangeReq", "Release Freq" ]},
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
						  tagDiv:{title:"", tags:[ "Value Features", "ROI(Tech...)", ]},
						},
						{
						  tagDiv:{title:"", tags:[ "Regression Prevent°" ]},
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
						  tagDiv:{title:"", tags:[ "Strong Training"+small("(+Mentoring)"), ]},
						},
						{
						  tagDiv:{title:"", tags:[ "CoWorking-Env++"+small(" (Offices+Days)"), ]},
						},				
					  ],
					},
				  ],
				},
				{
				  tagDiv:{title:"Agile++"+small(" (Struct/Sprint++)"), tags:[ ]},
				  subRatings:{title:"", S:70},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[ 
						{
						  tagDiv:{title:"", tags:[ 
							"X/Pair-Prog", "Strong Struct"+small("(MgtDuo+Sprint)"),  ]},
						},
						{
						  tagDiv:{title:"", tags:[ "Sprint Correct°", ]},
						},				
					  ],
					},
				  ],
				},
				{
				  tagDiv:{title:"Risk/Success Mgt"+small(" (Plan, StressTest, Correct°, Scopes)"), tags:[ ]},
				  subRatings:{title:"", S:65},
				  subDivs:[
					{
					  hidden:true,
					  subDivs:[ 
					    {
						  tagDiv:{title:"Success Scopes: ", tags:[ "Project", "Product", "Corporate", "Reusable", ]},
						},
						{
						  tagDiv:{title:"Corrections"+small(" (Lo-Workload++, Issue-Escalat°)"), tags:[  ]},
						  subDivs:[
							{
							  hidden:true,
							  subDivs:[ 
								{
								  tagDiv:{title:"Lo-Workload Mgt", tags:[  ]},
								},
								{
								  tagDiv:{title:"Issue Escalat°", tags:[  ]},
								},				
							  ],
							},
						  ],
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





































/*** MISSIONS ***/
START_DATE = 2004.5;
var missionsByDate = {
  subDivs:[
    {
      type:"OTHER",
      dates:getDate(2),
	  region:"London",
      tagDiv:{title:"Holomatix", tags:[ ]},
    },
	{
      dates:getDate(7),
    },
	
    { 
      type:"Embed",
      dates:getDate(3),
	  region:"Istres",
      tagDiv:{title:"Dassault Aviat°", tags:[ ]},
    },
    { 
	  //classes:["hilightHi"],
      type:"GameDev",
      dates:getDate(4),
	  region:"Lyon__",
      tagDiv:{title:"Ubi/EtrangesLib"+"<sup><i>ul</i></sup>", tags:[ ]},
	  url:"https://en.wikipedia.org/wiki/%C3%89tranges_Libellules",
    },
	{ 
      type:"GameDev",
      dates:getDate(8),
	  region:"Lyon__",
      tagDiv:{title:"Ubi/Phoenix", tags:[ ]},
	  url:"https://fr.wikipedia.org/wiki/Phoenix_Studio",
    },
	{
      type:"OTHER",
      dates:getDate(1),
	  region:"Lyon__",
      tagDiv:{title:"Sword", tags:[ ]},
    },
	{
      type:"Embed",
      dates:getDate(2),
	  region:"Paris_",
      tagDiv:{title:"NeoPost", tags:[ ]},
    },
	{
      type:"Embed",
      dates:getDate(2),
	  region:"Paris_",
      tagDiv:{title:"Nagra/Canal+", tags:[ ]},
    },
	{
      type:"STB",
      dates:getDate(5),
	  region:"Paris_",
      tagDiv:{title:"Orange/Soft@Home", tags:[ ]},
    },
	{
      type:"OTHER",
      dates:getDate(1),
	  region:"Paris_",
      tagDiv:{title:"Technicolor", tags:[ ]},
    },
	{
      type:"OTHER",
      dates:getDate(1),
	  region:"Paris_",
      tagDiv:{title:"SagemCom", tags:[ ]},
    },
	{
      type:"STB",
      dates:getDate(4),
	  region:"Paris_",
      tagDiv:{title:"BouyguesTel", tags:[ ]},
    },
	{
      type:"OTHER",
      dates:getDate(1),
	  region:"Paris_",
      tagDiv:{title:"Parrot", tags:[ ]},
    },
	{
      type:"STB",
      dates:getDate(5),
	  region:"Paris_",
      tagDiv:{title:"Cisco[TV]", tags:[ ]},
    },	
	{
      type:"GameDev",
      dates:getDate(6),
	  region:"Paris_",
      tagDiv:{title:"MyProj[NextGen-Game]", tags:[ ]},
    },
	{
      dates:getDate(6),
    },
	{
      type:"WebApp++",
      dates:getDate(5),
	  region:"Norm'dy",
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
		  classes:["backColHi"],
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
		  classes:["backColHi"],
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
	  title:{txt:"SetTopBox Dev", classes:["title"]},
      subDivs:[
        {
		  classes:["backColHi"],
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
      title:{txt:"Embedded Dev", classes:["title"]},
      subDivs:[
        {
		  classes:["backColLo"],
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
			  classes:["backColLo"],
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



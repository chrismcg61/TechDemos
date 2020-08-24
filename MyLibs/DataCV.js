//
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
      tagDiv:{title:"Degrees : ", tags:[
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
      tagDiv:{title:"Mobility : ", tags:[
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
      tagDiv:{title:"WebCV "+small("(Portfolio/Contacts)")+" : ", tags:[
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
      title:{txt:"Contracts : ", classes:["title"]},
      // classes:["title"],
      tagDiv:{title:"", tags:[
        "3-Months+",
        "FullTime", "Flex-HalfTime",
        "Mobility", "TeleWork",
      ]},   
    },
    {
      tagDiv:{title:"", tags:[
         "Agile", "Flex-Time", "Prod-Focus", "Overtime Mgt",
      ]},
      subDivs:[
        {
          hidden:true,
          subDivs:[ 
            {
              tagDiv:{title:"", tags:[
                "Overtime "+small("(80-140h./2W)"), 
                "HiTech",
              ]},
            },
            {
              tagDiv:{title:"Team : ", tags:[
                "Pair-Prog", "Team Training", "Mentoring",
              ]},
            },
            {
              tagDiv:{title:"Sprint : ", tags:[
                "Review", "Proj Metrics",
              ]},
            },
            {
              tagDiv:{title:"MGT : ", tags:[
                "Product Owner", "SCRUM Master",
              ]},
            },
          ],
        },
      ],    
    },   
  ],
};



var rootData_JobTitles = {
  subDivs:[
    {
      // classes:["separateDiv"],
      subDivs:[
        {
          title:{txt:"Senior Versatile Programmer", classes:["title"]},
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
//

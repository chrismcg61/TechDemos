////////////////////////////////////////////////////
// SKILLS
///////////////////////////////////////////////////

var mainSkills = [
  {
    "name": "AGILE Proj Mgt",
    "subTitle": "SCRUM...",
    "rating": {
      "main": newRating(3),
      "detail": {
        "xp": newRating(3),
        "relevance": newRating(3)       
      }
    }    
  },
  
  {
    "name": "C, C++, C#",
    "subTitle": "",
    "rating": {
      "main": newRating(3),
      "detail": {
        "xp": newRating(3),
        "relevance": newRating(3)       
      }
    }    
  },
  {
    "name": "JS",
    "subTitle": "Angular, Three, Threads, Unit Tests...",
    "rating": {
      "main": newRating(3),
      "detail": {
        "xp": newRating(3),
        "relevance": newRating(3)       
      }
    }    
  },
  
  {
    "name": "3D Prog",
    "subTitle": "GL, DX, Wii/PS3...",
    "rating": {
      "main": newRating(3),
      "detail": {
        "xp": newRating(3),
        "relevance": newRating(3)       
      }
    }    
  },
  
  {
    "name": "Shaders / GPU Parallel Prog",
    "rating": {
      "main": newRating(2),
      "detail": {
        "xp": newRating(2),
        "relevance": newRating(3)       
      }
    }    
  },
  
   
];


var otherSkills = [
  {
    "name": "Lua",
    "subTitle": "Python",
    "rating": {
      "main": newRating(2),
      "detail": {
        "xp": newRating(2),
        "relevance": newRating(2)       
      }
    }    
  },
  
  {
    "name": "Dart, Flash AS, Java, .Net",
    "subTitle": "",
    "rating": {
      "main": newRating(1),
      "detail": {
        "xp": newRating(1),
        "relevance": newRating(1)       
      }
    }    
  },
  
   
];


var skillCats = [
  {
    "title": "MAIN",
    "rgb": "255,0,0",    
    "skills": mainSkills,    
  },
  {
    "title": "OTHER",
    "rgb": "80,80,80",    
    "skills": otherSkills,    
  },
];


var languages = [
  {
    "name": "English / French",
    "subTitle": "",
    "rating": {
      "main": newRating(3),
    }    
  },  
  {
    "name": "German / Spanish",
    "subTitle": "",
    "rating": {
      "main": newRating(2),
    }    
  },  
  {
    "name": "Chinese",
    "subTitle": "",
    "rating": {
      "main": newRating(1),
    }    
  },
];






var workHobbies = [
  {
    "name": "Tech Research",
    "subTitle": "",
    "rating": {
      "main": newRating(3),
    }    
  },
  {
    "name": "3D Game/WebApp Prog",
    "subTitle": "",
    "rating": {
      "main": newRating(3),
    }    
  },
   
  {
    "name": "Gamer",
    "subTitle": "New, Retro, ESport",
    "rating": {
      "main": newRating(3),
    }    
  },
  
  {
    "name": "Documentaries",
    "subTitle": "Science, History, Nature",
    "rating": {
      "main": newRating(3),
    }    
  },
  
];

var otherHobbies = [
  {
    "name": "Piano",
    "subTitle": "Singing, Guitar",
    "rating": {
      "main": newRating(3),
    }    
  },
  
  {
    "name": "TV Shows / Books",
    "subTitle": "SF, Fantasy, Thriller",
    "rating": {
      "main": newRating(3),
    }    
  },
  
  {
    "name": "Bike / Running",
    "subTitle": "Trek, Semi-Marathon",
    "rating": {
      "main": newRating(2),
    }    
  },
  {
    "name": "Ski / Snowboard",
    "subTitle": "",
    "rating": {
      "main": newRating(2),
    }    
  },
  {
    "name": "Football / Tennis / Table Tennis",
    "subTitle": "",
    "rating": {
      "main": newRating(2),
    }    
  },
  
  {
    "name": "Fish Tank / Gardening",
    "subTitle": "",
    "rating": {
      "main": newRating(2),
    }    
  },
  
  {
    "name": "Concerts",
    "subTitle": "",
    "rating": {
      "main": newRating(2),
    }    
  },
  
];


var hobbyCats = [
  {
    "title": "WORK RELATED",
    "rgb": "255,0,0",    
    "skills": workHobbies,    
  },
  {
    "title": "OTHER",
    "rgb": "160,0,255",    
    "skills": otherHobbies,    
  },
];


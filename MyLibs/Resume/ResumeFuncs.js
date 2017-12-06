//////////////////////////////////////////////////////////
// AUTO DATE VALUES:
const msByYear = 365.2422 * 24 * 60 * 60 * 1000;
const curYearDecimal = 1970 + Date.now() / msByYear;

var myBirthYearDecimal = 1983 + 310/365;  // 6 Nov = 310th Day
var myGraduationYearDecimal = 2007 + 0/365;  

var myAge = curYearDecimal - myBirthYearDecimal;
myAge = Math.floor( myAge );

var myXP = curYearDecimal - myGraduationYearDecimal;
myXP = Math.floor( myXP );



////////////////////////////////////////////////////
// SKILLS
///////////////////////////////////////////////////
function newRating(rating){
  var a = [];
  for(var i=0; i<rating; i++)
  {
    a.push(i);        
  }

  return a;
}

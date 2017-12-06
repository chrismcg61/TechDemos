
var app = angular.module('myApp', []);
/*
app.run(
  function($rootScope) {
    //$rootScope.myAge = myAge;
  }
)
*/

app.controller('mainCtrl', function($scope, $rootScope) {  
  $scope.myAge = myAge;
  $scope.myXP = myXP;

  $scope.jobs = jobs;  
  $scope.categories = categories;  
  $scope.corps = corps;
  
  //$scope.mainSkills = mainSkills;
  //$scope.otherSkills = otherSkills;  
  $scope.skillCats = skillCats;   
  $scope.hobbyCats = hobbyCats;    
  //$scope.hobbies = hobbies;  
  $scope.languages = languages;  
    
  
  $scope.openMyModal = openMyModal;
  $scope.closeModal = closeModal;
  
  $scope.generateStyle = generateStyle;
  
  $scope.getY = getY;
  $scope.getQ = getQ;
}
)

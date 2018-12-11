angular.module("loc8rApp", []);

var locationListCtrl = function($scope) {
	
	$scope.data = {
    rests:[
      {
        _id:"5bf16434fc21db00cce170e8",
        name: "PizzaHut",
        address: "Milad Street",
        rating: 2,
        facilities: ["Hot drinks", "Food", "Premium wifi"],
        buy:"Buy",
        image: "/images/pizzahut.jpeg"
      },
      {
        _id:"5bf16434fc21db00cce170e9",
        name: "Subway",
        address: "Food Street",
        rating: 2,
        facilities: ["Hot drinks", "Food", "Premium wifi"],
        buy:"Buy",
        image: "/images/subway.jpeg"
      }
    ]
  }
};

var signup=function($scope,$http){
  $scope.CheckAvailability = function () {
  $http({
  method: "POST",
  url: "/signup",
  dataType: 'json',
  data: '{email: "' + $scope.Username + '" }',
  headers: { "Content-Type": "application/json" }
  }).success(function (data,status) {
  if (data) {
  //Email available.
  $scope.Color = "green";
  $scope.Message = "Email is available";
  console.log('woww');
  }
  else {
  //Email not available.
  $scope.Color = "red";
  $scope.Message = "Email is NOT available";

  }
  });
  };
  $scope.ClearMessage = function () {
  $scope.Message = "";
  };
  };
angular
  .module("loc8rApp")
  .controller("locationListCtrl", locationListCtrl)
  .controller("signup",signup);
angular.module('calculationController', [])

	.directive('randomNumbers', function(){
		return {
            restrict: 'EA',
            scope: true,
            template: 'Calculation:- <b>{{formData.firstNumber*formData.secondNumber}}</b>'
           };
	})

	// inject the calculations service factory into our controller
	.controller('mainController', ['$scope','$http','Calculations', function($scope, $http, Calculations) {
		$scope.formData = {};
		$scope.flag = false;
		
		$scope.loading = false;
		
		// GET =====================================================================
		// when landing on the page, get all calculations and show them
		// use the service to get all the calculations
		Calculations.get()
			.success(function(data) {
				$scope.calculation = data;
				$scope.loading = false;
				if($scope.formData.secondNumber == undefined || $scope.formData.firstNumber == undefined){
					$scope.flag = false;
				}
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createCalculation = function() {
			$scope.flag = true;
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData != undefined) {
				$scope.loading = true;

				Calculations.create($scope.formData)

					// if successful creation, call our get function to get all the new calculations
					.success(function(data) {
						$scope.loading = false;
						$scope.calculation = data; // assign our new list of calculations
					});
			}
		};

		// DELETE ==================================================================
		// delete a calculations after checking it
		$scope.deleteCalculation = function(id) {
			$scope.loading = true; //showing busy sign..in progress

			Calculations.delete(id)
				// if successful creation, call our get function to get all the new calculations
				.success(function(data) {
					$scope.loading = false;
					$scope.calculation = data; // assign new list of calculations
				if($scope.calculation.length == 0){
					window.location.reload();
					$scope.flag = false;
				}
				});
		};
	}]);
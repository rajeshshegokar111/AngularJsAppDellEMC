angular.module('calculationService', [])

	.factory('Calculations', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/calculations');
			},
			create : function(calculationsData) {
				return $http.post('/api/saveData', calculationsData);
			},
			delete : function(id) {
				return $http.delete('/api/calculations/' + id);
			}
		}
	}]);
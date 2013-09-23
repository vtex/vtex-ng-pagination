var mod, CONFIG;
mod = angular.module('vtexNgPagination', []);

CONFIG = {};
CONFIG.path = "";
CONFIG.hidePagination = true;

mod.directive("vtPagination", function(){
	return {
		restrict: "E",
		scope:{
			itemCount: "=itemCount",
			pageCount: "=pageCount",
			currentPage: "=currentPage",
			perPage: "=perPage"
		},
		templateUrl: CONFIG.path ? CONFIG.path + "/vtex-ng-pagination.html" : "modules/vtex-ng-pagination.html",
		link: function ($scope) {
			$scope.actions = {};

			// CONTROL IF HIDES ON SMALL LISTS
			$scope.hidePagination = CONFIG.hidePagination;

			// DISBALED BTS
			$scope.disablePrevious = "disabled";
			$scope.disableNext = "";

			// DEFAULTS
			$scope.perPage = $scope.perPage || 15;
			$scope.currentPage = $scope.currentPage || 1;

			// COMPUTED OBSERVABLES
			$scope.$watch('pageCount', function(){
				$scope.verifyBtns($scope.currentPage);
			});

			$scope.$watch('currentPage', function(newValue){
				if (newValue && (newValue <= 0)){
					$scope.currentPage = 1;
				} else if (newValue && (newValue > $scope.pageCount)){
					$scope.currentPage = $scope.pageCount ? $scope.pageCount : 1;
				}
				$scope.verifyBtns(newValue);
			});

			$scope.verifyBtns = function(newValue){
				if (newValue > 1 && newValue <= $scope.pageCount){
					$scope.disablePrevious = "";
				} else {
					$scope.disablePrevious = "disabled";
				}

				if (newValue < $scope.pageCount){
					$scope.disableNext = "";
				} else {
					$scope.disableNext = "disabled";
				}
			};

			// UI ACTIONS
			$scope.changePage = function(direction){
				if ((direction === "next") && ($scope.currentPage < $scope.pageCount)){
					$scope.currentPage = Math.ceil(Number($scope.currentPage))+1;
				} else if ((direction === "prev") && ($scope.currentPage > 1) && ($scope.currentPage <= $scope.pageCount)){
					$scope.currentPage = Math.ceil(Number($scope.currentPage)) - 1;
				}
			};

			$scope.setNumItemsPerPage = function(num){
				$scope.perPage = num;
				$scope.currentPage = 1;
			};

			// VIEW ACTIONS
			$scope.actions.addHtmlListeners = function(){
				$(".pagination input")
					.off('mouseover mouseout blur')
					.on('mouseover', function() {
						$(this).tooltip({'trigger': 'manual'});
						$(this).tooltip('show');
					})
					.on('mouseout', function() {
						if (!$(this).is(':focus')) {
							$(this).tooltip('hide');
						}
					})
					.on('blur', function() {
						$(this).tooltip('hide');
					});
			};

			$scope.actions.addHtmlListeners();
		}
	}
});

mod.provider('vtexNgPagination',
	{
		config: function(parameters){
			CONFIG.path = parameters.path;
			CONFIG.hidePagination = parameters.hidePagination;
		},
		$get: function(paginate){
			return paginate;
		}
	}
);
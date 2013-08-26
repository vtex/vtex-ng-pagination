var mod, CONFIG;
mod = angular.module('vtexNgPagination', []);

CONFIG = {};
CONFIG.path = "";
CONFIG.hidePagination = true;

mod.directive("pagination", function(){
	return {
		restrict: "E",
		scope:{
			callback: "&callback",
			totalCount: "=total",
			totalPages: "=pages",
			outerCurrentPage: "=page"
		},
		templateUrl: CONFIG.path ? CONFIG.path + "/vtex-ng-pagination.html" : "modules/vtex-ng-pagination.html",
		link: function ($scope) {
			var callback = $scope.callback();
			$scope.actions = {};

			// ORDER
			$scope.sort = 'name';
			$scope.sortType = 'ASC';

			// CONTROL IF HIDES ON SMALL LISTS
			$scope.hidePagination = CONFIG.hidePagination;

			// DISBALED BTS
			$scope.disablePrevious = "disabled";
			$scope.disableNext = "";

			// VARIAVEIS DE CONTROLE
			$scope.numItemsPerPage = 15;
			$scope.currentPage = 1;

			// COMPUTED OBSERVABLES
			$scope.$watch('totalPages', function(){
				$scope.verifyBtns($scope.currentPage);
			});

			$scope.$watch('currentPage', function(newValue){
				if (newValue && (newValue <= $scope.totalPages) && (newValue > 0)){
					$scope.actions.callback();
				} else if (newValue && (newValue <= 0)){
					$scope.currentPage = 1;
				} else if (newValue && (newValue > $scope.totalPages)){
					$scope.currentPage = $scope.totalPages ? $scope.totalPages : 1;
				}
				$scope.verifyBtns(newValue);
			});

			// LISTEN TO CHANGES ON CURRENT PAGE OUTSIDES DIRECTIVE
			$scope.$watch('outerCurrentPage', function(newValue){
				if (newValue != $scope.currentPage && newValue != undefined && newValue != null)
					$scope.currentPage = newValue;
			});

			$scope.verifyBtns = function(newValue){
				if (newValue > 1 && newValue <= $scope.totalPages){
					$scope.disablePrevious = "";
				} else {
					$scope.disablePrevious = "disabled";
				}

				if (newValue < $scope.totalPages){
					$scope.disableNext = "";
				} else {
					$scope.disableNext = "disabled";
				}
			};

			// UI ACTIONS
			$scope.changePage = function(direction){
				if ((direction === "next") && ($scope.currentPage < $scope.totalPages)){
					$scope.currentPage = Number($scope.currentPage)+1;
				} else if ((direction === "prev") && ($scope.currentPage > 1) && ($scope.currentPage <= $scope.totalPages)){
					$scope.currentPage = Number($scope.currentPage) - 1;
				}
			};

			$scope.setNumItemsPerPage = function(num){
				$scope.numItemsPerPage = num;
				$scope.currentPage = 1;
				$scope.actions.callback();
			};

			$scope.actions.callback = function(){
				if (callback){
					var obj_callback = {
						numItemsPerPage: $scope.numItemsPerPage,
						currentPage: $scope.currentPage,
						sort: $scope.sort,
						sortType: $scope.sortType
					};
					callback(obj_callback);
					$(".pagination input").trigger('blur');
				}
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
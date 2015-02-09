var mod, CONFIG;
mod = angular.module('vtex.ngPagination', []);

CONFIG = {};
CONFIG.path = "";
CONFIG.hidePagination = true;

mod.directive("vtPagination", function($location) {
	return {
		restrict: "E",
		scope:{
			itemCount: "=itemCount",
			pageCount: "=pageCount",
			currentPage: "=currentPage",
			perPage: "=perPage",
			useSearch: "=search"
		},
		templateUrl: CONFIG.path ? CONFIG.path + "/vtex-ng-pagination.html" : "vtex-ng-pagination.html",
		link: function ($scope) {

			// CONTROL IF HIDES ON SMALL LISTS
			$scope.hidePagination = CONFIG.hidePagination;

			// DISABLED BTS CONTROLS
			$scope.disablePrevious = "disabled";
			$scope.disableNext = "";

			// DEFAULTS
			$scope.perPage = $scope.perPage || 15;
			$scope.currentPage = $scope.currentPage || 1;
			$scope.currentPageDisplay = $scope.currentPage || 1;

			$scope.perPageOptions = [
				{ index: 1, num: 15 },  // These are objects because angular might explode
				{ index: 2, num: 30 },  // when passing a simple array to ng-repeat
				{ index: 3, num: 50 },
				{ index: 4, num: 100 }
			];

			// COMPUTED OBSERVABLES
			$scope.$watch('pageCount', function() {
				$scope.verifyBtns($scope.currentPage);
			});

			$scope.$watch('currentPage', function(newValue) {
				$scope.currentPageDisplay = newValue;
				$scope.verifyBtns($scope.currentPageDisplay);
			});

			$scope.setCurrentPage = function(newValue) {
				if (!isNaN(newValue)) {
					if (newValue && (newValue <= 0)){
						$scope.currentPage = 1;
					} else if (newValue && (newValue > $scope.pageCount)) {
						$scope.currentPage = $scope.pageCount ? $scope.pageCount : 1;
					} else if (newValue != $scope.currentPage) {
						$scope.currentPage = newValue;
					}

					if ($scope.useSearch) {
						$location.search('page', $scope.currentPage);
					}
				}
				$scope.currentPageDisplay = $scope.currentPage;
				$(".pagination input").tooltip('hide');
			};

			$scope.pageInputBlur = function(evt) {
				$scope.setCurrentPage(Number(evt.target.value));
			};

			$scope.pageInputKeyPress = function(evt) {
				if (evt.charCode == 13) {
					$(".pagination input").off('blur').blur().on('blur', function(evt) {
						$scope.pageInputBlur(evt);
						$scope.$digest();
					});
					$scope.setCurrentPage(Number(evt.target.value));
				}
			};

			$scope.verifyBtns = function(newValue) {
				$scope.disablePrevious = (newValue > 1 && newValue <= $scope.pageCount) ? "" : "disabled";
				$scope.disableNext = (newValue < $scope.pageCount) ? "" : "disabled";
			};

			$scope.changePage = function(direction) {
				if ((direction === "next") && ($scope.currentPage < $scope.pageCount)) {
					$scope.currentPage = Math.ceil(Number($scope.currentPage)) + 1;
				} else if ((direction === "prev") && ($scope.currentPage > 1) && ($scope.currentPage <= $scope.pageCount)) {
					$scope.currentPage = Math.ceil(Number($scope.currentPage)) - 1;
				}

				if ($scope.useSearch) {
					$location.search('page', $scope.currentPage);
				}
			};

			$scope.setNumItemsPerPage = function(num) {
				$scope.perPage = num;
				$scope.currentPageDisplay = $scope.currentPage = 1;
				if ($scope.useSearch) {
					$location.search('per_page', $scope.perPage);
					$location.search('page', 1);
				}
			};

			$scope.addHtmlListeners = function() {
				$(".pagination input")
					.off('mouseover mouseout')
					.on('mouseover', function() {
						$(this).tooltip({'trigger': 'manual'});
						$(this).tooltip('show');
					})
					.on('mouseout', function() {
						if (!$(this).is(':focus')) {
							$(this).tooltip('hide');
						}
					});

				// EXIBE NUMERO DE ITENS PARA CIMA NA PAGINACAO DO RODAPE
				$("html").on("click", ".dropdown-toggle", function() {
					var $dropdownToogle = $('.list-control').last().find(".dropdown-toggle");
					var offSetPaginationBottom = $dropdownToogle.offset();
					if (($("html").height() - offSetPaginationBottom.top) <= 200) {
						$dropdownToogle
							.parent()
							.removeClass("dropdown")
							.addClass("dropup");
					}
				});
			};

			$scope.addHtmlListeners();
		}
	}
});

mod.provider('vtexNgPagination',
	{
		config: function(parameters) {
			CONFIG.path = parameters.path;
			CONFIG.hidePagination = parameters.hidePagination;
		},
		$get: function(paginate) {
			return paginate;
		}
	}
);

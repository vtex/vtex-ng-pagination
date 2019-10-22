angular.module('vtex.ngPagination', []).directive('vtPagination', [
  '$location',
  '$parse',
  function($location, $parse) {
    return {
      restrict: 'E',
      scope: {
        itemCount: '=itemCount',
        pageCount: '=pageCount',
        currentPage: '=currentPage',
        perPage: '=perPage',
        perPageOptions: '@perPageOptions',
        useSearch: '=search',
        maxPage: '=maxPage',
      },
      templateUrl: 'vtex-ng-pagination.html',
      link: function(scope) {
        // Disable buttons control
        scope.disablePrevious = 'disabled'
        scope.disableNext = ''

        // Defaults
        scope.perPage = scope.perPage || 15
        scope.currentPage = scope.currentPage || 1
        scope.currentPageDisplay = scope.currentPage
        scope.maxPage = Math.min(scope.maxPage || 100000, scope.pageCount)

        scope.perPageOptions = $parse(scope.perPageOptions)

        if (
          !scope.perPageOptions ||
          scope.perPageOptions.constructor !== Array ||
          !scope.perPageOptions.length ||
          scope.perPageOptions === 'default'
        ) {
          scope.perPageOptions = [
            { index: 1, num: 15 }, // These are objects because angular might explode
            { index: 2, num: 30 }, // when passing a simple array to ng-repeat
            { index: 3, num: 50 },
            { index: 4, num: 100 },
          ]
        }

        // Watchers
        scope.$watch('pageCount', function() {
          scope.verifyBtns(scope.currentPage)
        })

        scope.$watch('currentPage', function(newValue) {
          scope.currentPageDisplay = Math.min(newValue, scope.maxPage)
          scope.verifyBtns(scope.currentPageDisplay)
        })

        // Methods on scope
        scope.setCurrentPage = function(newValue) {
          if (newValue && newValue <= 0) {
            scope.currentPage = 1
          } else {
            scope.currentPage = Math.min(newValue, scope.maxPage)
          }

          if (scope.useSearch) {
            $location.search('page', scope.currentPage)
          }

          scope.currentPageDisplay = scope.currentPage
        }

        scope.pageInputBlur = function(evt) {
          scope.setCurrentPage(Number(evt.target.value))
        }

        scope.pageInputKeyPress = function(evt) {
          if (evt.charCode == 13) {
            $('.pagination input')
              .off('blur')
              .blur()
              .on('blur', function(evt) {
                scope.pageInputBlur(evt)
                if (!scope.$$phase) {
                  scope.$digest()
                }
              })
            scope.setCurrentPage(Number(evt.target.value))
          }
        }

        scope.verifyBtns = function(newValue) {
          scope.disablePrevious =
            newValue > 1 && newValue <= scope.pageCount ? '' : 'disabled'
          scope.disableNext =
            newValue < scope.pageCount && newValue < scope.maxPage
              ? ''
              : 'disabled'
        }

        scope.changePage = function(direction) {
          if (direction === 'next' && scope.currentPage < scope.pageCount) {
            scope.currentPage = Math.ceil(Number(scope.currentPage)) + 1
          } else if (
            direction === 'prev' &&
            scope.currentPage > 1 &&
            scope.currentPage <= scope.pageCount
          ) {
            scope.currentPage = Math.ceil(Number(scope.currentPage)) - 1
          }

          if (scope.useSearch) {
            $location.search('page', scope.currentPage)
          }
        }

        scope.setNumItemsPerPage = function(num) {
          scope.perPage = num
          scope.currentPageDisplay = scope.currentPage = 1
          if (scope.useSearch) {
            $location.search('per_page', scope.perPage)
            $location.search('page', 1)
          }
        }

        scope.addHtmlListeners = function() {
          /* Changes y-orientation of perPage options if on bottom */
          $('html').on('click', '.dropdown-toggle', function() {
            var $dropdownToogle = $('.list-control')
              .last()
              .find('.dropdown-toggle')
            var offSetPaginationBottom = $dropdownToogle.offset()
            if ($('html').height() - offSetPaginationBottom.top <= 200) {
              $dropdownToogle
                .parent()
                .removeClass('dropdown')
                .addClass('dropup')
            }
          })
        }

        scope.addHtmlListeners()
      },
    }
  },
])

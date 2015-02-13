expect = chai.expect

$scope = undefined
scope = undefined
$compile = undefined
element = undefined
newDirective = undefined


beforeEach ->
  module 'vtex.ngPagination'
  module 'vtex.ngPaginationTemplates'

  inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $compile = _$compile_

    $scope.paging =
      pages: 100
      page: 1
      total: 1000
      perPage: 10

  element =
    '<vt-pagination search="true"
                    page-count="paging.pages"
                    current-page="paging.page"
                    item-count="paging.total"
                    per-page="paging.perPage"></vt-pagination>'

  newDirective = ->
    element = $compile( angular.element element ) $scope
    $scope.$digest()
    scope = element.isolateScope()


describe 'directive compile/link', ->
  beforeEach -> newDirective()

  it 'should have evaluated correct scope bindings in attributes', (done) ->
    expect(scope.useSearch).to.equal(true)
    expect(scope.pageCount).to.equal($scope.paging.pages)
    expect(scope.currentPage).to.equal($scope.paging.page)
    expect(scope.itemCount).to.equal($scope.paging.total)
    expect(scope.perPage).to.equal($scope.paging.perPage)

    done()


describe 'Location Search handling', ->
  $location = undefined
  beforeEach ->
    inject (_$location_) -> $location = _$location_
    newDirective()

  it 'setCurrentPage # should set current page in location hash', (done) ->
    scope.setCurrentPage 94
    currentPage = $location.search()['page']

    expect(currentPage).to.equal 94

    done()

  it 'setNumItemsPerPage # should set given perPage int number in location hash', (done) ->
    scope.setNumItemsPerPage 50
    currentPerPage = $location.search()['per_page']

    expect(currentPerPage).to.equal 50

    done()

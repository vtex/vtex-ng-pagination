expect = chai.expect

beforeEach ->
  module 'vtex.ngPagination'

describe 'Location Search handling', ->
  $location = undefined
  scope = undefined
  element = undefined

  beforeEach ->
    inject ($rootScope, $compile, _$location_) ->
      $location = _$location_
      scope = $rootScope.$new()

      element = '<vt-pagination search="true"></vt-pagination>'
      element = $compile(element)(scope)

      scope.$digest()

  it 'setCurrentPage # should set current page in location hash', (done) ->
    scope.setCurrentPage(1)
    currentPage = $location.search 'page'
    expect(currentPage).to.equal(1)

    done()

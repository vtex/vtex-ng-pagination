angular.module("vtexNgPagination").run(function($templateCache) { 
  $templateCache.put('vtex-ng-pagination.html',
    "<div class=\"list-control list-control-bottom pull-right\" ng-show=\"!hidePagination && !hidePagination || (itemCount > 15)\">\n" +
    "    <ul class=\"nav nav-pills pull-left\">\n" +
    "        <li class=\"padding muted\">\n" +
    "            Itens: <strong>{{itemCount}}</strong>\n" +
    "        </li>\n" +
    "        <li class=\"padding muted vtex-showing\">\n" +
    "            Exibindo:\n" +
    "        </li>\n" +
    "        <li class=\"dropdown\">\n" +
    "            <a class=\"dropdown-toggle\" role=\"button\" data-toggle=\"dropdown\" href=\"javascript:void(0)\">\n" +
    "                <strong>{{perPage}}</strong>\n" +
    "                <b class=\"caret\"></b>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu pagination-menu\">\n" +
    "                <li>\n" +
    "                    <a tabindex=\"-1\" ng-click=\"setNumItemsPerPage(15)\">\n" +
    "                        <span>15</span>\n" +
    "                    </a>\n" +
    "                    <a tabindex=\"-1\" ng-click=\"setNumItemsPerPage(30)\">\n" +
    "                        <span>30</span>\n" +
    "                    </a>\n" +
    "                    <a tabindex=\"-1\" ng-click=\"setNumItemsPerPage(50)\">\n" +
    "                        <span>50</span>\n" +
    "                    </a>\n" +
    "                    <a tabindex=\"-1\" ng-click=\"setNumItemsPerPage(100)\">\n" +
    "                        <span>100</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <div class=\"pagination pull-left\">\n" +
    "        <ul>\n" +
    "            <li ng-class=\"disablePrevious\">\n" +
    "                <a title=\"Página anterior\" ng-click=\"changePage('prev')\"><i class=\"icon-caret-left\"></i></a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <input class=\"input-mini pull-left\" type=\"text\" ng-model=\"currentPageDisplay\" ng-blur=\"pageInputBlur($event)\" ng-keypress=\"pageInputKeyPress($event)\" data-original-title=\"Página {{currentPage}} de {{pageCount}}\">\n" +
    "            </li>\n" +
    "            <li ng-class=\"disableNext\">\n" +
    "                <a title=\"Próxima página\" ng-click=\"changePage('next')\"><i class=\"icon-caret-right\"></i></a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>"
  );
 });
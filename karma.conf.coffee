module.exports = (config) ->
  config.set
    browsers: ['PhantomJS']
    frameworks: ['mocha', 'chai']
    files: [
      'http://io.vtex.com.br/front-libs/jquery/2.0.3/jquery-2.0.3.js',
      'http://io.vtex.com.br/front-libs/angular/1.3.6/angular.js',
      'src/*.js',
      'src/*.html',
      'spec/angular/*.js',
      'spec/*.coffee'
    ]
    client:
      mocha:
        ui: 'tdd'
    preprocessors:
      '**/*.coffee': ['coffee']
      '**/*.html': ['ng-html2js']
    ngHtml2JsPreprocessor:
      moduleName: 'vtex.ngPaginationTemplates'
      stripPrefix: 'src/'

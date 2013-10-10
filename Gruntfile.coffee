module.exports = (grunt) ->
	pkg = grunt.file.readJSON('package.json')

	# Project configuration.
	grunt.initConfig
		# App variables
		relativePath: ''

		# Tasks
		clean: ['build']
		copy:
			main:
				expand: true
				cwd: 'src/'
				src: ['**', '!coffee/**', '!**/*.less']
				dest: 'build/<%= relativePath %>'

		uglify:
			main:
				files:
					'build/<%= relativePath %>/vtex-ng-pagination-with-template.min.js':
						['build/vtex-ng-pagination.js', 'build/vtex-ng-pagination-template.js']
				options:
					mangle: false

		ngtemplates:
			app:
				cwd: 'src/'
				src: '*.html'
				dest: 'build/<%= relativePath %>/vtex-ng-pagination-template.js'
				options:
					bootstrap:  (module, script) ->
						'angular.module("vtexNgPagination").run(function($templateCache) { ' + script + ' });'

	grunt.loadNpmTasks name for name of pkg.dependencies when name[0..5] is 'grunt-'

	grunt.registerTask 'default', ['copy', 'ngtemplates', 'uglify']

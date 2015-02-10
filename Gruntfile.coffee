module.exports = (grunt) ->
	pkg = grunt.file.readJSON('package.json')

	grunt.initConfig
		clean: ['build', 'dist']

		copy:
			main:
				expand: true
				cwd: 'src/'
				src: ['**', '!**/*.less', '!**/*.html']
				dest: 'build/'
			oms:
				cwd: 'dist/'
				src: ['vtex-ng-pagination.min.js', 'vtex-ng-pagination.min.css']
				dest: '../vcs.order-management-ui/src/lib/vtex-ng-pagination/'
				expand: true

		less:
			main:
				expand: true
				cwd: 'src/'
				src: ['**/**.less']
				dest: 'build/'
				ext: '.css'

		cssmin:
			main:
				expand: true
				cwd: 'build/'
				src: ['**/**.css']
				dest: 'dist/'
				ext: '.min.css'
				options:
					keepSpecialComments: 1
					banner: '/* ' + pkg.name + ' - v' + pkg.version + ' @' + pkg.repository.url + ' */'

		uglify:
			main:
				files:
					'dist/<%= relativePath %>/vtex-ng-pagination.min.js':
						['build/vtex-ng-pagination.js', 'build/vtex-ng-pagination-template.js']
				options:
					sourceMap: true
					banner: '/* ' + pkg.name + ' - v' + pkg.version + ' @' + pkg.repository.url + ' */'

		ngtemplates:
			app:
				cwd: 'src/'
				src: '**/**.html'
				dest: 'build/vtex-ng-pagination-template.js'
				options:
					module: 'vtex.ngPagination'

		watch:
			oms:
				files: ['src/**']
				tasks: ['default', 'copy:oms']

	grunt.loadNpmTasks name for name of pkg.dependencies when name[0..5] is 'grunt-'

	grunt.registerTask 'default', ['clean', 'copy:main', 'ngtemplates', 'less', 'uglify', 'cssmin']
	grunt.registerTask 'oms', ['default', 'copy:oms', 'watch:oms']

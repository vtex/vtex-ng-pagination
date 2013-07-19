path = require('path')
fs = require('fs')

module.exports = (grunt) ->

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

		coffee:
			main:
				expand: true
				cwd: 'src/coffee'
				src: ['**/*.coffee']
				dest: 'build/<%= relativePath %>/js/'
				ext: '.js'

			test:
				expand: true
				cwd: 'spec/'
				src: ['**/*.coffee']
				dest: 'build/<%= relativePath %>/spec/'
				ext: '.js'

		less:
			main:
				files:
					'build/<%= relativePath %>/style/main.css': 'src/style/main.less'

		karma:
			options:
				configFile: 'karma.conf.js'
			unit:
				background: true
			deploy:
				singleRun: true

		watch:
			options:
				livereload: true
			dev:
				files: ['src/**/*.html', 'src/**/*.coffee', 'src/**/*.js']
				tasks: ['dev']


	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-less'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-cssmin'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-karma'

	grunt.registerTask 'default', ['dev-watch']

	# Dev
	grunt.registerTask 'dev', ['clean', 'copy:main', 'coffee']
	grunt.registerTask 'dev-watch', ['dev', 'watch:dev']

	# Test
	grunt.registerTask 'test', ['dev', 'karma:deploy']
	grunt.registerTask 'test-watch', ['dev', 'karma:unit', 'watch:test']
	
	# TDD
	grunt.registerTask 'tdd', ['dev', 'connect', 'karma:unit', 'remote', 'watch:test']
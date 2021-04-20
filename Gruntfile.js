// Grunt tasks

module.exports = function (grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
		'* <%= pkg.name %> - v<%= pkg.version %> - MIT LICENSE <%= grunt.template.today("yyyy-mm-dd") %>. \n' +
		'* @author <%= pkg.author %>\n' +
		'*/\n',

		clean: {
			dist: ['src']
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			app: {
				src: ['app/modules/**/*.js']
			}
		},

		karma: {
			unit: {
			  configFile: 'karma.conf.js',
			  unit: {
				options: {
				  files: ['app/modules/**/*-test.js']
				}
			  }
			}
		},

		exec: {
			bowerInstaller: 'bower-installer'
		},

		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: false
			},
			base: {
				src: [
					// Angular Project Dependencies,
					'app/app.js',
					'app/filter.js',
					'app/app.config.js',
					'app/modules/**/*Module.js',
					'app/modules/**/*Route.js',
					'app/modules/**/*Ctrl.js',
					'app/modules/**/*Service.js',
					'app/modules/**/*Directive.js'
				],
				dest: 'app/assets/js/<%= pkg.name %>-appbundle.js'
			},
			build: {
				src: [
					'app/assets/libs/json3/*.js',
					'app/assets/libs/moment/*.js',
					'app/assets/libs/objectpath/*.js',
					'app/assets/libs/tv4/*.js',
					'app/assets/libs/es5-shim/*.js',					
					// Angular Project Dependencies,
					'app/assets/libs/angular/angular.js',
					'app/assets/libs/angular-resource/*.js',
					'app/assets/libs/angular-animate/*.js',
					'app/assets/libs/angular-aria/*.js',
					'app/assets/libs/angular-filter/*.js',
					'app/assets/libs/angular-mocks/*.js',
					'app/assets/libs/angular-material/*.js',
					'app/assets/libs/angular-material-icons/*.js',
					'app/assets/libs/angular-cookies/*.js',
					'app/assets/libs/angular-sanitize/*.js',
					'app/assets/libs/angular-ui-router/*.js',				
					'app/assets/libs/angular-schema-form/schema-form.js',
					'app/assets/libs/angular-schema-form/bootstrap-decorator.js',
					
				],
				dest: 'app/assets/js/<%= pkg.name %>-angularbundle.js'
			}
		},

		uglify: {
			options: {
				banner: '<%= banner %>',
				report: 'min'
			},
			base: {
				src: [
						'app/assets/js/educere-app-angularbundle.js',
						'app/assets/js/educere-app-appbundle.min.js',
						'app/assets/js/templates.js',
					],
				dest: 'app/assets/js/<%= pkg.name %>-appbundle.min.js'
			}
		},

		connect: {
			server: {
				options: {
					keepalive: true,
					port: 4000,
					base: '.',
					hostname: 'localhost',
					debug: true,
					livereload: true,
					open: true
				}
			}
		},
		concurrent: {
			tasks: ['connect', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},

		watch: {
			karma: {
				files: ['app/modules/**/*-test.js'],
				tasks: ['karma:unit:run'] //NOTE the :run flag
			},
			app: {
				files: '<%= jshint.app.src %>',
				tasks: ['jshint:app'],
				options: {
					livereload: true
				}
			}
		},

		injector: {
			options: {},
			dev: {
				files: {
					'index.html': [
						'bower.json',
						'app/app.js',
						'app/app.config.js',
						'app/filter.js',
						'app/**/*Module.js',
						'app/**/*Route.js',
						'app/**/*Ctrl.js',
						'app/**/*Service.js',
						'app/**/*Directive.js'
					]
				}
			},
			production: {
				files: {
					'index.html': [
						'app/assets/css/**/*.css',
						'app/assets/js/*.js'
					]

				}
			}
		},

		ngtemplates: {
			app: {
				src: 'app/modules/**/*.html',
				dest: 'app/assets/js/templates.js',
				options: {
					module: '<%= pkg.name %>',
					root: 'app/',
					standAlone: false
				}
			}
		}



	});

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.loadNpmTasks('grunt-karma');

	// Making grunt default to force in order not to break the project if something fail.
	grunt.option('force', true);

	// Register grunt tasks
	grunt.registerTask("build", [
		//"jshint",		
		"exec",
		//"karma",
		"concat",
		"ngtemplates",
		//"uglify",
		"injector:production",
		//"concurrent",
		"clean"
	]);

	// Development task(s).
	grunt.registerTask('dev', [
		'injector:dev', 
		//'concurrent'
	]);

	grunt.registerTask('test', ['karma']);

};

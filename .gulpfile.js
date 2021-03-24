// VARIABLES & PATHS
let preprocessor = 'sass', // Preprocessor (sass, scss, less, styl)
    fileswatch   = 'html,htm,txt,json,md,woff2,php', // List of files extensions for watching & hard reload (comma separated)
    pageversion  = 'html,htm,php', // List of files extensions for watching change version files (comma separated)
    imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    online       = true, // If «false» - Browsersync will work offline without internet connection
    basename     = require('path').basename(__dirname),
    forProd      = [
					'/**',
					' * @author Alexsab.ru',
					' */',
					''].join('\n');

const { src, dest, parallel, series, watch, task } = require('gulp'),
	sass           = require('gulp-sass'),
	cleancss       = require('gulp-clean-css'),
	concat         = require('gulp-concat'),
	browserSync    = require('browser-sync').create(),
	uglify         = require('gulp-uglify-es').default,
	autoprefixer   = require('gulp-autoprefixer'),
	imagemin       = require('gulp-imagemin'),
	newer          = require('gulp-newer'),
	rsync          = require('gulp-rsync'),
	del            = require('del'),
	connect        = require('gulp-connect-php'),
	header         = require('gulp-header'),
	notify         = require('gulp-notify'),
	rename         = require('gulp-rename'),
	responsive     = require('gulp-responsive'),
	pngquant       = require('imagemin-pngquant'),
	merge          = require('merge-stream'),
	// version        = require('gulp-version-number'),
	// revAll         = require('gulp-rev-all'),
	replace        = require('gulp-replace');

if(typeof projects == 'undefined') 
	global.projects = {};
if(typeof port == 'undefined') 
	global.port = 8100;

function makeid() {
  return (Math.random() + 1).toString(36).substring(7);
}


projects.alfa_center = {
	
	port: ++port,

	base: basename,
	dest: basename,

	styles: {
		src:    basename + '/resources/' + preprocessor + '/**/*',
		//watch:  basename + '/resources/' + preprocessor + '/**/*.'+preprocessor,
		dest:   basename + '/public/css',
		output: 'main.min.css',
	},

	scripts: {
		src: [
			basename + '/resources/libs/jquery/jquery-2.2.4.min.js',
			basename + '/resources/libs/Magnific-Popup-master/jquery.magnific-popup.js',
			'node_modules/slick-carousel/slick/slick.js',
			basename + '/resources/libs/lazyload/lazyload.js',
			basename + '/resources/libs/waypoints.min.js',
			basename + '/resources/libs/animate/animate-css.js',
			basename + '/resources/libs/sweetalert.min.js',
			basename + '/resources/js/common.js',
		],
		dest:       basename + '/public/js',
		output:     'scripts.min.js',
	},

	images: {
		src:  basename + '/resources/img/**/*',
		dest: basename + '/public/img',
	},

	code: {
		src: [
			basename  + '/**/*.{' + fileswatch + '}',
		],
	},
	version: {
		src: [
			basename  + '/**/*.{' + pageversion + '}',
		],
	},
	forProd: [
		'/**',
		' * @author https://github.com/newstreetpunk',
		' * @editor https://github.com/alexsab',
		' */',
		''].join('\n'),
}




/* alfa_center BEGIN */

// Local Server
function alfa_center_browsersync() {
	connect.server({
		port: projects.alfa_center.port,
		base: projects.alfa_center.base,
	}, function (){
		browserSync.init({
			//server: { baseDir: projects.kia.base + '/' },
			proxy: '127.0.0.1:' + projects.alfa_center.port,
			notify: false,
			online: online
		});
	});
};

// Custom Styles
function alfa_center_styles() {
	return src(projects.alfa_center.styles.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.alfa_center.styles.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.alfa_center.styles.dest))
	.pipe(browserSync.stream())
};

// function alfa_center_manifest() {
// 	return src([projects.alfa_center.styles.src])
// 	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
// 	.pipe(concat(projects.alfa_center.styles.output))
// 	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
// 	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
// 	.pipe(dest(projects.alfa_center.styles.dest))
// 	.pipe(revAll.revision())
// 	.pipe(dest(projects.alfa_center.styles.dest))
// 	.pipe(revAll.versionFile())
// 	.pipe(dest(projects.alfa_center.styles.dest));
// };
// exports.hyundai_service_manifest = alfa_center_manifest;

// function alfa_center_version() {
// 	return src(projects.alfa_center.code.src)
//     .pipe(version({
// 			'value': '%MDS%',
// 			'append': {
// 				'key': 'v',
// 				'to': ['css', 'js'],
// 			},
// 		})
//     )
//     .pipe(dest(function (file) {
//         return file.base;
//     }));
// };
// exports.hyundai_service_version = alfa_center_version;

exports.hyundai_service_versioningCss = () => {
  return src(projects.alfa_center.code.src)
    .pipe(replace(/(.*)\.css\?(v=.+&)*(.*)/g, '$1.css?v='+makeid()+'&$3'))
    .pipe(replace(/(.*)\.css\"(.*)/g, '$1.css?v='+makeid()+'"$2'))
    .pipe(replace(/(.*)\.css\'(.*)/g, '$1.css?v='+makeid()+'\'$2'))
    .pipe(dest(function (file) {
        return file.base;
    }));
};

exports.hyundai_service_versioningJs = () => {
  return src(projects.alfa_center.code.src)
    .pipe(replace(/(.*)\.js\?(v=.+&)*(.*)/g, '$1.js?v='+makeid()+'&$3'))
    .pipe(replace(/(.*)\.js\"(.*)/g, '$1.js?v='+makeid()+'"$2'))
    .pipe(replace(/(.*)\.js\'(.*)/g, '$1.js?v='+makeid()+'\'$2'))
    .pipe(dest(function (file) {
        return file.base;
    }));
};

exports.hyundai_service_versioningImage = () => {
  return src(projects.alfa_center.code.src)
    .pipe(replace(/(.*)\.(png|jpg|jpeg|gif)\?(_v=.+&)*(.*)/g, '$1.$2?v='+makeid()+'&$4'))
    .pipe(replace(/(.*)\.(png|jpg|jpeg|gif)\"(.*)/g, '$1.$2?v='+makeid()+'"$3'))
    .pipe(replace(/(.*)\.(png|jpg|jpeg|gif)\'(.*)/g, '$1.$2?v='+makeid()+'\'$3'))
    .pipe(dest(function (file) {
        return file.base;
    }));
};


// Scripts
function alfa_center_scripts() {
	return src(projects.alfa_center.scripts.src)
	.pipe(concat(projects.alfa_center.scripts.output))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.alfa_center.forProd))
	.pipe(dest(projects.alfa_center.scripts.dest))
	.pipe(browserSync.stream())
};

function alfa_center_images() {
	return src(projects.alfa_center.images.src)
	.pipe(newer(projects.alfa_center.images.dest))
	// .pipe(imagemin([
 //            pngquant(),            
 //        ],{
 //            verbose: true
 //        }))
	.pipe(dest(projects.alfa_center.images.dest))
	.pipe(browserSync.stream())
}

function alfa_center_cleanimg() {
	return del('' + projects.alfa_center.images.dest + '/**/*', { force: true })
}

function alfa_center_watch() {
	watch(projects.alfa_center.styles.src, alfa_center_styles);
	watch(projects.alfa_center.scripts.src, alfa_center_scripts);
	//watch(projects.alfa_center.images.src, alfa_center_cleanimg);
	watch(projects.alfa_center.images.src, alfa_center_images);
	watch(projects.alfa_center.code.src).on('change', browserSync.reload);
};

exports.hyundai_service = parallel(alfa_center_images, alfa_center_styles, alfa_center_scripts, alfa_center_browsersync, alfa_center_watch);

/* alfa_center END */


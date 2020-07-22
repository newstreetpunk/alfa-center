// npm install gulp-pngquant --save-dev

pngquant = require('imagemin-pngquant')

alfa_center: {
		port: ++port,

		base: base.alfa_center,
		dest: base.alfa_center,

		styles: {
			src:    base.alfa_center + '/resources/' + preprocessor + '/**/*',
			//watch:  base.alfa_center + '/resources/' + preprocessor + '/**/*.'+preprocessor,
			dest:   base.alfa_center + '/public/css',
			output: 'main.min.css',
		},

		scripts: {
			src: [
				//'node_modules/jquery/dist/jquery.min.js',
				'node_modules/slick-carousel/slick/slick.min.js',
				base.alfa_center + '/resources/js/common.js',
			],
			dest:       base.alfa_center + '/public/js',
			output:     'scripts.min.js',
		},

		images: {
			src:  base.alfa_center + '/resources/img/**/*',
			dest: base.alfa_center + '/public/img',
		},

		code: {
			src: [
				base.alfa_center  + '/**/*.{' + fileswatch + '}'
			],
		},
		forProd: [
			'/**',
			' * @author https://github.com/newstreetpunk',
			' * @editor https://github.com/alexsab',
			' */',
			''].join('\n'),
	},

// Alfa Center
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
	.pipe(imagemin([
            pngquant(),            
        ],{
            verbose: true
        }))
	.pipe(dest(projects.alfa_center.images.dest))
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

exports.alfa_center = parallel(alfa_center_images, alfa_center_styles, alfa_center_scripts, alfa_center_browsersync, alfa_center_watch);

/* alfa_center END */
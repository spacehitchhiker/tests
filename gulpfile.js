const gulp = require('gulp');
const stylus = require('gulp-stylus');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
const rigger = require('gulp-rigger');
const del = require('del');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const svgo = require('gulp-svgo');
const cache = require('gulp-cache');
const browserSync = require('browser-sync').create();

const cssFiles = [
	'src/style/style.styl',
	// 'src/style/chunk/*.styl', --- раскоментить при сборки в продакшн ---
]
const libCssFiles = ('src/style/dist/*')

const libJsFiles = ('src/js/dist/*')

const htmlFiles = ('src/*.html')

const jsFiles = ('src/js/main.js')


const imageFiles = ('src/img/**/*.*')
const fontsFiles = ('src/fonts/**/*.*')
const svgFiles = ('src/svg/**/*.*')


gulp.task('clear', () =>
	cache.clearAll()
);

function style() {
	return gulp.src(cssFiles)
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'ERROR Stylus Сompilation',
				message: err.message
			}))
		}))
		.pipe(stylus())
		.pipe(postcss([ autoprefixer() ]))
		.pipe(cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('build/css/'))
		.pipe(browserSync.stream());
}

function libCss() {
	return gulp.src(libCssFiles)
	.pipe(gulp.dest('build/css/'))
	.pipe(browserSync.stream());
}

function html() {
	return gulp.src(htmlFiles)
		.pipe(rigger())
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.stream());
}

function libJs() {
	return gulp.src(libJsFiles)
	.pipe(gulp.dest('build/js/'))
	.pipe(browserSync.stream());
}

function js() {
	return gulp.src(jsFiles)
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'ERROR JS',
				message: err.message
			}))
		}))
		.pipe(gulp.dest('build/js/'))
		.pipe(browserSync.stream());
}

function image() {
	return gulp.src(imageFiles)
		.pipe(imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.jpegtran({
				progressive: true
			}),
			imagemin.optipng({
				optimizationLevel: 5
			}),
			imagemin.svgo({
				plugins: [{
						removeViewBox: true
					},
					{
						cleanupIDs: false
					}
				]
			})
		]))
		.pipe(svgo())
		.pipe(gulp.dest('build/img/'))
		.pipe(browserSync.stream());
}



function fonts() {
	return gulp.src(fontsFiles)
		.pipe(gulp.dest('build/fonts/'))
}

function svg() {
	return gulp.src(svgFiles)
		.pipe(svgo())
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			},
		}))
		.pipe(gulp.dest('build/img/'))
		.pipe(browserSync.stream());
}

function clean() {
	return del(['build/*'])
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./build"
		},
		tunnel: false,
		notify: false,
		host: 'localhost',
		port: 9000,
		logPrefix: "MyBuild"
	});

	gulp.watch('src/style/**/*.styl', style);
	gulp.watch('src/style/dist/*.css', libCss);
	gulp.watch('src/js/**/*.js', js);
	gulp.watch('src/style/dist/*.js', libJs);
	gulp.watch('src/**/*.html', html).on('change', browserSync.reload);
	gulp.watch('src/img/**/*.*', image).on('change', browserSync.reload);
	gulp.watch('src/svg/**/*.*', svg).on('change', browserSync.reload);
}

gulp.task('libCss', libCss);
gulp.task('style', style);
gulp.task('libJs', libJs);
gulp.task('js', js);
gulp.task('html', html);
gulp.task('image', image);
gulp.task('fonts', fonts);
gulp.task('svg', svg);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(style, libCss, libJs, js, html, image, fonts, svg)));

gulp.task('default', gulp.series('build', 'clear', 'watch'));
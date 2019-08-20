const { src, dest, series, parallel, watch } =require('gulp');

var uglify =
    require('gulp-uglify');

// var concat = require('gulp-concat');

// var uglifycss = require('gulp-uglifycss');

var handlebars = require('gulp-handlebars');

// var sass =
//     require('gulp-sass');

var wrap = require('gulp-wrap');

var declare = require('gulp-declare');



/*

Gulp task to compile Sass files

*/


// function
//     gulpStyle() {

//     return src('./styles/*.scss')

//         .pipe(sass().on('error',
//             sass.logError))

//         .pipe(dest('./styles'));

// }



/*

Gulp task to compile Templates files

*/

function templates() {

    return src('./templates/*.hbs')

        .pipe(handlebars())

        .pipe(wrap('Handlebars.template(<%= contents %>)'))

        .pipe(declare({

            namespace:
                'portfolio.templates',

            noRedeclare:
                true, // Avoid duplicate declarations

        }))

        .pipe(uglify())

        .pipe(dest('./templates/'));

}



/*

Gulp task to compile CSS

*/

// function minifyCss() {

//     return src('./styles/*.css')

//         .pipe(concat('payment.min.css'))

//         .pipe(uglifycss({

//             "maxLineLen":
//                 80,

//             "uglyComments":
//                 true

//         }))

//         .pipe(dest('./prod-build/'));

// }



/*

Gulp task to compile JavaScripts

*/

// function minifyScripts() {

//     return src(['./js/*.js'])

//         .pipe(concat('payment.min.js'))

//         .pipe(uglify())

//         .pipe(dest('./prod-build/'));

// }



// function minifyVendor() {

//     return src(['./vendor/*.js'])

//         .pipe(concat('vendor.min.js'))

//         .pipe(uglify())

//         .pipe(dest('./prod-build/'));

// }



/*

Gulp task to compile on each file change

*/

function gulpWatch() {

    //gulp.watch('./js/*.js', ['scripts']);

    // watch('./styles/*.scss',
    //     series(gulpStyle));

    watch('./templates/*.hbs',
        series(templates));

}



exports.watch =
    gulpWatch;

// exports['dev-build'] = parallel(gulpStyle, templates);

exports.templates = templates;

// exports['prod-build'] =
//     parallel(

//         templates,

//         minifyScripts,

//         minifyVendor,

//         series(gulpStyle, minifyCss)

//     );
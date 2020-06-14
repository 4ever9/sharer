const {src, dest, watch, parallel, series} = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const connect = require('gulp-connect');

function js() {
    return src('js/*.js')
        // The gulp-uglify plugin won't update the filename
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(dest('dist/'))
        .pipe(connect.reload());
}

function serve() {
    return connect.server({
        root: '.',
        livereload: true,
        port: 3030
    });
}

exports.default = series(js, function () {
    watch('js/*.js', js)
})

exports.dev = series(js, parallel(serve, function () {
    watch('js/*.js', js)
    watch('./*.html', function () {
        return src('./*.html')
            .pipe(dest('./'))
            .pipe(connect.reload());
    })
}))
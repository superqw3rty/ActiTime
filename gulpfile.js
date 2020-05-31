"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();


function htmlbuild() {
  return gulp
  .src('./source/*.html')
  .pipe(gulp.dest('./build/'))
}

function css() {
  return gulp
    .src('./source/scss/style.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(autoprefixer(['last 2 versions', '> 1%'], {cascade: true}))    
    .pipe(gulp.dest('./source/css/'))
    .pipe(browsersync.stream())
}

function cssBuild() {
  return gulp
    .src('./source/scss/style.scss')
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(autoprefixer(['last 2 versions', '> 1%'], {cascade: true}))
    .pipe(gulp.dest('./build/css/'))    
    .pipe(browsersync.stream())
}

function scripts() {
  return (
    gulp
      .src(["./source/js/**/*"])
      .pipe(plumber())
      .pipe(gulp.dest("./source/js/"))
      .pipe(browsersync.stream())
  );
}

function scriptsBuild() {
  return  gulp.src("./source/js/**/*")
      .pipe(gulp.dest("./build/js/"));
  ;
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./source/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Watch files
function watchFiles() {
  gulp.watch("./source/scss/**/*", css);
  gulp.watch("./source/js/**/*");
  gulp.watch(
    [
      "./source/**/*"
    ],
    gulp.series(browserSyncReload)
  );
  gulp.watch("./source/img/**/*");
}

const js = gulp.series(scripts);
const build = gulp.series(htmlbuild, cssBuild,  scriptsBuild);
const watch = gulp.parallel(watchFiles, browserSync);

exports.css = css;
exports.scripts = scripts;
exports.watch = watch;

exports.build = build;
exports.htmlbuild = htmlbuild;
exports.scriptsBuild = scriptsBuild;
exports.cssBuild = cssBuild;
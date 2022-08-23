import autoprefixer from "autoprefixer";
import browser from "browser-sync";
import csso from "postcss-csso";
import del from "del";
import gulp from "gulp";
import ghpages from "gh-pages";
import htmlmin from "gulp-htmlmin";
import imagemin, { mozjpeg, optipng, svgo } from "gulp-imagemin";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import rename from "gulp-rename";
import sass from "gulp-dart-sass";
import svgstore from "gulp-svgstore";
import terser from "gulp-terser";
import webp from "gulp-webp";

const clean = () => {
  return del("build");
};

const copy = (done) => {
  gulp
    .src(["src/fonts/**/*.{woff,woff2}", "src/css/**", "src/*.ico"], {
      base: "src",
    })
    .pipe(gulp.dest("build"));

  done();
};

const copyImages = () => {
  return gulp.src("src/img/**/*").pipe(gulp.dest("build/img"));
};

const optimizeImages = () => {
  return gulp
    .src("src/img/**/*.{png,jpg,svg,jpeg}")
    .pipe(
      imagemin([
        mozjpeg({ quality: 90, progressive: true }),
        optipng({ optimizationLevel: 3 }),
        svgo(),
      ])
    )
    .pipe(gulp.dest("build/img"));
};

const styles = () => {
  return gulp
    .src("src/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

const html = () => {
  return gulp
    .src("src/**/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        ignoreCustomFragments: [/<br>\s/gi],
      })
    )
    .pipe(gulp.dest("build"));
};

const scripts = () => {
  return gulp.src("src/js/*.js").pipe(terser()).pipe(gulp.dest("build/js"));
};

const svgSprite = () => {
  return gulp
    .src([
      "src/img/icon-*.svg",
      "src/img/logotype/*.svg",
      "src/img/icons/*.svg",
    ])
    .pipe(imagemin([svgo()]))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

const createWebp = () => {
  return gulp
    .src("src/img/**/*.{png,jpg,jpeg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
};

const loadOnGithub = () => {
  return ghpages.publish("build", () => {});
};

const reload = (done) => {
  browser.reload();
  done();
};

const server = (done) => {
  browser.init({
    server: {
      baseDir: "build",
    },
    open: false,
    cors: true,
    notify: false,
    ui: false,
  });

  done();
};

const watcher = () => {
  gulp.watch("src/*.html", gulp.series(html, reload));
  gulp.watch("src/sass/**/*.scss", gulp.series(styles));
  gulp.watch("src/js/*.js", gulp.series(scripts));
  gulp.watch("src/img/*.svg", gulp.series(svgSprite, reload));
};

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(styles, html, scripts, svgSprite/* , createWebp */)
);

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(styles, html, scripts, svgSprite/* , createWebp */),
  gulp.series(server, watcher)
);

export const publish = gulp.series(build, loadOnGithub);

let projectFolder = "dist";
let sourceFolder = "src";
let fs = require("fs");

let path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    fonts: projectFolder + "/fonts/",
  },
  src: {
    html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
    css: sourceFolder + "/sass/style.sass",
    js: sourceFolder + "/js/main.js",
    img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: sourceFolder + "/fonts/*.ttf",
  },
  watch: {
    html: sourceFolder + "/**/*.html",
    css: sourceFolder + "/sass/**/*.sass",
    js: sourceFolder + "/js/**/*.js",
    img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + projectFolder + "/",
};
let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  groupmedia = require("gulp-group-css-media-queries"),
  rename = require("gulp-rename"),
  cleancss = require("gulp-clean-css"),
  babel = require("gulp-babel"),
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp"),
  webphtml = require("gulp-webp-html"),
  webcss = require("gulp-webp-css"),
  svgSprite = require("gulp-svg-sprite"),
  ttfwoff = require("gulp-ttf2woff"),
  ttfwoff2 = require("gulp-ttf2woff2"),
  fonter = require("gulp-fonter"),
  uglify = require("gulp-uglify-es").default;

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + projectFolder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(groupmedia())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(webcss())
    .pipe(dest(path.build.css))
    .pipe(cleancss())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function cssfile() {
  return src(sourceFolder + "/css/*.css")
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(babel())
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 50,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, // 0 to 7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function fonts() {
  src(path.src.fonts).pipe(ttfwoff()).pipe(dest(path.build.fonts));
  return src(path.src.fonts).pipe(ttfwoff2()).pipe(dest(path.build.fonts));
}

function fontsStyle(params) {
  let fileContent = fs.readFileSync(sourceFolder + "/sass/_fonts.sass");
  if (fileContent == "") {
    fs.writeFile(sourceFolder + "/sass/_fonts.sass", "", cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let cFontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split(".");
          fontname = fontname[0];
          if (cFontname != fontname) {
            fs.appendFile(
              sourceFolder + "/sass/_fonts.sass",
              '@include font("' +
                fontname +
                '", "' +
                fontname +
                '", "400", "normal");\r\n',
              cb
            );
          }
          cFontname = fontname;
        }
      }
    });
  }
}

function cb() {}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean(params) {
  return del(path.clean);
}

gulp.task("otfttf", function () {
  return src([sourceFolder + "/fonts/*.otf"])
    .pipe(fonter({ formats: ["ttf"] }))
    .pipe(dest(sourceFolder + "/fonts/"));
});

gulp.task("svgSprite", function () {
  return gulp
    .src([sourceFolder + "/iconsprite/*.svg"])
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../icons/icons.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest(path.build.img));
});

let build = gulp.series(
  clean,
  gulp.parallel(css, cssfile, html, js, images, fonts),
  fontsStyle
);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.cssfile = cssfile;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

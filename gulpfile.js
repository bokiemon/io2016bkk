var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'dist';

  swPrecache.write(path.join('src', 'sw_1.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir,
    runtimeCaching: [{
      urlPattern: /^https:\/\/angularfire-5f9c1.firebaseio.com\/firebaseSessions\/.json/,
      handler: 'networkFirst'
    },{
      urlPattern: /^https:\/\/fonts.googleapis.com\/icon\?family=Material\+Icons/,
      handler: 'networkFirst'
    },{
      urlPattern: /^https:\/\/fonts.gstatic.com\/s\/materialicons\/v17\/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2/,
      handler: 'networkFirst'
    }]
  }, callback);
});

gulp.task('generate-final-sw-file', ['generate-service-worker'], function(){
  return gulp.src(['src/sw_1.js', 'src/sw_push.js'])
    .pipe(concat('sw.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['generate-final-sw-file']);
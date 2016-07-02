var gulp = require('gulp');

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'dist';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
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

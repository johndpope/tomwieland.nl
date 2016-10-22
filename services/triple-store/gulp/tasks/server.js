import gulp from 'gulp'
import gulpDevelopServer from 'gulp-develop-server'
import gulpSaneWatch from 'gulp-sane-watch'
import gulpUtil from 'gulp-util'
import { exists } from 'fs'

gulp.task('server:run', cb => {
  const debounce = 300
  const sourceFilePath = "build/server/server.js"
  const watchPath = "build/server/**/*"

  exists(sourceFilePath, doesExist => {
    if (!doesExist) {
      gulpUtil.log(`Path \`${sourceFilePath}\` does not exist.`)
    } else {
      gulpDevelopServer.listen({
        path: sourceFilePath
      })

      gulpSaneWatch(watchPath, { debounce }, () => gulpDevelopServer.restart())
    }

    cb()
  })
})

import { createReadStream } from 'fs'
import { dirname } from 'path'

import gulp from 'gulp'
import gulpLivescript from 'gulp-livescript'
import gulpSaneWatch from 'gulp-sane-watch'

import handleError from '../lib/handleError'
import log from '../lib/log'

gulp.task('livescript:compile', (cb) => {
  const sourceDirectoryPath = 'src'
  const targetDirectoryPath = 'build'
  const sourcePath = `${sourceDirectoryPath}/**/*.ls`

  return gulp
    .src(sourcePath)
    .pipe(gulpLivescript())
    .on('error', (error) => {
      handleError('livescript:compile', error)
      cb()
    })
    .pipe(gulp.dest(targetDirectoryPath))
    .pipe(log.file('livescript:compile'))
})

gulp.task('livescript:watch', (cb) => {
  const debounce = 300
  const sourceDirectoryPath = 'src'
  const sourcePath = 'src/**/*.ls'
  const targetDirectoryPath = 'build'

  gulpSaneWatch(sourcePath, { debounce, }, (_sourceFilePath) => {
    const sourceFilePath = `${sourceDirectoryPath}/${_sourceFilePath}`
    const targetFilePath = dirname(sourceFilePath.replace(sourceDirectoryPath, targetDirectoryPath))

    gulp
      .src(sourceFilePath)
      .pipe(gulpLivescript())
      .on('error', (error) => {
        handleError('livescript:compile', error)
        cb()
      })
      .pipe(gulp.dest(targetFilePath))
      .pipe(log.file('livescript:watch'))
  })

  cb()
})

'use strict'
require('app-module-path/cwd')

const App = require('./start')
const { 2: command } = process.argv


App.boot(command)

/** Conjuror - Output
 * A CLI interface to output a Conjuror report
 */

"use strict"
var inquirer  = require("inquirer")
var chalk     = require('chalk')

var config = require('../lib/conjuror.config.js')
var Conjuror = require('../lib/conjuror.basic.js')

// CLI Items
var questions = [{
    type: 'list',
    name: 'input',
    choices: [
      '/home/user/Data/TimeTracking/ehealth.json',
      '/home/user/Data/TimeTracking/qubes.json',
      '/home/user/Data/TimeTracking/tt.json',
      '/home/user/Data/TimeTracking/work.json'
    ],
    message: 'Select a dataset to run reports on'
  },{
    type: 'input',
    name: 'date',
    message: 'Specify date or range to filter data by'
  },{
    type: 'checkbox',
    name: 'formats',
    message: 'Specify formats to output the data',
    choices: ['pdf', 'html', 'csv'],
    default: 'pdf'
  },{
    type: 'input',
    name: 'output',
    message: 'What do you want to call this output?',
    default: ''
  },{
    type: 'input',
    name: 'invoicenumber',
    message: 'Does this invoice have a number?'
  },{
    type: 'rawlist',
    name: 'currency',
    message: 'What country do you live in?',
    choices: ['USD', 'Euro', 'GPB', 'Bitcoin'],
    default: 'USD'
  },{
    type: "input",
    name: "extra",
    message: "Any extra information?",
    default: ''
  },{
    type: "list",
    name: "details",
    message: "Would you like to show details of data",
    choices: ['show', 'hide'],
    default: 'show'
  },{
    type: "input",
    name: "message",
    message: "Add an optional message to report"
  }
]

// Run CLI
function runOutput() {

  inquirer.prompt(questions, function(answers) {

    Conjuror.getIngredients(config.get_file_path(), function(config) {
      // don't really care of the status of config for the moment.
      // let's just supply sensible defaults.
      var app_path = __filename.replace('output.js', '')

      var args = {
        targets: [],
        options: answers,
        config: config,
        app_path: app_path
      }

      console.log(args)

      Conjuror.Grow(args)

    })
  })
}

runOutput()

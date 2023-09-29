#!/usr/bin/env node
import {Command} from 'commander'
import inquirer from "inquirer";
// import chalk from 'chalk'
// import * as actions from './logic';
import { getIdQuestions, questions, updateContactQuestions } from './questions'

const cms = new Command()

cms
    .version('1.0.0')
    .description('Contact Management System')

cms
    .command('addContact')
    .alias('a')
    .description('Add a contact')
    .action(() => {
        console.log('=========*** Contact Management System ***==========')
        inquirer.prompt(questions).then((answers) => console.log(answers))
    })

cms
    .command('getContact')
    .alias('g')
    .description('Get Contact')
    .action(() => {
        console.log('=========*** Contact Management System ***==========')
        inquirer.prompt(getIdQuestions).then((answers) => console.log(answers.id))
    })
cms
    .command('updateContact')
    .alias('u')
    .description('Update Contact')
    .action(() => {
        console.log('=========*** Contact Management System ***==========')
        inquirer.prompt(updateContactQuestions).then((answers) => console.log(answers))
    })
cms
    .command('deleteContact')
    .alias('d')
    .description('Delete a contact')
    .action(() => {
        console.log('=========*** Contact Management System ***==========')
        inquirer.prompt(getIdQuestions).then((answers) => console.log(answers.id))
    })
cms
    .command('getContactList')
    .alias('l')
    .description('Get Contact List')
    .action(() => {
        console.log('=========*** Contact Management System ***==========')
        console.log("Contact List")
    })

if(!process.argv.slice(2).length/* || !/[arudl]/.test(process.argv.slice(2))*/) {
    cms.outputHelp()
    process.exit()
}
cms.parse(process.argv)
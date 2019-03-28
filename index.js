#!/usr/bin/env node
"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");

const resume = require("./resume.json");

const main = () => {
  display("Hello, my name is Vitor Manfré and welcome to my resume");
  resumeHandler(resume);
}

const resumeHandler = (resume) => {
  const resumePrompts = {
    type: "list",
    name: "selectedOption",
    message: "What do you want to know about me?",
    choices: [...Object.keys(resume), "Exit"]
  };

  inquirer
    .prompt(resumePrompts)
    .then(optionHandler)
    .then(answerHandler)
    .then(returnInquireHandler)
    .catch(endHandler);
}

const answerHandler = answer => displayAnswer(resume, answer)

const optionHandler = (({ selectedOption }) => {
  switch (selectedOption) {
    case 'Exit':
      throw new Error('END');
    case 'Go Back':
      resumeHandler(resume);
    default:
      return selectedOption
  }
})

const displayAnswer = (resume, answer) => {
  display("--------------------------------------");
  resume[`${answer}`].map(info => {
    display("|   => " + info);
  });
  display("--------------------------------------");
}

const returnInquireHandler = () => {
  const returnPrompts = {
    type: "list",
    name: "selectedOption",
    message: "Go back or Exit?",
    choices: ["Go Back", "Exit"]
  }

  inquirer
    .prompt(returnPrompts)
    .then(optionHandler)
    .catch(endHandler);
}

const endHandler = () => display('Thanks for reading about me!')

const display = content => {
  const response = chalk.bold.green;
  console.log(response(content))
}

main();
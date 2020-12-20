# Frontend Mentor: Pomodoro Timer Challenge

**Challenge**: https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G

> FrontendMentor challenges are provided as ready for implementation
> designs and described functionality. Recently I discovered and played a bit with the
> AlpineJS and Tailwind frameworks and this project look like something that I can try
> to build using these technologies.

![Pomodoro App Preview](./pomodoro-app.gif)

## Overview

The idea of a [Pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) is
that during the day you can block chanks of time of 25 minutes and try to focus on doing
one thing, without any destrcutions.

In the FrontendMentor's design the idea is evolved to have 3 shortcut values to
set common time-chanks of 25, 5 and 15 minutes. Futhermore these values can then
be changed in the application settings.

Original desing providnig the circled progress-bar that runs clockwise and time
increments accordingly, however this part I changed to my liking - progress bar
and time actually reducing values, rather than increasing them. So instead of going
from 00:00 to 25:00, this implemention goes from 25:00 to 00:00 in the end.

Main Features:

- Ability to Start 3 types of timers
- Ability to change visual of the app
- Ability to pause, start and restart the timer
- Ability to customize each of the timers

## Development

The main tools that I used with this project:

- [Alpine JS](https://github.com/alpinejs/alpine) - A micro frontend framework with syntax similar to
  Vue JS. Amazing how easily you can add interactions to the single-page apps without heavy frameworks.
  In this projects the bigger framework might fit better (mostly because handling forms and validation is not
  a strong side of alpine), but in the end the Framework did its job and pretty well.

- [Tailwind CSS](https://tailwindcss.com) - Is a utility-based CSS framework. ideally you need to setup your
  deign system in [tailwind.config.js](./tailwind.config.js) file and use only utility functions in the code,
  no writing classes in CSS needed. It looks ugly on the first glance -> 10-20 classes putted in the HTML
  element, but there is a huge benefit of local scoped styles and that your CSS does not grow as you add new
  features to the application. In this project IMo Tailwind was a huge deal for me, allowing to style modal window
  with all the settings in less than hour.

### Dev Happinnes Tools

I also used some tools that brings joy to the development process :)

- [Husky](https://github.com/typicode/husky) - A really nice tool to run formatting and linting automatically
  before you commit the code, makes your git history a plesent experience
- [Prettier](https://prettier.io) - Opionated code formatter, I do like that I no longer need
  to worry about poorly formated code. And a huge benefir that it can also format CSS and HTML files!
- [Snowpack](https://www.snowpack.dev) - Like webpack but so much faster and requires less configuration.
  Initially I was planning to go with [Parcel](https://parceljs.org/) - my goto build tool that requires
  zero configuration, but sadly support for PostCSS v8 was not there, and hot-reload of styles did not worked
  at all for the Tailwind part of the project. I was pleasently surprised how Snowpack handled the PostCSS
  part without too much hassle.

### HowTo Run The Project

1. First of all you would need a Node installed. See the latest instrcutions [here](https://nodejs.org/en/download/). After this step is completed, check that [NPM](https://www.npmjs.com/get-npm) tool is available to you by running `npm -v` command, that should output to the console the current NPM version installed.

1. Then you would need to install project dependencies from the [package.json](./package.json) file, by running the `npm install` command. This command will install project dependencies to run the project locally and also all development tools that make developing this project more pleasent.

1. `npm run dev` will start the development server and automatically open `localhost:8080` page in your default browser, so you should be able right away to see the project and try making changes in the codebase.

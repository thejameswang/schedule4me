<h1 align="center">
  Schedule4Me
  <br>
</h1>

<h4 align="center">A natural language based, interactive bot for scheduling reminders and meetings on Google Calendar from Slack.</h4>

<p align="center">
  <img src="https://img.shields.io/badge/npm-v5.6.0-blue.svg"
       alt="npm">
  <img src="https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg"
       alt="dependencies">
  <img src="https://img.shields.io/badge/completion-60%25-orange.svg"
      alt="completion">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg"
       alt="license">
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#project-goals">Project Goals</a> •
   <a href="#credits">Credits</a> 
</p>

<div align='center'>
// Insert image here
</div>
<!-- ![GIF](http://recordit.co/aw5jmvVjRn) -->




----

## Key Features

* Simple Reminder System
  + A user can create all day events in Google calendar that serve as reminders
  - For example, typing "Remind me to grab a coffee tomorrow." to the slackbot will create an all day event tomorrow with the description "grab a coffee"
* Basic Meeting Scheduling
  + A user can schedule basic meetings
  - For example, typing "Schedule a meeting with James and Kat for next Thursday at 2pm" to the slackbot will create an event on the following Thursday at 2pm with the description "Meeting" and invitees "James" and "Kat" (using their emails).
* Time Comflicts
  + If an event creates a time conflict, the user will have the option to select from 10 new timeslots over the course of 7 business days.

import util from 'util'
import path from 'path'
import fs from 'fs'
import mongoose from 'mongoose'
import Bot from 'slackbots'

let schedule4meBot = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'schedule4meBot';
  this.user = null;
  this.db = null;
}

util.inherits(schedule5meBot, Bot);

module.exports = schedule4meBot;

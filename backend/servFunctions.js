'use strict';

var http = require('http');
var moment = require('moment');
var md5 = require('md5');

exports.superCounter = function(sentence) {
    var stats = {};

    var letterMatch = sentence.match(/[a-z]/ig) || [];
    stats.letterCount = letterMatch.length;
    stats.wordCount = sentence.split(/[^A-Za-z]/).length;
    stats.avgLetterLength = stats.letterCount / stats.wordCount;

    return stats
};

exports.ageDate = function(inDate) {
  var dateArray = inDate;
  var a = moment(dateArray).toNow(true);
  var b = moment(dateArray).format("dddd, MMMM Do YYYY");
  var dateObj = {
    age: a,
    date: b
  };
  return JSON.stringify(dateObj);
}

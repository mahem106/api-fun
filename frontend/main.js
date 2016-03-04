'use strict';

$(function(init) {
  $('#emailButton').click(getEmail);
  $('#countsButton').click(getCounts);
  $('#dateButton').click(getDate);
  $('#mathButton').click(doMath);
})

function getEmail() {
  var email = $('#email').val();

  $.ajax({
    method: 'GET',
    url: 'http://localhost:8001/email/' + email,
    success: function(response) {
      setEmail(response);
    },
    error: function(error) {
      console.error('error: ', error);
    }
  });
}

function getCounts() {
  var counts = $('#calCountsInput').val();

  $.ajax({
    method: 'GET',
    url: 'http://localhost:8001/sentence/' + counts,
    success: function(response) {
      var parsedData = JSON.parse(response);
      console.log('res: ', parsedData);
      setCounts(parsedData);
    },
    error: function(error) {
      console.error('error: ', error);
    }
  });
}

function getDate() {
  var date = $('#birthDate').val();

  $.ajax({
    method: 'GET',
    url: 'http://localhost:8001/date/' + date,
    success: function(response) {
      var parsedData = JSON.parse(response);
      console.log('res: ', parsedData);
      setDate(parsedData);
    },
    error: function(error) {
      console.error('error: ', error);
    }
  });
}

function doMath() {
  var numArray = $('#math').val().split(',');
  var param;
  var nums;
    if(numArray.length === 1) {
      param = 'square';
      nums = numArray[0]
    } else {
      param = 'sum';
      nums = numArray.join('/');
    }

  $.ajax({
    method: 'GET',
    url: 'http://localhost:8001/' + param + '/' + nums,
    success: function(response) {
      var parsedData = JSON.parse(response);
      setMath(parsedData);
    },
    error: function(error) {
      console.error('error: ', error);
    }
  });
}

function setEmail(data) {
  $('#email').val(data);
}

function setCounts(data) {
  var lc = data.letterCount;
  var wc = data.wordCount;
  var al = data.avgLetterLength;

  $('#calCountsInput').val('Letters: ' + lc + '    |    ' + 'Words: ' + wc + '    |    ' + 'Average: ' + al);
}

function setDate(data) {
  var age = data.age;
  var date = data.date;
  $('#dateResponse').text('Age:  ' + age + '    |    ' + 'Born:  ' + date);
}

function setMath (data) {
  $('#math').val(data);
}

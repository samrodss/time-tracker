'use strict';

const time = document.querySelectorAll('.time');
// select the hour from each category box
const timeSpent = document.querySelectorAll('.time-spent');
const small = document.querySelectorAll('.hours small');

// Call fetchHours with dailyHours immediately when the page loads
window.addEventListener('load', () => {
  fetchHours(dailyHours);
});

// fetches the data from the JSON file to update the hours
/* this function receives a callback function as an argument 
to share the JSON data to other functions*/
function fetchHours(callback) {
  let fetchJSON = fetch('./data.json');
  fetchJSON
    .then((res) => res.json())
    .then((hours) => {
      //passing hours as argument will allow this data to be used in other functions arguments
      callback(hours);
    });
}

// uses the hour argument from the JSON file to access the object property for daily values
function dailyHours(hour) {
  for (let i = 0; i < hour.length; i++) {
    //displays the property "current" of each JSON object
    timeSpent[i].innerHTML = `${hour[i].timeframes.daily.current}hrs`;
    //displays the property "previous" of each JSON object
    small[i].innerHTML = `Yesterday - ${hour[i].timeframes.daily.previous}hrs`;
  }
}
// uses the hour argument from the JSON file to access the object property for weekly values
function weeklyHours(hour) {
  for (let i = 0; i < hour.length; i++) {
    //displays the property "current" of each JSON object
    timeSpent[i].innerHTML = `${hour[i].timeframes.weekly.current}hrs`;
    //displays the property "previous" of each JSON object
    small[i].innerHTML = `Last week - ${hour[i].timeframes.weekly.previous}hrs`;
  }
}
// uses the hour argument from the JSON file to access the object property for monthly values
function monthlyHours(hour) {
  for (let i = 0; i < hour.length; i++) {
    //displays the property "current" of each JSON object
    timeSpent[i].innerHTML = `${hour[i].timeframes.monthly.current}hrs`;
    //displays the property "previous" of each JSON object
    small[
      i
    ].innerHTML = `Last month - ${hour[i].timeframes.monthly.previous}hrs`;
  }
}

/*guarantees that the correct function is callled 
only when the button which contains the id specified is clicked
 */
time.forEach((timeframe) => {
  timeframe.addEventListener('click', () => {
    // when the daily btn is clicked
    if (timeframe.id === 'daily') {
      fetchHours(dailyHours);
      // when the weekly btn is clicked
    } else if (timeframe.id === 'weekly') {
      fetchHours(weeklyHours);
      // when the monthly btn is clicked
    } else {
      fetchHours(monthlyHours);
    }
  });
});

var $newEventBtn = document.querySelector('#new-event-btn');
var $newEventDialog = document.querySelector('#new-event-dialog');
var $newEventForm = document.querySelector('#new-event-form');
var $timeSelect = document.querySelector('#time-select');
var $amPm = document.querySelector('#am-or-pm');
var $newEventDaySelect = document.querySelector('#new-event-day-select');
var $eventTextarea = document.querySelector('#event-textarea');
if (!$newEventBtn) throw new Error('$newEventBtn query has failed');
if (!$newEventDialog) throw new Error('$newEventDialog query has failed');
if (!$newEventForm) throw new Error('$newEventForm query has failed');
if (!$timeSelect) throw new Error('$timeSelect query has failed');
if (!$amPm) throw new Error('$amPm query has failed');
if (!$newEventDaySelect) throw new Error('$newEventDaySelect query has failed');
if (!$eventTextarea) throw new Error('$eventTextarea query has failed');
$newEventBtn.addEventListener('click', function () {
  $newEventDialog.showModal();
});
var data = readData();
function writeData() {
  var dataJson = JSON.stringify(data);
  localStorage.setItem('eventsData', dataJson);
}
function readData() {
  var newDataJson = localStorage.getItem('eventsData');
  var newData = JSON.parse(newDataJson);
  return newData;
}
$newEventForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var formValues = {
    time: $timeSelect.value,
    amPm: $amPm.value,
    day: $newEventDaySelect.value,
    details: $eventTextarea.value,
  };
  data.events.push(formValues);
  writeData();
});

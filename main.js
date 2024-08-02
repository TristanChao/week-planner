var $newEventBtn = document.querySelector('#new-event-btn');
var $newEventDialog = document.querySelector('#new-event-dialog');
var $newEventForm = document.querySelector('#new-event-form');
var $timeSelect = document.querySelector('#time-select');
var $amPm = document.querySelector('#am-or-pm');
var $newEventDaySelect = document.querySelector('#new-event-day-select');
var $eventTextarea = document.querySelector('#event-textarea');
var $daySelect = document.querySelector('#day-select');
var $eventTable = document.querySelector('#event-table');
if (!$newEventBtn) throw new Error('$newEventBtn query has failed');
if (!$newEventDialog) throw new Error('$newEventDialog query has failed');
if (!$newEventForm) throw new Error('$newEventForm query has failed');
if (!$timeSelect) throw new Error('$timeSelect query has failed');
if (!$amPm) throw new Error('$amPm query has failed');
if (!$newEventDaySelect) throw new Error('$newEventDaySelect query has failed');
if (!$eventTextarea) throw new Error('$eventTextarea query has failed');
if (!$daySelect) throw new Error('$daySelect query has failed');
if (!$eventTable) throw new Error('$eventTable query has failed');
$newEventBtn.addEventListener('click', function () {
  $newEventDialog.showModal();
});
var data = readData();
if (!data) {
  data = {
    editing: null,
    events: [],
    dayView: 'Sun',
  };
}
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
  $newEventDialog.close();
});
$daySelect.addEventListener('input', updateEvents);
function updateEvents() {
  var $eventTableRows = document.querySelectorAll('#event-table tbody > tr');
  if (!$eventTableRows) throw new Error('$eventTableRows query has failed');
  for (var i = 0; i < data.events.length; i++) {
    $eventTableRows[i].children[0].textContent = data.events[i].time;
    $eventTableRows[i].children[1].textContent = data.events[i].details;
  }
}

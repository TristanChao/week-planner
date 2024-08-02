var $newEventBtn = document.querySelector('#new-event-btn');
var $newEventDialog = document.querySelector('#new-event-dialog');
var $newEventForm = document.querySelector('#new-event-form');
var $timeSelect = document.querySelector('#time-select');
var $amPm = document.querySelector('#am-or-pm');
var $newEventDaySelect = document.querySelector('#new-event-day-select');
var $eventTextarea = document.querySelector('#event-textarea');
var $daySelect = document.querySelector('#day-select');
var $eventTable = document.querySelector('#event-table');
var $cancelBtn = document.querySelector('#cancel-btn');
if (!$newEventBtn) throw new Error('$newEventBtn query has failed');
if (!$newEventDialog) throw new Error('$newEventDialog query has failed');
if (!$newEventForm) throw new Error('$newEventForm query has failed');
if (!$timeSelect) throw new Error('$timeSelect query has failed');
if (!$amPm) throw new Error('$amPm query has failed');
if (!$newEventDaySelect) throw new Error('$newEventDaySelect query has failed');
if (!$eventTextarea) throw new Error('$eventTextarea query has failed');
if (!$daySelect) throw new Error('$daySelect query has failed');
if (!$eventTable) throw new Error('$eventTable query has failed');
if (!$cancelBtn) throw new Error('$cancelBtn query has failed');
$newEventBtn.addEventListener('click', function () {
  $newEventDialog.showModal();
});
var data = readData();
if (!data) {
  data = {
    editing: null,
    events: [],
    dayView: 'Sun',
    nextId: 1,
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
    id: data.nextId,
  };
  data.nextId++;
  data.events.push(formValues);
  writeData();
  $newEventDialog.close();
  updateEvents();
});
$daySelect.addEventListener('input', function () {
  updateEvents();
  data.dayView = $daySelect.value;
  writeData();
});
document.addEventListener('DOMContentLoaded', function () {
  $daySelect.value = data.dayView;
  updateEvents();
});
function updateEvents() {
  var $eventTableRows = document.querySelectorAll('#event-table tbody > tr');
  if (!$eventTableRows) throw new Error('$eventTableRows query has failed');
  for (var i = 0; i < $eventTableRows.length; i++) {
    $eventTableRows[i].children[0].textContent = '';
    $eventTableRows[i].children[1].textContent = '';
    $eventTableRows[i].children[2].textContent = '';
  }
  var fillRow = 0;
  for (var i = 0; i < data.events.length; i++) {
    if (data.events[i].day === $daySelect.value) {
      $eventTableRows[fillRow].children[0].textContent =
        data.events[i].time + ' ' + data.events[i].amPm;
      $eventTableRows[fillRow].children[1].textContent = data.events[i].details;
      $eventTableRows[fillRow].children[2].appendChild(renderActionButtons());
      $eventTableRows[fillRow].setAttribute(
        'event-id',
        String(data.events[i].id),
      );
      fillRow++;
    }
  }
}
$cancelBtn.addEventListener('click', function () {
  $newEventDialog.close();
  $newEventForm.reset();
});
function renderActionButtons() {
  var $buttonsDiv = document.createElement('div');
  $buttonsDiv.className = 'row space-around';
  var $deleteButton = document.createElement('button');
  var $editButton = document.createElement('button');
  $deleteButton.className = 'delete-button';
  $editButton.className = 'edit-button';
  $deleteButton.textContent = 'DELETE';
  $editButton.textContent = 'EDIT';
  $deleteButton.setAttribute('type', 'button');
  $editButton.setAttribute('type', 'button');
  $buttonsDiv.appendChild($editButton);
  $buttonsDiv.appendChild($deleteButton);
  return $buttonsDiv;
}
$eventTable.addEventListener('click', function (event) {
  var target = event.target;
  if (target.className === 'edit-button') {
    $newEventDialog.showModal();
  }
  if (target.className === 'delete-button') {
    target.closest('tr').remove();
  }
});
console.log('potato');

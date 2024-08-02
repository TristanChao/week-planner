const $newEventBtn = document.querySelector(
  '#new-event-btn',
) as HTMLButtonElement;
const $newEventDialog = document.querySelector(
  '#new-event-dialog',
) as HTMLDialogElement;
const $newEventForm = document.querySelector(
  '#new-event-form',
) as HTMLFormElement;
const $timeSelect = document.querySelector('#time-select') as HTMLSelectElement;
const $amPm = document.querySelector('#am-or-pm') as HTMLSelectElement;
const $newEventDaySelect = document.querySelector(
  '#new-event-day-select',
) as HTMLSelectElement;
const $eventTextarea = document.querySelector(
  '#event-textarea',
) as HTMLTextAreaElement;
const $daySelect = document.querySelector('#day-select') as HTMLSelectElement;
const $eventTable = document.querySelector('#event-table') as HTMLTableElement;

if (!$newEventBtn) throw new Error('$newEventBtn query has failed');
if (!$newEventDialog) throw new Error('$newEventDialog query has failed');
if (!$newEventForm) throw new Error('$newEventForm query has failed');
if (!$timeSelect) throw new Error('$timeSelect query has failed');
if (!$amPm) throw new Error('$amPm query has failed');
if (!$newEventDaySelect) throw new Error('$newEventDaySelect query has failed');
if (!$eventTextarea) throw new Error('$eventTextarea query has failed');
if (!$daySelect) throw new Error('$daySelect query has failed');
if (!$eventTable) throw new Error('$eventTable query has failed');

$newEventBtn.addEventListener('click', () => {
  $newEventDialog.showModal();
});

interface DayEvent {
  day: string;
  time: string;
  amPm: string;
  details: string;
}

interface EventData {
  editing: null | DayEvent;
  events: DayEvent[];
  dayView: string;
}

let data: EventData = readData();

if (!data) {
  data = {
    editing: null,
    events: [],
    dayView: 'Sun',
  };
}

function writeData(): void {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('eventsData', dataJson);
}

function readData(): EventData {
  const newDataJson = localStorage.getItem('eventsData');
  const newData = JSON.parse(newDataJson);
  return newData;
}

$newEventForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const formValues: DayEvent = {
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

function updateEvents(): void {
  const $eventTableRows = document.querySelectorAll(
    '#event-table tbody > tr',
  ) as NodeListOf<HTMLTableRowElement>;
  if (!$eventTableRows) throw new Error('$eventTableRows query has failed');

  for (let i = 0; i < data.events.length; i++) {
    $eventTableRows[i].children[0].textContent = data.events[i].time;
    $eventTableRows[i].children[1].textContent = data.events[i].details;
  }
}

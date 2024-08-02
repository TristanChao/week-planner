const $newEventBtn = document.querySelector(
  '#new-event-btn',
) as HTMLButtonElement;
const $newEventDialog = document.querySelector(
  '#new-event-dialog',
) as HTMLDialogElement;

if (!$newEventBtn) throw new Error('$newEventBtn query failed');
if (!$newEventDialog) throw new Error('$newEventDialog query failed');

$newEventBtn.addEventListener('click', () => {
  $newEventDialog.showModal();
});

interface Event {
  day: string;
  time: string;
  am: boolean;
  details: string;
}

interface EventData {
  editing: null | Event;
  events: Event[];
}

const data: EventData = readData();

function writeData(): void {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('eventsData', dataJson);
}

function readData(): EventData {
  const newDataJson = localStorage.getItem('eventsData');
  const newData = JSON.parse(newDataJson);
  return newData;
}

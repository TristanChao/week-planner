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

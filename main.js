var $newEventBtn = document.querySelector('#new-event-btn');
var $newEventDialog = document.querySelector('#new-event-dialog');
if (!$newEventBtn) throw new Error('$newEventBtn query failed');
if (!$newEventDialog) throw new Error('$newEventDialog query failed');
$newEventBtn.addEventListener('click', function () {
  $newEventDialog.showModal();
});

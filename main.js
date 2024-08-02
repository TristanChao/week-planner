var $newEventBtn = document.querySelector('#new-event-btn');
var $newEventDialog = document.querySelector('#new-event-dialog');
if (!$newEventBtn)
    throw new Error('$newEventBtn query failed');
if (!$newEventDialog)
    throw new Error('$newEventDialog query failed');
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

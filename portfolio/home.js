function makeAcitveTab(id) {
    var element = document.getElementById(id);
    element.classList.remove('text-muted');
    element.classList.add('text-primary');
}

function removeAcitveTab(id) {
    var element = document.getElementById(id);
    element.classList.add('text-muted');
    element.classList.remove('text-primary');
}


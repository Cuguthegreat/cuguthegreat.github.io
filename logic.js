function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
	if (event.target.childElementCount == 0 && event.target.className == "grid-item") {
  		event.preventDefault();
	}
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
	if (event.target.childElementCount == 0 && event.target.className == "grid-item") {
		event.target.appendChild(document.getElementById(data));
	}
}
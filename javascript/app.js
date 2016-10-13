var app = {};

var newElement = document.createElement("p");
newElement.textContent = "New Element!";
newElement.style.color = "red";
newElement.style.float = "right";
document.body.insertBefore(newElement, document.body.firstChild);
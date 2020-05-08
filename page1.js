"use strict";
const input = document.getElementById("message-input");
const button = document.querySelector("button");
const iframe = document.querySelector("iframe");
const channel = new MessageChannel();
const port1 = channel.port1;

// Wait for the iframe to load
iframe.addEventListener("load", onLoad);

function onLoad() {
  // Listen for button clicks
  button.addEventListener("click", onClick);
  // Listen for messages on port1
  port1.onmessage = onMessage;
  // Transfer port2 to the iframe
  iframe.contentWindow.postMessage("init", "*", [channel.port2]);
}

// Post a message on port1 when the button is clicked
function onClick(e) {
  e.preventDefault();
  port1.postMessage(input.value);
  input.value = "";
}

// Handle messages received on port1
function onMessage(e) {
  console.log(e.data);
}

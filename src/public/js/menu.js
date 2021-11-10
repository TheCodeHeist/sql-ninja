"use strict";

const { ipcRenderer } = require("electron");

const closeBtn = document.querySelector(".close-btn");
const minimizeBtn = document.querySelector(".minimize-btn");
const maximizeBtn = document.querySelector(".maximize-btn");
const maxUnmaxIcon = document.querySelector("#max-unmax");

let count = 0;

closeBtn.addEventListener("click", () => {
  ipcRenderer.send("close-window");
});

minimizeBtn.addEventListener("click", () => {
  ipcRenderer.send("minimize-window");
});

maximizeBtn.addEventListener("click", () => {
  ipcRenderer.send("maximize-unmaximize-window");
});

"use strict";

const inputs = document.querySelectorAll("input");
const svg = document.querySelectorAll(`svg`);
const inputContainer = document.querySelectorAll(".input-container");
const firstName = document.querySelector("#f-name");
const lastName = document.querySelector("#l-name");
const email = document.querySelector("#email");
const pass = document.querySelector("#pass");
const claimBtn = document.querySelector(".claim");
const primaryRed = getComputedStyle(document.body)
  .getPropertyValue("--primary-red")
  .trim();

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const addError = function (input) {
  input.classList.add("red-input");
  input.nextElementSibling.style.opacity = "1";
};
const removeError = function (input) {
  input.classList.remove("red-input");
  input.nextElementSibling.style.opacity = "0";
};

// Validation
const validateInputs = function () {
  for (let i = 0; i < inputs.length; i++) {
    const inputID = inputs[i].getAttribute("id");
    document.querySelectorAll(`.error`)[i]?.remove();

    if (inputs[i].value === "") {
      addError(inputs[i]);
      if (!document.querySelector(`.error-${inputID}`)) {
        inputs[i].placeholder = "";
        inputs[i].parentElement.insertAdjacentHTML(
          "afterend",
          `<p class = 'error error-${inputID}'> ${inputs[i].getAttribute(
            "field"
          )} cannot be empty</p>`
        );
      }
    } else {
      removeError(inputs[i]);
    }
  }
  if (!validateEmail(email.value) && email.value !== "") {
    addError(email);
    email.value = "";
    email.placeholder = "email@example/com";
    email.parentElement.insertAdjacentHTML(
      "afterend",
      `<p class = 'error error-email'>Looks like this is not an email</p>`
    );
  }
};

// Adding / Removing Error msgs
inputs.forEach((input) => {
  const errorIcon = input.nextElementSibling;

  // When focusing on input
  input.addEventListener("focusin", function () {
    if (errorIcon.style.opacity === "1") {
      errorIcon.style.opacity = "0";
    }
  });

  input.addEventListener("focusout", function () {
    if (
      errorIcon.style.opacity === "0" &&
      document.querySelector(`.error-${input.getAttribute("id")}`) &&
      input.value === ""
    ) {
      errorIcon.style.opacity = "1";
    }
  });

  // When typing
  input.addEventListener("input", function () {
    const errorEmail = document.querySelector(
      `.error-${input.getAttribute("id")}`
    );

    if (input.value !== "") {
      removeError(input);
      errorIcon.style.opacity = "0";
      document.querySelector(
        `.error-${input.getAttribute("id")}`
      ).style.display = "none";
    } else {
      if (errorEmail) {
        addError(input);
        errorIcon.style.opacity = "1";
        input.getAttribute("id") === "email"
          ? (input.placeholder = "email@example/com")
          : (input.placeholder = "");
        errorEmail.style.display = "block";
      }
    }
  });
});

// Submit
claimBtn.addEventListener("click", function (e) {
  e.preventDefault();
  validateInputs();
});

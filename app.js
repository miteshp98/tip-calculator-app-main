"use strict";

const inputUserBillAmount = document.querySelector("#bill-amount");
const inputNumberOfPeople = document.querySelector("#number-of-people");
const splitTipAmount = document.querySelector(".tip-amount");
const splitTotalAmount = document.querySelector(".total-amount");
const tipButtons = document.querySelectorAll(".tip");
const customTipButton = document.querySelector("#custom-tip");
const resetButton = document.querySelector(".reset-btn");
const errorMessage = document.querySelector(".error");
resetButton.disabled = true;

function calculate(tipValue) {
  const userBill = parseFloat(inputUserBillAmount.value) || 0;
  const numberOfPeople = parseInt(inputNumberOfPeople.value) || 0;

  if (userBill > 0 && numberOfPeople > 0) {
    const tip = tipValue / 100;
    const totalTip = userBill * tip;
    const totalBill = userBill + totalTip;
    const perPersonTip = totalTip / numberOfPeople;
    const perPersonTotal = totalBill / numberOfPeople;

    splitTipAmount.textContent = perPersonTip.toFixed(2);
    splitTotalAmount.textContent = perPersonTotal.toFixed(2);
    resetButton.disabled = false;
    resetButton.classList.add("active");
    errorMessage.style.display = "none";
    inputNumberOfPeople.classList.remove("error-border");
    inputUserBillAmount.classList.remove("error-border");
  } else {
    inputNumberOfPeople.classList.add("error-border");
    inputUserBillAmount.classList.add("error-border");
    errorMessage.style.display = "block";
  }
}

function handleTipButtonClick(event) {
  const selectedButton = event.target;
  const tipValue = parseFloat(selectedButton.value);

  tipButtons.forEach((buttons) => buttons.classList.remove("select"));
  selectedButton.classList.add("select");
  customTipButton.value = null;
  calculate(tipValue);
}

function handleCustomTipInput() {
  const customTipValue = parseFloat(customTipButton.value) || 0;
  tipButtons.forEach((button) => button.classList.remove("select"));
  calculate(customTipValue);
}

function handleInput() {
  tipButtons.forEach((button) => button.classList.remove("select"));
}

function resetCalulation() {
  inputNumberOfPeople.value = "";
  inputUserBillAmount.value = "";
  customTipButton.value = null;
  splitTipAmount.textContent = "0.00";
  splitTotalAmount.textContent = "0.00";
  tipButtons.forEach((button) => button.classList.remove("select"));
  resetButton.classList.remove("active");
  resetButton.disabled = true;
}

tipButtons.forEach((button) =>
  button.addEventListener("click", handleTipButtonClick)
);

customTipButton.addEventListener("input", handleCustomTipInput);
inputUserBillAmount.addEventListener("input", handleInput);
inputNumberOfPeople.addEventListener("input", handleInput);
resetButton.addEventListener("click", resetCalulation);

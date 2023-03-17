const orderForm = document.querySelector(".order_data_form");
const submitBtn = document.querySelector("#submit_btn");
const requiredFields = orderForm.querySelectorAll(
  ".required input, .required textarea"
);
function isEmpty(str) {
  return !str.trim().length;
}

submitBtn.insertAdjacentHTML(
  "afterend",
  `
<input type="" id="submit_btn" class="wide fakeBtn" name="send_order_submit" value="ПОТВЪРДИ ПОРЪЧКАТА" style="
z-index: 10;
position: absolute;
">
`
);

const submitFakeBtn = document.querySelector(".fakeBtn");

submitFakeBtn.addEventListener("click", (e) => {
  console.log("Submit");
  e.preventDefault();
  const addressField = orderForm.querySelector("[name='adresa']");
  const addField = orderForm.querySelector("[name='ownform[1_8]']");
  console.log(addressField, addField);
  const requiredFieldsArr = Array.from(requiredFields);
  const isRequiredFieldsAreFilled = requiredFieldsArr.every((item) => {
    return !isEmpty(item.value);
  });
  console.log("All filled: ", isRequiredFieldsAreFilled);
  if (isRequiredFieldsAreFilled) {
    addressField.value = `${addressField.value} ||${addField.value}`;
    const formData = new FormData(orderForm);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    // orderForm.submit();
    submitBtn.click();
    console.log("Now it will click");
  }
  console.log("Not Yet");
});

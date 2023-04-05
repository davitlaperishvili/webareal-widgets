window.addEventListener("DOMContentLoaded", (event) => {
  const finishPage = document.querySelector(".page-e-finish");
  console.log("Finish Page !!!");
  // check if it is finish checkout page
  if (finishPage) {
    const orderForm = document.querySelector(".order_data_form"); // form for ordering

    const submitBtn = document.querySelector("#submit_btn"); // submit button

    // take all required fields
    const requiredFields = orderForm.querySelectorAll(
      ".required input, .required textarea"
    );

    // check if field is empty
    function isEmpty(str) {
      return !str.trim().length;
    }

    // add fake button in the top of real one
    if (submitBtn) {
      submitBtn.insertAdjacentHTML(
        "afterend",
        `
      <input type="" id="submit_btn" class="wide fakeBtn" name="send_order_submit" value="ПОТВЪРДИ ПОРЪЧКАТА" style="
      z-index: 10;
      position: absolute;
      cursor:pointer
      ">
      `
      );
    }

    const submitFakeBtn = document.querySelector(".fakeBtn"); // get fake submit btn

    // add event listener for fakeBtn
    submitFakeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const addressField = orderForm.querySelector("[name='adresa']"); // field where should be copied
      const addField = orderForm.querySelector("[name='ownform[1_8]']"); // field which should be copied

      const requiredFieldsArr = Array.from(requiredFields); // make array from NodeList

      // check if some required field is empty
      const isRequiredFieldsAreFilled = requiredFieldsArr.every((item) => {
        return !isEmpty(item.value);
      });

      // if every required field is filled:
      if (isRequiredFieldsAreFilled) {
        // if street number is already exist
        if (addressField.value.includes(`||${addField.value}`)) {
          // console.log(
          //   addressField.value,
          //   " ===>> Already exist, submit form and return"
          // );
          submitBtn.click(); // click on real submit button immediately when field will be copied
          return;
        }

        // if street number is already exist but user put different one
        if (addressField.value.includes("||")) {
          addressField.value = addressField.value.split("||")[0];
          addressField.value = `${addressField.value} ||${addField.value}`;
          // console.log(
          //   addressField.value,
          //   " ==>> Already exist,but different, REPLACE existing one, submit form and return"
          // );
          submitBtn.click(); // click on real submit button immediately when field will be copied
          return;
        }

        // if street number is not exist, add street number and submit form
        addressField.value = `${addressField.value} ||${addField.value}`;
        submitBtn.click(); // click on real submit button immediately when field will be copied
      }
    });
  }
});

// const streetNumber = "100";
// let str = "ul Hristo Botev ||101";

// let newAddress = "";

// // if street number is already exist
// if (str.includes(`||${streetNumber}`)) {
//   console.log(str, " ===>> Already exist, submit form and return");
//   return;
// }

// if (str.includes("||")) {
//   str = str.split("||")[0];
//   str = `${str} ||${streetNumber}`;
//   console.log(
//     str,
//     " ==>> Already exist,but different, REPLACE existing one, submit form and return"
//   );
// }

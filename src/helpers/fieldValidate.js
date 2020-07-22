import $ from "cash-dom";

export const fieldValidate = (field) => {
  const value = field.value;
  const regExp = new RegExp(/^[a-z0-9_-]+$/);

  if (value === "" && value.trim() === "") {
    $(field).addClass("is-danger");
    return false;
  } else if (!regExp.test(value)) {
    $(field).addClass("is-danger");
    return false;
  } else {
    $(".input.is-danger").removeClass("is-danger");
    return true;
  }
};

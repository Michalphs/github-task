import "./assets/scss/app.scss";
import $ from "cash-dom";
import axios from "axios";
import Profile from "./Profile";
import { fieldValidate } from "./helpers/fieldValidate";

export class App {
  initializeApp = () => {
    $(".load-username").on("click", () => {
      const field = $(".username.input");
      const fieldVal = field.val();
      const inputIsValid = fieldValidate(field[0]);

      if (inputIsValid) {
        this.fetchProfileData(fieldVal);
      }
    });
  };

  fetchProfileData = (username) => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then(({ data }) => new Profile(data))
      .catch((err) => {
        console.log(err);
      });
  };
}

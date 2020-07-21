import "./assets/scss/app.scss";
import $ from "cash-dom";
import axios from "axios";
import Profile from "./Profile";
import History from "./History";
import { fieldValidate } from "./helpers/fieldValidate";

export class App {
  initializeApp = () => {
    $(".load-username").on("click", () => {
      const field = $(".username.input");
      const fieldVal = field.val();
      const inputIsValid = fieldValidate(field[0]);

      if (inputIsValid) {
        this.fetchProfileData(fieldVal);
        this.fetchUserHistoryData(fieldVal);
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

  fetchUserHistoryData = (username) => {
    axios
      .get(`https://api.github.com/users/${username}/events/public`)
      .then(({ data }) => new History(data))
      .catch((err) => {
        console.log(err);
      });
  };
}

import $ from "cash-dom";
import axios from "axios";
import Profile from "./Profile";
import History from "./History";
import { fieldValidate } from "./helpers/fieldValidate";
import { startLoader, stopLoader } from "./helpers/loader";

export class App {
  constructor() {
    this.initApp();
  }

  initApp = () => {
    $(".load-username").on("click", () => {
      const field = $(".username.input");
      const fieldVal = field.val();
      const inputIsValid = fieldValidate(field[0]);
      startLoader();
      this.clearResults();

      if (inputIsValid) {
        this.fetchProfileData(fieldVal);
        this.fetchUserHistoryData(fieldVal);
      } else {
        stopLoader();
      }
    });
  };

  fetchProfileData = (username) => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then(({ data }) => {
        new Profile(data);
        stopLoader();
      })
      .catch((err) => {
        $(".input").addClass("is-danger");
        stopLoader();
      });
  };

  fetchUserHistoryData = (username) => {
    axios
      .get(`https://api.github.com/users/${username}/events/public`)
      .then(({ data }) => {
        new History(data);
        stopLoader();
      })
      .catch((err) => {
        $(".input").addClass("is-danger");
        stopLoader();
      });
  };

  clearResults = () => {
    $(".profile-container, .events-container").html("");
  };
}

import $ from "cash-dom";
import "whatwg-fetch";
import Profile from "./modules/Profile";
import History from "./modules/History";
import { fieldValidate } from "./helpers/fieldValidate";
import { startLoader, stopLoader } from "./helpers/loader";
import { checkResponseStatus } from "./helpers/checkResponseStatus";

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
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => checkResponseStatus(response))
      .then((data) => {
        new Profile(data);
        stopLoader();
      })
      .catch(() => {
        $(".input").addClass("is-danger");
        stopLoader();
      });
  };

  fetchUserHistoryData = (username) => {
    fetch(`https://api.github.com/users/${username}/events/public`)
      .then((response) => checkResponseStatus(response))
      .then((data) => {
        new History(data);
        stopLoader();
      })
      .catch(() => {
        $(".input").addClass("is-danger");
        stopLoader();
      });
  };

  clearResults = () => {
    $(".profile-container, .events-container").html("");
  };
}

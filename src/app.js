import "./assets/scss/app.scss";
import $ from "cash-dom";
import axios from "axios";
import Profile from "./Profile";

export class App {
  initializeApp = () => {
    $(".load-username").on("click", () => {
      const username = $(".username.input").val();
      if (username) {
        this.fetchProfileData(username);
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

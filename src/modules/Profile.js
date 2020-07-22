import $ from "cash-dom";

export default class Profile {
  constructor(profile) {
    this.profile = profile;
    this.renderProfile();
  }

  renderProfile = () => {
    const template = this.getProfileTemplate();
    $(".profile-container").html(template);
  };

  getProfileTemplate = () => {
    const { avatar_url, login, html_url, bio } = this.profile;

    return `
      <h2 class="subtitle is-4">Profile</h2>
      <div class="profile">
        <div class="media">
          <div class="media-left">
            <figure class="media-left image is-64x64">
              <img src="${avatar_url}" id="profile-image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-5" id="profile-name">${login}</p>
            <p class="subtitle is-6"><a href="${html_url}" id="profile-url">@${login}</a></p>
          </div>
        </div>
        <div class="content" id="profile-bio">
          <p>${bio ? bio : "(no information)"}</p>
        </div>
      </div>
    `;
  };
}

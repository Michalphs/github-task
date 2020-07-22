import $ from "cash-dom";
import { formatDate } from "../helpers/formatDate";

export default class History {
  constructor(history) {
    this.history = history;
    this.renderHistory();
  }

  renderHistory = () => {
    const template = this.getHistoryTemplate();
    $(".events-container").html(template);
  };

  filterData = () =>
    this.history &&
    this.history.filter(
      (item) => item.type === "PullRequestReviewCommentEvent" || item.type === "PullRequestEvent"
    );

  getHistoryTemplate = () => {
    const filteredHistory = this.filterData();
    if (!filteredHistory || filteredHistory.length === 0) return '';

    return `
      <h2 class="subtitle is-4">History</h2>
      <div class="timeline" id="user-timeline">
        ${filteredHistory.map((item) => this.getSingleItemTemplate(item)).join("")}
      </div>
    `;
  };

  getSingleItemTemplate = ({ actor, repo, payload, created_at }) => {
    return `
      <div class="timeline-item is-primary">
        <div class="timeline-marker is-primary"></div>
        <div class="timeline-content">
          <p class="heading">${formatDate(created_at)}</p>
          <div class="wrapper">
            <img src="${actor.avatar_url}"/>
            <div class="content">
              <span class="gh-username">
                <a href="https://github.com/${actor.display_login}">${actor.display_login}</a>
              </span>
              ${payload.action}
              ${payload.comment ? `<a href="${payload.comment.html_url}">comment</a> to` : ``}
              <a href="${payload.pull_request.html_url}">pull request</a>
              <p class="repo-name">
                <a href="https://github.com/${repo.name}">${repo.name}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  };
}

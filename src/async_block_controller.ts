import {Controller} from "stimulus";

export class AsyncBlockController extends Controller {
  static targets = ["replace"];

  declare readonly replaceTarget: HTMLElement;
  declare readonly hasReplaceTarget: boolean;

  // This is a simple controller to load a block of content when the page loads.
  // It should be used to give a quick initial response before calling out to an
  // an AJAX endpoint to do some expensive work.
  connect() {
    this.loadContent();
  }

  loadContent() {
    let el = (this.hasReplaceTarget ? this.replaceTarget : this.element) as HTMLElement;
    fetch(el.dataset.endpoint!)
    .then((response) => response.text())
    .then((html) => {
      let newEl = document.createElement("div");
      newEl.innerHTML = html;
      el.replaceWith(newEl);

      // Trigger event to show block has loaded
      let event = new CustomEvent("ajax:success", {"detail": ""});
      el.dispatchEvent(event);
    })
    .catch(err => {
      el.replaceWith("Sorry, this content failed to load");

      let event = new CustomEvent("ajax:error", {"detail": ""});
      el.dispatchEvent(event);
    })
    .finally(() => {
      let event = new CustomEvent("ajax:complete", {"detail": ""});
      el.dispatchEvent(event);
    });
  }
}
import {Controller} from "stimulus";

export class DisableInputsController extends Controller {

  static targets = ["disabler", "disable"];

  declare readonly hasDisablerTarget: boolean;
  declare readonly disablerTarget: HTMLInputElement;
  declare readonly disableTargets: Array<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

  connect() {
    this.toggle();
  }

  toggle() {
    if (this.hasDisablerTarget && this.disablerTarget.checked) {
      this.disableInputs();
    } else {
      this.enableInputs();
    }
  }

  disableInputs() {
    this.disableTargets.forEach((el, _) => {
      el.disabled = true;
    });
  }

  enableInputs() {
    this.disableTargets.forEach((el, _) => {
      el.disabled = false;
    });
  }
}
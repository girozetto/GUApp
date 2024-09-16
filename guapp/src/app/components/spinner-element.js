import { LitElement, html, css } from 'lit';

export class SpinnerElement extends LitElement {
  static styles = css`
    .spinner {
      display: none;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s infinite linear;
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  static properties = {
    active: { type: Boolean },
  };

  updated() {
    const spinner = this.shadowRoot.querySelector('.spinner');
    if (this.active) {
      spinner.style.display = 'block';
    } else {
      spinner.style.display = 'none';
    }
  }

  render() {
    return html`<div class="spinner"></div>`;
  }
}

customElements.define('spinner-element', SpinnerElement);

import { LitElement, html, css } from 'lit';

export class MessageBox extends LitElement {
  static styles = css`
    .message {
      display: none;
      margin: 10px 0;
      padding: 12px 20px;
      border-radius: 5px;
      font-size: 16px;
      align-items: center;
    }
    .message.success {
      background-color: #d4edda;
      color: #155724;
    }
    .message.error {
      background-color: #f8d7da;
      color: #721c24;
    }
  `;

  render() {
    return html`<div id="messageBox" class="message"></div>`;
  }

  showMessage(message, isSuccess) {
    const messageBox = this.shadowRoot.getElementById('messageBox');
    messageBox.className = `message ${isSuccess ? 'success' : 'error'}`;
    messageBox.innerText = message;
    messageBox.style.display = 'flex';
    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);
  }
}

customElements.define('message-box', MessageBox);

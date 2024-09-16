import { LitElement, html, css } from 'lit';
import './message-box.js';
import './spinner-element.js';
import { FormUtils } from '../utils/form-utils.js';

export class LoginForm extends LitElement {

  static properties = {
    email: {},
    password: {}
  }

  static styles = css`
    .login-container {
      padding: 20px;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group input {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ddd;
      outline: none;
    }
    button {
      padding: 10px 15px;
      border-radius: 5px;
      border: none;
      background-color: #4070f4;
      color: white;
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
  `;

  constructor() {
    super();
    this.isLoading = false;
  }

  render() {
    return html`
      <div class="login-container">
        <message-box id="loginMessage"></message-box>
        <form @submit=${this.handleLogin}>
          <div class="form-group">
            <input type="text" name="email" placeholder="Email" .value=${this.email} required />
          </div>
          <div class="form-group">
            <input type="password" name="password" placeholder="Password" .value=${this.password} required />
          </div>
          <button type="submit">
            Entrar
            <spinner-element ?active=${this.isLoading}></spinner-element>
          </button>
        </form>
      </div>
    `;
  }

  async handleLogin(e) {
    e.preventDefault();
    this.isLoading = true;
    
    console.log('Values In Component: ',this.email, this.password);
    const user = FormUtils.extractJson(e.target);

    const response = await window.accountAPI.login(user);
    this.handleResponse(response);
    this.isLoading = false;
  }

  handleResponse(response) {
    const messageBox = this.shadowRoot.getElementById('loginMessage');
    if (response.success) {
      messageBox.showMessage('Login bem-sucedido!', true);
      this.dispatchEvent(new CustomEvent('navigate', { detail: '/dashboard' }));
    } else {
      messageBox.showMessage(response.error || 'Erro ao logar.', false);
    }
  }
}

customElements.define('login-form', LoginForm);

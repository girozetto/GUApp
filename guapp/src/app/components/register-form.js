import { LitElement, html, css } from 'lit';
import './message-box.js';
import './spinner-element.js';
import { FormUtils } from '../utils/form-utils.js';
import { NavigationUtils } from '../utils/navigation-utils.js';

export class RegisterForm extends LitElement {
  static styles = css`
    .register-container {
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
      <div class="register-container">
        <message-box id="registerMessage"></message-box>
        <form @submit=${this.handleRegister}>
          <div class="form-group">
            <input type="text" name="name" placeholder="Nome Completo" required />
          </div>
          <div class="form-group">
            <input type="email" name="email" placeholder="Endereço de Email" required />
          </div>
          <div class="form-group">
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <button type="submit">
            Cadastrar
            <spinner-element ?active=${this.isLoading}></spinner-element>
          </button>
        </form>
      </div>
    `;
  }

  async handleRegister(e) {
    e.preventDefault();
    this.isLoading = true;

    const user = FormUtils.extractJson(e.target);

    const response = await window.accountAPI.register(user);
    this.handleResponse(response);
    this.isLoading = false;
  }

  handleResponse(response) {
    const messageBox = this.shadowRoot.getElementById('registerMessage');
    if (response.success) {
      messageBox.showMessage('Usuário registrado com sucesso!', true);
      this.dispatchEvent(NavigationUtils.navigate('/dashboard'));
    } else {
      messageBox.showMessage(response.error || 'Erro ao registrar.', false);
    }
  }
}

customElements.define('register-form', RegisterForm);

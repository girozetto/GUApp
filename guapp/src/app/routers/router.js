import Navigo from 'navigo';
import './components/login.js';
import './components/dashboard.js';
import './components/create-task.js';
import './components/edit-task.js';

const router = new Navigo('/');

const outlet = document.getElementById('outlet');

const buildComponent = (componentName)=>{
    outlet.innerHTML = `<${componentName}></${componentName}>`;
};

const routes = {
  '/': () => {
    buildComponent('login-component');
  },
  '/dashboard': () => {
    buildComponent('dashboard-component');
  }
};

Object.keys(routes).forEach(route => {
  router.on(route, routes[route]).resolve();
});

// Escutando os eventos de navegação e redirecionando pelo SPA
outlet.addEventListener('navigate', (e) => {
  router.navigate(e.detail);
});

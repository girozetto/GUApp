import Navigo from 'navigo';
import '../components/create-task.js';
import '../components/edit-task.js';

const router = new Navigo('/task');

const outlet = document.getElementById('outlet');

const buildComponent = (componentName)=>{
    outlet.innerHTML = `<${componentName}></${componentName}>`;
};

const routes = {
  '/task': () => {
    buildComponent('list-component');
  },
  '/task/create': () => {
    buildComponent('create-task-component');
  },
  '/task/edit/:id': (id) => {
    buildComponent('edit-task-component');
  }
};

Object.keys(routes).forEach(route => {
  router.on(route, routes[route]).resolve();
});

// Escutando os eventos de navegação e redirecionando pelo SPA
outlet.addEventListener('navigate', (e) => {
  router.navigate(e.detail);
});

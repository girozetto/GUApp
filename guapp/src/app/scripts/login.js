
const LoginScreenManager = (()=>{
    
  const global = {
    wrapper: null,
    signupHeader: null,
    loginHeader: null,
    loginForm: null,
    registerForm: null,
    loginMessage: null,
    registerMessage: null,
    loginSpinner: null,
    registerSpinner: null,
  };

  const init = async () => {
    await validateSession();
    setAllElements();
    addWrapperEventListeners();
    addActionHandlers();
  };

  const validateSession = async () => {
    const response = await window.accountAPI.profile();
    console.log("Response: " + JSON.stringify(response));
    if(response.success && response.data){
      await window.navigationAPI.redirect('index');
    }
  };

  const setAllElements = () => {
    global.wrapper = document.querySelector(".wrapper");
    global.loginHeader = document.querySelector(".login header");
    global.signupHeader = document.querySelector(".signup header");
    global.loginForm = document.getElementById("loginForm");
    global.registerForm = document.getElementById("registerForm");
    global.loginMessage = document.getElementById("loginMessage");
    global.registerMessage = document.getElementById("registerMessage");
    global.loginSpinner = document.getElementById("loginSpinner");
    global.registerSpinner = document.getElementById("registerSpinner");
  };

    const addWrapperEventListeners = ()=>{
        global.loginHeader.addEventListener("click", () => {
          global.wrapper.classList.add("active");
        });

        global.signupHeader.addEventListener("click", () => {
          global.wrapper.classList.remove("active");
        });
    };

    const getFormAsJSON = (element)=>{
      const formData = new FormData(element);

      const user = {};

      formData.forEach((value,key)=>{
        user[key] = value.valueOf();
      });

      return user;

    };

    const handleSubmission = async (element, isLogin = true) => {
        showProcessing(element);
        const user = getFormAsJSON(element);

        const response = isLogin ? await window.accountAPI.login(user) : await window.accountAPI.register(user);

        handleResponse(response, isLogin, element);
        showProcessing(element,false);
    };

    const handleResponse = (response, isLogin, elementTarget) => {
      
      const element = isLogin ? global.loginMessage : global.registerMessage;

      if(response.success) elementTarget.reset();

      if(!response.success || !isLogin) return showMessage(element, response.error || 'User registered Successfully', response.success);
      
      return validateSession();

    };

    const addActionHandlers = ()=>{

      global.loginForm.addEventListener("submit", async (event) =>{ 
        event.preventDefault();
        await handleSubmission(event.target, true);
      });

      global.registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        await handleSubmission(event.target, false);

      });

    };

    const showProcessing = (form, isProcessing = true) => {
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = isProcessing; // Desativa o botão

      const spinner = form.querySelector('.spinner');
      spinner.classList.toggle("hidden", !isProcessing); // Mostra ou esconde o spinner
    };

    const showMessage = (element, message, isSuccess = true) => {
      // Remove qualquer animação anterior
      element.classList.remove("error", "success", "shake");
  
      const type = isSuccess ? "success" : "error";
      // Adiciona o tipo de mensagem
      element.classList.add(type);

      const icon = isSuccess ? "check-circle" : "exclamation-circle";
  
      // Exibe o ícone correspondente
      element.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
      
      // Mostra a mensagem
      element.style.display = "flex"; 
      
      // Se for erro, adiciona a classe 'shake'
      if (!isSuccess) {
        element.classList.add("shake");
      }
  
      // Remove a mensagem após 5 segundos
      setTimeout(() => {
        element.style.display = "none";
        element.classList.remove("shake"); // Remove a animação após o tempo
      }, 5000);

    };

    return{
        init
    };

})();

LoginScreenManager.init();
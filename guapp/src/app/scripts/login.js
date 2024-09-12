
const LoginScreenManager = (()=>{
    
    const global = {
      wrapper: null,
      signupHeader: null,
      loginHeader: null,
      loginForm: null,
      registerForm: null
    };

    const init = ()=>{
      setAllElements();
      addWrapperEventListeners();
      addActionHandlers();
    };

    const setAllElements = ()=>{
      global.wrapper = document.querySelector(".wrapper");
      global.loginHeader = document.querySelector(".login header");
      global.signupHeader = document.querySelector(".signup header");
      global.loginForm = document.getElementById("loginForm");
      global.registerForm = document.getElementById("registerForm");
      console.log("Elements Set! ", global);
    };

    const addWrapperEventListeners = ()=>{
        global.loginHeader.addEventListener("click", () => {
          global.wrapper.classList.add("active");
        });

        global.signupHeader.addEventListener("click", () => {
          global.wrapper.classList.remove("active");
        });
    };

    const submitForm = async (element, isLogin = true)=>{
      const formData = new FormData(element);

      const user = {};

      formData.forEach((value,key)=>{
        user[key] = value.valueOf();
      });
      alert("Form: "+JSON.stringify(user));
    };

    const addActionHandlers = ()=>{
      console.log("Account API Loaded: ", window.accountAPI);
      console.log("Main API Loaded: ", window.navigationAPI);
      console.log("Task API Loaded: ", window.taskAPI);
      global.loginForm.addEventListener("submit", (event) =>{ 
        event.preventDefault();
        
        submitForm(event.target, true)
      });
      global.registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        submitForm(event.target, false)
      });
    };

    return{
        init
    };

})();

LoginScreenManager.init();
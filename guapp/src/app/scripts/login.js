
const LoginScreenManager = (()=>{
    
    const init = ()=>{
        addWrapperEventListeners();
    };

    const addWrapperEventListeners = ()=>{
        const wrapper = document.querySelector(".wrapper"),
          signupHeader = document.querySelector(".signup header"),
          loginHeader = document.querySelector(".login header");

        loginHeader.addEventListener("click", () => {
          wrapper.classList.add("active");
        });
        signupHeader.addEventListener("click", () => {
          wrapper.classList.remove("active");
        });
    };

    return{
        init
    };

})();

LoginScreenManager.init();
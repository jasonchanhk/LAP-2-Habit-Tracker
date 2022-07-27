const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const signup = async (name, email, password, passwordConfirm) => {
  try {
    const result = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
      withCredentials: true,
    });

    console.log(result);
  } catch (err) {
    console.log(err.response.data);
  }
};

document
  .querySelector(".signup-form-container")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector(".signup-email").value;
    const password = document.querySelector(".signup-password").value;
    const passwordConfirm = document.querySelector(
      ".signup-password-confirm"
    ).value;
    const name = document.querySelector(".signup-name").value;

    signup(name, email, password, passwordConfirm);
  });

const display = document.querySelector(".cta-btn-home-page");

display.addEventListener("click", (e) => {
  document.querySelector("#home").classList.toggle("signup-login-display");
  document
    .querySelector("#login-page")
    .classList.toggle("signup-login-display");
});

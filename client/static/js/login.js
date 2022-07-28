const login = async (email, password) => {
  try {
    const result = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/users/login",
      data: {
        email,
        password,
      },
      withCredentials: true,
    });

    console.log(result);
    if (result.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/client/udash.html");
      }, 50);
    }
  } catch (err) {
    document.querySelector(".login-para").textContent =
      "💥💥💥incorrect email or password please try again!";
    document.querySelector(".login-para").style.color = "red";
    document.querySelector(".login-para").style.fontSize = "18px";
  }
};

document
  .querySelector(".login-form-container")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector(".login-email").value;
    const password = document.querySelector(".login-password").value;

    login(email, password);
  });

// import { showAlert } from "./alerts";

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
      setTimeout(() => {
        const decoded = jwt_decode(result.data.token)
        window.location.assign(`/udash.html?${decoded.id}`);
      }, 50);
    }
  } catch (err) {
    document.querySelector(".signup-para").textContent =
      "💥💥💥incorrect email or password please try again!";
    document.querySelector(".signup-para").style.color = "red";
    document.querySelector(".signup-para").style.fontSize = "18px";
  }
};

document
  .querySelector(".login-form-container")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector(".signup-email").value;
    const password = document.querySelector(".signup-password").value;

    login(email, password);
  });

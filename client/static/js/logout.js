const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "https://lap-2-habit-tracker.herokuapp.com/users/logout",
      withCredentials: true,
    });
    if ((res.data.status = "success"))
      location.assign(
        "/client/index.html?"
      );
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }
};

document.querySelector(".logout-btn").addEventListener("click", logout);

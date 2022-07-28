const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:8000/users/logout",
      withCredentials: true,
    });
    if ((res.data.status = "success"))
      location.assign(
        "/LAP2-Assignment/team3Project/Lap-2-Habit-Tracker/Client/index.html?"
      );
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }
};

document.querySelector(".logout-btn").addEventListener("click", logout);

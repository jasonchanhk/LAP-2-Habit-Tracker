const title = document.getElementById('title-text');
const description = document.getElementById('description-text');
const rep = document.getElementById('rep-text');
const frequency = document.getElementById('frequency-text');

const submitBtn = document.getElementById('submit-button');
const deleteBtn = document.getElementById('add-habit-btn-rgt');
const habitContainer = document.querySelector('.habit-tabs-container');
const trackerContainer = document.querySelector('.tracker-container');

const userName = document.querySelector('.user-name');

async function clickToUpdateCount(habit, action) {
  console.log(habit._id, `is ${action}ing`);
  if (habit.count == 0 && action == 'minus') {
    alert('You cannot update the count lower than 0');
  } else if (habit.count == habit.rep && action == 'add') {
    alert(
      `You had already completed this ${habit.freq} task and could not add anymore!`
    );
  } else {
    let url;
    if (action == 'add') {
      url = `http://127.0.0.1:8000/habits/${habit._id}/add`;
    } else if (action == 'minus') {
      url = `http://127.0.0.1:8000/habits/${habit._id}/minus`;
    }
    console.log(url);
    try {
      const result = await axios({
        method: 'PATCH',
        url: url,
        withCredentials: true,
      });
      if (result.request.status == 200) {
        alert('Update successful!');

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

function renderTracker(habit) {
  const tracker_info_box = document.createElement('div');
  tracker_info_box.setAttribute('class', 'tracker-info-box');

  const tracker_box_status = document.createElement('div');
  tracker_box_status.setAttribute('class', 'tracker-box two');
  if (habit.count == habit.rep) {
    tracker_box_status.innerHTML = `<i class="fa fa-check" style="font-size:50px;"></i>`;
  } else {
    tracker_box_status.innerHTML = `<i class="fa fa-clock-o" style="font-size:50px;"></i>`;
  }

  const add_btn = document.createElement('button');
  add_btn.textContent = '+';
  add_btn.setAttribute('class', 'add_btn');
  add_btn.onclick = () => {
    clickToUpdateCount(habit, 'add');
  };

  const minus_btn = document.createElement('button');
  minus_btn.textContent = '-';
  minus_btn.setAttribute('class', 'minus_btn');
  minus_btn.onclick = () => {
    clickToUpdateCount(habit, 'minus');
  };

  const title_paragraph = document.createElement('p');
  title_paragraph.setAttribute('class', 'tracker-text');
  title_paragraph.textContent = habit.title;

  const main_paragraph = document.createElement('p');
  main_paragraph.setAttribute('class', 'tracker-result');

  const span_group = document.createElement('span');
  span_group.setAttribute('class', 'span-group');
  span_group.innerHTML = `<span class="habit-count">${habit.count}</span><span class="habit-rep">/${habit.rep}</span><span class="habit-freq">${habit.freq}</span>`;

  main_paragraph.append(add_btn, span_group, minus_btn);

  const tracker_box_main = document.createElement('div');
  tracker_box_main.setAttribute('class', 'tracker-box one');
  tracker_box_main.append(title_paragraph, main_paragraph);

  const tracker_box_streak = document.createElement('div');
  tracker_box_streak.setAttribute('class', 'tracker-box two');
  tracker_box_streak.innerHTML = `<p class="tracker-text">Streak</p><p class="tracker-result habit-side-info">${habit.streak}</p>`;

  const tracker_box_total = document.createElement('div');
  tracker_box_total.setAttribute('class', 'tracker-box two');
  tracker_box_total.innerHTML = `<p class="tracker-text">Total</p><p class="tracker-result habit-side-info">${habit.total}</p>`;

  tracker_info_box.append(
    tracker_box_status,
    tracker_box_main,
    tracker_box_streak,
    tracker_box_total
  );
  trackerContainer.append(tracker_info_box);
}

async function fetchUserHabit() {
  const userData = await axios({
    method: 'GET',
    url: `http://127.0.0.1:8000/users/one`,
    withCredentials: true,
  });
  userName.textContent = `${userData.data.data.user[0].name}`;
  console.log(userData);
  const result = await axios({
    method: 'GET',
    url: 'http://127.0.0.1:8000/habits',
    withCredentials: true,
  });

  result.data.forEach((habit) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'habit-tabs');

    const plusBut = document.createElement('button');
    plusBut.setAttribute('class', 'add-habit-btn-lft');
    plusBut.innerHTML = '<i class="fa fa-pencil" style="font-size:25px;"></i>';

    const titleParagraph = document.createElement('div');
    titleParagraph.setAttribute('class', 'habit-text');
    titleParagraph.innerHTML = `
    <h3>${habit.title}</h3>
    <div>${habit.description}</div>
    `;

    const minusBut = document.createElement('button');
    minusBut.innerHTML = '<i class="fa fa-trash" style="font-size:25px;"></i>';
    minusBut.setAttribute('class', 'add-habit-btn-rgt');
    minusBut.onclick = () => {
      deletePostData(habit._id);
    };

    div.append(plusBut, titleParagraph, minusBut);

    habitContainer.append(div);
    renderTracker(habit);
  });
}

fetchUserHabit();

async function postNewData() {
  try {
    const result = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/habits',
      data: {
        title: title.value,
        description: description.value,
        rep: rep.value,
        freq: frequency.value,
      },
      withCredentials: true,
    });
    if (result.request.status == 200) {
      const message = document.createElement('h3');
      message.textContent = 'Your habit has successfully been added!';
      message.setAttribute('class', 'message-after-post');

      const content = document.querySelector('.modal-content');
      content.append(message);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  } catch (err) {
    console.log(err);
  }
}

async function deletePostData(id) {
  try {
    const result = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/habits/${id}`,
      withCredentials: true,
    });
    console.log(result);
    if (result.request.status == 200) {
      alert('Habit Successfully Deleted!');
      console.log('Your habit has been deleted!');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  } catch (err) {}
}

async function getUserInfo() {
  const result = await axios({
    method: 'GET',
    url: `http://127.0.0.1:8000/users/one`,
    withCredentials: true,
  });
  console.log(result);
}
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  postNewData();
});

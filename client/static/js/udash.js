const title = document.getElementById('title-text');
const description = document.getElementById('description-text');
const rep = document.getElementById('rep-text');
const frequency = document.getElementById('frequency-text');

const submitBtn = document.getElementById('submit-button');

const habitContainer = document.querySelector('.habit-tabs-container')

const trackerContainer = document.querySelector('.tracker-container')

async function clickToUpdateCount(habit, action){
  console.log(habit._id, `is ${action}ing`)
  if(habit.count = 0){
    alert("cannot be lower than 0")
  }else{
    let url
    if(action == 'add'){
      url = `http://127.0.0.1:8000/habits/${habit._id}/add`
    }else if(action == 'minus'){
      url = `http://127.0.0.1:8000/habits/${habit._id}/minus`
    }
    console.log(url)
    const result = await axios({
      method: "PATCH",
      url: url,
      withCredentials: true,
    });

    console.log(result)
  }
  
}

function renderTracker(habit){
  // <div class="tracker-info-box">
  //   <div class="tracker-box five">
  //     <p class="tracker-text">Status</p>
  //   </div>
  //   <div class="tracker-box one">
  //     <p class="tracker-text">10,000 steps a day</p>
  //     <p class="tracker-difficulty">0/5</p>
  //   </div>
  //   <div class="tracker-box two">
  //     <p class="tracker-text">Frequency</p>
  //     <p class="tracker-result">Daily</p>
  //   </div>
  //   <div class="tracker-box three">
  //     <p class="tracker-text">Streak</p>
  //     <p class="completion-nos">5</p>
  //   </div>
  //   <div class="tracker-box four">
  //     <p class="tracker-text">Total</p>
  //     <p class="completion-nos">5</p>
  //   </div>    
  // </div>

  const tracker_info_box = document.createElement('div')
  tracker_info_box.setAttribute('class', 'tracker-info-box')

  const tracker_box_5 = document.createElement('div')
  tracker_box_5.setAttribute('class', 'tracker-box five')
  tracker_box_5.innerHTML = `<p class="tracker-text">Status</p>`

  const tracker_box_1 = document.createElement('div')
  tracker_box_1.setAttribute('class', 'tracker-box one')
  tracker_box_1.innerHTML = `<p class="tracker-text">${habit.title}</p>`

  const tracker_box_2 = document.createElement('div')
  tracker_box_2.setAttribute('class', 'tracker-box two')
  tracker_box_2.innerHTML = `<p class="tracker-text">Frequency</p>`

  const tracker_box_3 = document.createElement('div')
  tracker_box_3.setAttribute('class', 'tracker-box three')
  tracker_box_3.innerHTML = `<p class="tracker-text">Streak</p>`

  const tracker_box_4 = document.createElement('div')
  tracker_box_4.setAttribute('class', 'tracker-box four')
  tracker_box_4.innerHTML = `<p class="tracker-text">Total</p>`

  tracker_info_box.append(tracker_box_5, tracker_box_1, tracker_box_2, tracker_box_3, tracker_box_4)
  trackerContainer.append(tracker_info_box)
  // const plusBut = document.createElement('button')
  // plusBut.setAttribute('class', 'add-habit-btn-lft')
  // plusBut.textContent = '+'
  // plusBut.onclick = () => {clickToUpdateCount(habit, 'add')}

  // const titleParagraph = document.createElement('div')
  // titleParagraph.setAttribute('class', 'habit-text')
  // titleParagraph.innerHTML = `
  // <h3>${habit.title}</h3>
  // <div>${habit.description}</div>
  // `

  // const minusBut = document.createElement('button')
  // minusBut.textContent = '-'
  // minusBut.setAttribute('class', 'add-habit-btn-rgt')
  // minusBut.onclick = () => {clickToUpdateCount(habit, 'minus')}
}

async function fetchUserHabit(){
  const result = await axios({
    method: "GET",
    url: "http://127.0.0.1:8000/habits",
    withCredentials: true,
  });

  result.data.forEach((habit) => {
    const div = document.createElement('div')
    div.setAttribute('class', 'habit-tabs')

    const plusBut = document.createElement('button')
    plusBut.setAttribute('class', 'add-habit-btn-lft')
    plusBut.textContent = '+'
    plusBut.onclick = () => {clickToUpdateCount(habit, 'add')}

    const titleParagraph = document.createElement('div')
    titleParagraph.setAttribute('class', 'habit-text')
    titleParagraph.innerHTML = `
    <h3>${habit.title}</h3>
    <div>${habit.description}</div>
    `

    const minusBut = document.createElement('button')
    minusBut.textContent = '-'
    minusBut.setAttribute('class', 'add-habit-btn-rgt')
    minusBut.onclick = () => {clickToUpdateCount(habit, 'minus')}
    
    // const counter = document.createElement('p')
    // counter.textContent = `${habit.count}/${habit.rep} ${habit.freq}`

  

    div.append(plusBut, titleParagraph, minusBut)

    habitContainer.append(div)
    renderTracker(habit)
  });
}

fetchUserHabit()

async function postNewData() {
  try{
    const result = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/habits",
      data: {
        title: title.value,
        description: description.value,
        rep: rep.value,
        freq: frequency.value
      },
      withCredentials: true,
    });
    console.log(result)
    if (result.request.status == 200) {
      const message = document.createElement('h3')
      message.textContent = 'Your habit has successfully been added!'
      message.setAttribute('class', 'message-after-post')

      const content = document.querySelector('.modal-content')
      content.append(message)

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }catch(err){

  }
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  postNewData();
});




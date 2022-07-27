const title = document.getElementById('title-text');
const description = document.getElementById('description-text');
const rep = document.getElementById('rep-text');
const frequency = document.getElementById('frequency-text');

const submitBtn = document.getElementById('submit-button');

const main = document.querySelector('main')

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

async function fetchUserHabit(){
  const result = await axios({
    method: "GET",
    url: "http://127.0.0.1:8000/habits",
    withCredentials: true,
  });
  result.data.forEach((habit) => {
    const titleParagraph = document.createElement('p')
    titleParagraph.textContent = `title: ${habit.title} || Desc: ${habit.description}`

    const counter = document.createElement('p')
    counter.textContent = `${habit.count}/${habit.rep} ${habit.freq}`

    const plusBut = document.createElement('button')
    plusBut.textContent = '+'
    plusBut.onclick = () => {clickToUpdateCount(habit, 'add')}

    const minusBut = document.createElement('button')
    minusBut.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>'
    minusBut.onclick = () => {clickToUpdateCount(habit, 'minus')}

    const div = document.createElement('div')
    div.append(titleParagraph, counter, plusBut, minusBut)

    main.append(div)
  });
}

fetchUserHabit()

async function postNewData() {
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
  // fetch('http://localhost:8000/habits', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     title: title.value,
  //     description: description.value,
  //     rep: rep.value,
  //     freq: rep.freq
  //   }),
  // })
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     console.log(data);
  //   });
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  postNewData();
});




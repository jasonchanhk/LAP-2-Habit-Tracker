const title = document.getElementById('title-text');
const description = document.getElementById('description-text');
const rep = document.getElementById('rep-text');
const frequency = document.getElementById('frequency-text');

const submitBtn = document.getElementById('submit-button');

function postNewData() {
  fetch('http://localhost:8000/habits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      rep: rep.value,
      freq: rep.freq,
      userId: 1,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    });
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  postNewData();
});

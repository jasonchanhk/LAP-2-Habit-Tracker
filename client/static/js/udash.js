const title = document.getElementById('title-text');
const description = document.getElementById('description-text');
const rep = document.getElementById('rep-text');
const frequency = document.getElementById('frequency-text');

const submitBtn = document.getElementById('submit-button');

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

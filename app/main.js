import './style.css'

async function getGreeting() {
  try {
    const response = await fetch('http://localhost:8000');
    if (!response.ok) {
      throw new Error('Failed to fetch greeting. ')
    }
    const message = await response.json()
    return message
  } catch(error) {
    console.error('Error fetching greeting:', error);
    return 'Failed to load greeting';
  }
}

async function handleSubmit() {
  try {
    const place = document.querySelector('#place').value.trim()
    const response = await fetch(`http://localhost:8000/${place}`)
    if(!response.ok) {
      throw new Error(`Retrieval Error. Status code = ${response.status}`)
    }
    const body = await response.json()
    if (place != '') {
      showWeatherInfo(body);
      return body;
    }
      
           
  } catch(error) {
    console.error('Error fetching information: ', error);
    return 'Failed to obtain weather information';
  }
}

function showWeatherInfo(body) {
  const board = document.querySelector('#weather')
  const heading = document.querySelector('#cityhead')
  heading.textContent = `Weather Conditions in ${body.city}`

  board.innerHTML = `
  <ul>
    <li><div class="weattr"><div class="key">Temperature</div><div class="value">${body.temp}°C</div></div></li>
    <li><div class="weattr"><div class="key">Humidity</div><div class="value">${body.humidity}%</div></div></li>
    <li><div class="weattr"><div class="key">Wind Speed</div><div class="value">${body.wndspd} m/s</div></div></li>
    <li><div class="weattr"><div class="key">Sunrise Time</div><div class="value">${body.risetime} IST</div></div></li>
    <li><div class="weattr"><div class="key">Sunset Time</div><div class="value">${body.settime} IST</div></div></li>
    <li><div class="weattr"><div class="key">Cloud Cover</div><div class="value">${body.cldcover}%</div></div></li>
    <li><div class="weattr"><div class="key">Overall Status</div><div class="value">${body.status}</div></div></li>
  </ul>
  `;
}

function handleClear() {
  document.querySelector('#place').value = ''
  document.querySelector('#cityhead').textContent = 'Weather Conditions'
  document.querySelector('#weather').innerHTML = ``
}

const submitButton = document.querySelector('#submit')
submitButton.addEventListener('click', handleSubmit)
const clearButton = document.querySelector('#clear')
clearButton.addEventListener('click', handleClear)


function renderApp() {
  document.querySelector('#logo').textContent = 'loading...'
  
  getGreeting().then(greeting => {
    document.getElementById('logo').textContent = greeting.message
  });
}

renderApp();
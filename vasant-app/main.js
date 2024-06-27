import $ from 'jquery';
import './style.css'

function getNavbar() {
  return /*html*/ `
  <nav class="bg-inherit flex flex-row justify-between px-6 py-5 items-center list-none border-b">
    <div>
      <li class="font-srpnch text-bulinks text-3xl">vasant</li>
    </div>
    <div class="flex flex-row justify-between items-center gap-10 ">
      <li class="font-roboto text-white text-xl"><a href="https://github.com/themohitnair/vasant/blob/main/README.md" class="hover:text-bulinks">About</a></li>    
      <li class="font-roboto text-white text-xl"><a href="https://github.com/themohitnair/vasant" class="hover:text-bulinks">Source Code</a></li>
    </div>   
  </nav>
  `
}

function getApp() {
  return /*html*/ `
  <div className="form" class="bg-inherit w-70 m-auto mt-28 flex items-center justify-center">
    <div className="placename">
      <input type="text" placeholder="Enter the name of a place" id="place" class="font-roboto bg-inherit border-b border-white text-white m-auto w-80 h-15 px-3 py-1 rounded-sm focus:outline-none focus:border-bulinks"/>
      <button id="submit" class="ml-2 text-white hover:text-bulinks">
        <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
      </button>
    </div>
  </div>
  <div id="weatherinfo" class="bg-inherit m-auto my-20 w-1/2 font-roboto text-xl text-white flex flex-col gap-3"></div>
  `
}

async function getWeatherInfo(place) {
  if (place == '') {
    return null;
  }
  try {
    const response = await fetch(`http://localhost:8000/${place}`)  
    if (!response.ok) {
      throw new Error(`Unable to fetch info. Response status: ${response.status}`)
    }
    const info = await response.json()
    return info
  }
  catch (error) {
    console.error('Server Error.')
    return null
  }    
}

const keysToDisp = {
  'city': 'Location',
  'temp': 'Temperature',
  'status': 'Status',
  'humidity': 'Humidity',
  'wndspd': 'Wind Speed',
  'risetime': 'Time of Sunrise',
  'settime': 'Time of Sunset',
  'cldcover': 'Cloud Cover'
}

const emojis = {
  'city': '🗺',
  'temp': '🌡',
  'status': '🌈',
  'humidity': '💧',
  'wndspd': '🍃',
  'risetime': '☀️',
  'settime': '🌙',
  'cldcover': '☁️'
}

const unitsSuffix = {
  'city': '',
  'status': '',
  'temp': '°C',
  'humidity': '%',
  'wndspd': 'm/s',
  'risetime': 'IST',
  'settime': 'IST',
  'cldcover': '%'
}


function showWeatherInfo(info) {
  const weatherinfo = $('#weatherinfo')
  if (!info) {
    weatherinfo.text('Loading...').hide().fadeIn(500)
  }
  if (info == null) {
    weatherinfo.text('Place not found').hide().fadeIn(500)
    return;
  }

  let winfo = ''

  Object.keys(info).forEach(key => {
    winfo += /*html*/ `
    <div className="inf" class="text-center bg-gradient-to-r from-indigo-500 to-gray-900 flex flex-row justify-between px-4 py-2 rounded-md">
      <div className="key" class="flex w-30 justify-between">${keysToDisp[key]}&nbsp;&nbsp;${emojis[key]}</div>
      <div className="val">${info[key]} ${unitsSuffix[key]}</div>
    </div>
    `
  })

  weatherinfo.html(winfo).hide().fadeIn(1000);
}

const nav = document.querySelector('#nav')
const app = document.querySelector('#app')
nav.innerHTML = getNavbar()
app.innerHTML = getApp()

const sub = document.querySelector('#submit')

sub.addEventListener('click', async() => {
  const place = document.querySelector('#place').value
  const info = await getWeatherInfo(place)
  showWeatherInfo(info)  
})


place.addEventListener('input', () => {
  const weatherinfo = document.querySelector('#weatherinfo')
  const place = document.querySelector('#place')
  if (place.value.trim() == '') {
    weatherinfo.textContent = ''    
  }
})
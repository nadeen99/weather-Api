/* Global Variables */
const url = "http://api.openweathermap.org/data/2.5/weather?zip=";
const myKey = "&appid=77f58103b1f78403fe497fb48e8891e6&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// create eventLisener to button
document.getElementById('generate').addEventListener('click', function(){
    const zipCode =  document.getElementById('zip').value;
    if (!zipCode){
        alert("Please enter a zip code!")
    }
    else{
    getFromApi(url,zipCode,myKey)
    .then(function(data){
        // add data to post request
        postData('/add', { date:newDate, temp:data.main.temp, content:feelings.value } );
        retrieveData();
    })
}});

//make a GET request to the OpenWeatherMap API.
const getFromApi = async (url,zip,key)=>{
    const res = await fetch(url+zip+key)
   
    try {
        const data = await res.json();
        console.log(data)
        return data;
      }  catch(error) {
        console.log("error", error);
      }
}
//Post feeling and temp and date
const postData = async (url='' , data ={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const myData = await response.json();
        console.log(myData)
        return myData;
      }  catch(error) {
        console.log("error", error);
      }
}

//retrieve data to client and update the user interface 
const retrieveData = async ()=>{
    const req = await fetch('/allOfData');
    try {
        const data = await req.json();
        document.getElementById('date').innerHTML= `Today's Date: ${data.date}`;
        document.getElementById('temp').innerHTML= `The Temperature: ${data.temp} Fahrenheit`;
        document.getElementById('content').innerHTML= `Your Feeling: ${data.content}`;
    }
    catch(error){
        console.log("error",error);
    }
}

//
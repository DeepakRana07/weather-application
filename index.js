// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


const usertab=document.querySelector(".your-weather-tab");
const searchtab=document.querySelector(".search-weather-tab");
const usercontainer=document.querySelector(".weather-container");
const grantacesscontainer=document.querySelector(".grantlocation");
const  loadingScreen=document.querySelector(".loading-container");
const userinfoContainer=document.querySelector(".user-info-container");
const searchform=document.querySelector(".form-container");

let oldtab=usertab;
oldtab.classList.add("current-tab");

getfromsessionstorage();

function switchTab(clicktab)
{
    if(clicktab!=oldtab)
    {
        oldtab.classList.remove("current-tab");
        oldtab=clicktab;
        oldtab.classList.add("current-tab");

        if(!searchtab.classList.contains("active")){
            userinfoContainer.classList.remove("active");
            grantacesscontainer.classList.remove("active");
            searchtab.classList.add("active");
            searchform.classList.add("active");
        }

        else{
            searchtab.classList.remove("active");
            userinfoContainer.classList.remove("active");
            searchform.classList.remove("active");
            getfromsessionstorage();
            // ab weather show karne waale func ko call karna hai
        }

    }
    
}


usertab.addEventListener("click",()=>{
    switchTab(usertab);
});
searchtab.addEventListener("click",()=>{
    switchTab(searchtab);
});





function getfromsessionstorage(){
    const localcoordinates=sessionStorage.getItem("user-coordinates");

    if(!localcoordinates)
    {
        grantacesscontainer.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localcoordinates);
        fetchuserweatherinfo(coordinates);

    }
}

async function fetchuserweatherinfo(coordinates)
{
    const {lati,longi}=coordinates;
    grantacesscontainer.classList.remove("active");
    loadingScreen.classList.add("active");

    console.log(" inside the function !");

    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=db7ef2a84933962a968f4608f25c5884`);
        let result= await response.json();
        console.log(result);
        loadingScreen.classList.remove("active");
        userinfoContainer.classList.add("active");

        renderweatherinfo(result);
    }

    catch(err){

        loadingScreen.classList.remove("active");

        console.log(" failed to acess the data");
    }



}


function renderweatherinfo(weatherinfo)
{

    console.log(" helllo aagya");
    const cityName=document.querySelector(".cityname");
    console.log(" helllo aagya 1");
    const countryicon=document.querySelector(".cityicon");
    console.log(" helllo aagya2");
    const desc=document.querySelector(".weatherdesc");
    console.log(" helllo aagya3");
    const weathericon=document.querySelector(".dataweathericon");
    console.log(" helllo aagya 4");
    const weathertemp=document.querySelector(".weathertemp");
    console.log(" helllo aagya 5");
    const windspeed=document.querySelector(".windspeed-data");
    console.log(" helllo aagya 6");
    const humidity=document.querySelector(".humidity-data");
    console.log(" helllo aagya 7");
    const cloudspare=document.querySelector(".cloud-data");
    console.log("meh gaya");


    cityName.innerText=weatherinfo?.name;
    console.log(cityName);
    // countryicon.src=`https://flagcdn.com/144x108/${weatherinfo?.sys?.country.tolowercase()}.png`;
    countryicon.src=`https://flagcdn.com/144x108/in.png`;
    console.log(" helllo aagya10");
    desc.innerText=weatherinfo?.weather?.[0]?.description;
    console.log(" helllo aagya 11");
    weathericon.src=`https://openweathermap.org/img/w/${weatherinfo?.weather?.[0]?.icon}.png`;
    weathertemp.innerText=`${weatherinfo?.main?.temp}°C`;
    windspeed.innerText=`${weatherinfo?.wind?.speed}m/s `;
    humidity.innerText=`${weatherinfo?.main?.humidity}%`;
    cloudspare.innerText=`${weatherinfo?.clouds?.all}%`;









}

function getlocation(){
    if(navigator.geolocation)
    {

    }
    else{

    }
}

const gbtn=document.querySelector(".gbtn");
gbtn.addEventListener("click",getlocation);












// function renderdata(result){
//     let newpara=document.querySelector(".Temparturedata");

//     newpara.textContent= `${result?.main?.temp.toFixed(2)}`;
//     // document.body.append(newpara);
// }
 
// async function mylocation(lati,longi)
// {

//     const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=db7ef2a84933962a968f4608f25c5884`);
//     let result= await response.json();

//     console.log(" the weather is ",`${result?.main?.temp.toFixed(2)}`);
//     renderdata(result);


// }


function getlocation(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showposition)
    }

    else{

        console.log(" location error");
    }
}


function showposition(position)
{
    const userCoordinates={
    
      lati: position.coords.latitude,
      longi: position.coords.longitude,
    
     }

     console.log(userCoordinates);
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchuserweatherinfo(userCoordinates);

    // console.log(lati);
    // console.log(longi);

     
}

const searchInput=document.querySelector(".data-search-input");


searchform.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;
    console.log(searchInput.value);

    if(cityName === "")
        return;

    else{
        console.log("else meh aagya");
        fetchSearchWeatherinfo(cityName);

    }
})

 async function fetchSearchWeatherinfo(city){

       loadingScreen.classList.add("active");
       userinfoContainer.classList.remove("active");
       grantacesscontainer.classList.remove("active");


       try{
            const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db7ef2a84933962a968f4608f25c5884`);
            let result= await response.json();
            loadingScreen.classList.remove("active");
            userinfoContainer.classList.add("active");
            renderweatherinfo(result);

       }

       catch(err){

          loadingScreen.classList.remove("active");



       }
}





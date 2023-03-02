/* Global Variables */
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&zip=';
const apiKey = ',GB&appid=58c209f1fe5c3ebf55937919f4795f17';
const baseUrl = 'http://localhost:8000/';
const generateBtn = document.getElementById('generate');
const userContent = document.getElementById('content');
const userDate = document.getElementById('date');
const userTemp = document.getElementById('temp');
// generate current date
const currentDate = new Date();
// formating the current date
const newCurrentDate = (currentDate.getMonth()+1)+'-'+ currentDate.getDate()+'-'+ currentDate.getFullYear();



/* 
    click function that gets data from api and post to the local server and ,
    then resoponse the final data back to the client side again ,
    finally uppdating the UI of the Front-end page
*/
generateBtn.addEventListener('click',async () =>{

    const zipCode = document.getElementById('zip').value;
    const feelingCode = document.getElementById('feelings').value;

    getData(apiUrl+zipCode+apiKey)
    .then((res)=>{
        //console.log(res);
        let dataObj={
            temp:res.main.temp,
            date:newCurrentDate,
            userResponse:feelingCode,
        }
        return postData('/PostData',dataObj);
    })
    .then((res)=>{
        return getData('/GetData');
    }).then(res=>{
        updateUI(res);
    })
});

// global get data function

const getData = async (url) =>{
    const response = await fetch(url);
    try{
        const newData = await response.json();
        return newData;
    }catch(err){
        console.log("there's an error ",err);
    }
}

// global post data function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    });
    try{
        const newData = await response.json;
        return newData;
    }catch(err){
        console.log("there's an error ",err);
    }
}

// update UI function
const updateUI = async ( res ) => {
    userDate.innerHTML = res.date;
    userTemp.innerHTML = res.temp;
    userContent.innerHTML = res.userResponse;
}

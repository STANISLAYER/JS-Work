console.log("1");
export async function getRandomActivity() 
{
  
  let fetchData = fetch('https://www.boredapi.com/api/activity/')
    .then(response => response.json())
    .then(data => data.activity)
    .catch(()=>"Произошла Ошибка")

  return await fetchData;
}
export function updateActivity(activity){
  const element = document.querySelector("#activity");
  element.textContent = activity;
}

export async function updateRandomActivityEveryMinute() {
  setInterval(async ()=>{
    let activity = await getRandomActivity();
    updateActivity(activity);
  }, 1000);
}
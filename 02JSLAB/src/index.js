import { getRandomActivity, updateActivity, updateRandomActivityEveryMinute } from './activity.js';
// import { updateActivity } from './activity.js';
// import { updateRandomActivityEveryMinute } from './activity.js';

console.log("2");

// (async ()=>{
//   let activity = await getRandomActivity();
//   updateActivity(activity);
// })();

let activityPromise = new Promise((resolve)=>{
   resolve(getRandomActivity());
})
.then((activity)=>updateActivity(activity));


updateRandomActivityEveryMinute();
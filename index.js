const express = require('express');
const app = express();
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
//run npm start or nodemon (if you have nodemon installed globally)
// to run the app locally
//this sets the post at 3001 - go to localhost:3001 in your browser to see app
app.set('port', process.env.PORT || 3001);
app.locals.title = 'Twitter Hackery';
let manualRides = []
// at localhost:3001/, you should see the text in this response
app.get('/', (request, response) => {
  response.send('Tweeter Hackery');
});
function sendTweet() {
  return nightmare
    .goto('https://twitter.com/intent/tweet?text=Hello&via=smj268')
    .wait(500)
    .type('input[type="text"]', 'oversiteoversite@gmail.com')
    .type('input[type="password"]', 'oversite123')
    .type('input[type="password"]', '\u000d')
    .wait(2500)
    .evaluate(() => {
      let tweetBtn = [...document.querySelectorAll('span')].find(span => span.innerText === "Tweet")
      tweetBtn.addEventListener("click", e => { console.log("clicked") })
      tweetBtn.click()
    })
}
app.get('/send-tweet', async (request, response) => {
  try {
    var tweet = await sendTweet();
    return response.json(tweet);
  } catch (err) {
    console.log(err);
  }
});
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
const express = require('express');
const app = express();
const router = express.Router();
const moment = require('moment');

// About page route.
router.get("/", function(req, res) {
  res.send("I'm alive")
});

router.get("/bigtime_alert", function(req, res) {
  fetch(process.env.BIGTIME_ALERT_DISCORD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: '@here [Eternal Paradox] [<t:'+moment().unix()+':R>] ถึงเวลาทำเควสแล้ว!', })
  });
});

app.use(router);

app.listen(8080, function(err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", 8080);
});
const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use('/', express.static(path.join(__dirname, '/')))

app.get('/', function(request, response){
    response.sendFile(`${__dirname}\\index.html`);
});

app.listen(port, () => console.log(`BattleMap listening on port ${port}!`))
const app = require('./app');
const bodyParser = require('body-parser')

const mongoCon = require('./config/database');
require('dotenv').config();

app.get('/', (req, res)=>{
   res.send("Route is working")
})


app.use(bodyParser.json())





mongoCon()



const port = process.env.PORT || 6000;


app.listen(port, () => console.log(`Server is running on port ${port}`));

const app = require('./app');
const bodyParser = require('body-parser');

const mongoCon = require('./config/database');
const employeeRouter = require('./routes/employee')
require('dotenv').config();

app.get('/', (req, res) => {
	res.send('Route is working');
});

app.use(bodyParser.json());  
app.use(
	bodyParser.urlencoded({
	  extended: true,
	})
  );

mongoCon();



app.use('/api/employee', employeeRouter)

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

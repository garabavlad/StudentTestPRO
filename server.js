const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect database
connectDB();

//Midleware include express-validator:
app.use(
	express.json({
		extended : false
	})
);

//Defining routes:
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tests', require('./routes/tests'));
app.use('/api/results', require('./routes/results'));
app.use('/api/assignments', require('./routes/assignments'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

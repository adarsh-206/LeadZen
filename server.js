const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const taskRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());

app.use('/api', taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
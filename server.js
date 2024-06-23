const express = require('express');
const cors = require('cors');
const path = require('path');
const desuRoute = require('./routes/desu');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/desu', desuRoute);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  

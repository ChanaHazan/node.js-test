const express = require('express')
const usersRoutes = require('./routes/user')
const app = express()


app.use('/users', usersRoutes)

mongoose.connection.once('open', () => {
console.log('Connected to MongoDB')
})

app.listen(3000, () => console.log(`Server running on port
${PORT}`))
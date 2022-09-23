const mongoose = require('mongoose')
//const url = "mongodb://localhost:27017/Tamu_Project"
mongoose.connect('mongodb+srv://user:user@cluster0.lcji4ad.mongodb.net/Demo?retryWrites=true&w=majority',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
mongoose.connect(url)
const db = mongoose.connection
console.log("Successfully connected to mongodb database")
module.exports = db

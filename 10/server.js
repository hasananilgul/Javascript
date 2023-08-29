
const express = require('express');
const morgan = require('morgan')
 const mongoose =require('mongoose')
 const app = express()
 app.use(express.static('public'))
 app.use(morgan("tiny"))
const dbURL = 'mongodb+srv://hasananilgul:<hasananil1234.>@nodeblog.epx7ynt.mongodb.net/node-blog'
mongoose.connect(dbURL,{dbURL, useNewUrlParser: true , useUnifiedTopology: true})
.then((result) => console.listen(3000))
.catch(()=>console.log(err))

app.get('/', (req, res) =>{
  res.render('index', {title: 'Anasayfa' })
})
  app.get('/about', (req, res) => { res.render('about', {title: 'Hakkimizda'})
  })
  app.get('/about-us', (req, res) => { res.redirect('/about')
  })
  app.use((req, res) => {
  res.status(484).render('404', {title: 'Sayfa Bulunamadi'})
  })
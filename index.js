const express = require('express');
const axios  = require('axios');
const cheerio = require('cheerio');
const { MongoClient } = require('mongodb');

const app =  express();

const PORT = process.env.PORT || 3000;
const MONGO_URL="mongodb://127.0.0.1";
 function creatconnection(){
const client=new MongoClient(MONGO_URL);
 client.connect();
console.log("mongo is connected");

}
creatconnection();


const website = 'https://www.flipkart.com/search?q=mobile&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off';

try {
  axios(website).then((res) => {
    const data = res.data;
    const $ = cheerio.load(data);

    let content = [];

    $('._2kHMtA', data).each(function () {
      const title = $(this).text();
      const url = $(this).find('a').attr('href');

      content.push({
        title,
        url,  
    });


      app.get('/', (req, res) => {
        const{title}=req.params;
      console.log(req.params,title);
       
       res.json(content);

      });
    });
  });



}
 catch (error) {
  console.log(error, error.message);
}

app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});
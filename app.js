const express = require("express");
const axios=require('axios')
const fs = require("fs");
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const token = '1708097504:AAE4icrdudVmPTipAOB0sbvtvewOF2Ae0Ww';
var path = require('path');

const bot = new TelegramBot(token, {polling: true});

var fpath ='./public/';
var filepath = path.join(fpath,"1.png");

function getResult(msg,query){

    axios.get("https://mighty-island-20790.herokuapp.com/",{
        params: {
          search_type: query
        }
      })

      .then(function(res){
          response=res.data
          console.log(response);
          var text="";
          for(var i=0;i<response.length;i++)
          {
              text=text+ "Exchange: "+response[i].name+"\n"+"Last Traded Price: ₹ "+thousands_separators(parseFloat(response[i].last))
              +"\n"+"Buy/Sell Price: ₹ "+thousands_separators(parseFloat(response[i].buy))+"/ ₹ "+thousands_separators(parseFloat(response[i].sell))+"\n \n"

          }
          bot.sendMessage(msg.chat.id, text);
      })
      .catch(function(error)
      {
          response=[]
      })

}
function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }


  bot.onText(/\/help/, (msg) => {
    
    bot.sendMessage(msg.chat.id, "Please enter a symbol in the format e.g. /BTC  \n\nList of assets: BTC, ETH, USDT, TRX, XRP, DASH, ZEC, XEM, IOST");
        
    });   

bot.onText(/\/start/, (msg) => {
    
    bot.sendPhoto(msg.chat.id,'./public/1.png');
        
    });   
    bot.onText(/\/btc/, (msg) => {
        getResult(msg,"BTC-INR")
    }); 
    bot.onText(/\/BTC/, (msg) => {
        getResult(msg,"BTC-INR")
    }); 
    
    
    bot.onText(/\/eth/, (msg) => {
        getResult(msg,"ETH-INR")
    });
    bot.onText(/\/ETH/, (msg) => {
        getResult(msg,"ETH-INR")
    });  
    
    
    bot.onText(/\/usdt/, (msg) => {    
        getResult(msg,"USDT-INR")
    }); 
    bot.onText(/\/USDT/, (msg) => {
        getResult(msg,"USDT-INR")
    });   
    
    
    bot.onText(/\/xrp/, (msg) => {
        getResult(msg,"XRP-INR")
    });
    bot.onText(/\/XRP/, (msg) => {
        getResult(msg,"XRP-INR")
    }); 
    
    
    bot.onText(/\/zec/, (msg) => {
        getResult(msg,"ZEC-INR")
    }); 
    bot.onText(/\/ZEC/, (msg) => {
        getResult(msg,"ZEC-INR")
    });
    
    
    bot.onText(/\/dash/, (msg) => {
        getResult(msg,"DASH-INR")
    }); 
    bot.onText(/\/DASH/, (msg) => {
        getResult(msg,"DASH-INR")
    }); 
    
    
    bot.onText(/\/iost/, (msg) => {
        getResult(msg,"IOST-INR")
    }); 
    bot.onText(/\/IOST/, (msg) => {
        getResult(msg,"IOST-INR")
    }); 
    
    
    bot.onText(/\/trx/, (msg) => {
        getResult(msg,"TRX-INR")
    }); 
    bot.onText(/\/TRX/, (msg) => {
        getResult(msg,"TRX-INR")
    }); 
    
    
    bot.onText(/\/xem/, (msg) => {
        getResult(msg,"XEM-INR")
    }); 
    bot.onText(/\/XEM/, (msg) => {
        getResult(msg,"XEM-INR")
    });     
    
     

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({extended: false,limit: '50mb'}));

app.get("/", (req, res)=>{

    axios.get("https://mighty-island-20790.herokuapp.com/")
      .then(function(response){
        responses=response.data
        console.log(responses);
        
        res.render("index",{data:responses})

    })
    
    .catch(function(error)
    {
        console.log(error+"yaya");
    })
});

function img(data) {
    var reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
    var match = data.match(reg);
    var baseType = {
      jpeg: 'jpg'
    };
  
    baseType['svg+xml'] = 'svg'
  
    if (!match) {
      throw new Error('image base64 data error');
    }
  
    var extname = baseType[match[1]] ? baseType[match[1]] : match[1];
  
    return {
        extname: '.' + extname,
        base64: match[2]
    }; 
  }
  

app.post("/",(req,res)=>{
    var tooth=(req.body)
    base64Str=tooth
    let arr=Object.keys(tooth)
    baseString=tooth[arr[0]]
    var base64Str=String(baseString)
    var result=img(base64Str)
    fs.writeFile(filepath, result.base64, { encoding: 'base64' }, function(err) {
    console.log(err);
  });
    
})
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });


bot.on("polling_error", (err) => console.log(err));

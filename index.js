const TelegramBot = require('node-telegram-bot-api');
const axios=require('axios')


const token = '1708097504:AAE4icrdudVmPTipAOB0sbvtvewOF2Ae0Ww';

const bot = new TelegramBot(token, {polling: true});

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
    
    bot.sendMessage(msg.chat.id, "Get Crypto Pricing In INR \n\nPlease enter a symbol in the format e.g. /BTC  \n\nList of assets: BTC, ETH, USDT, TRX, XRP, DASH, ZEC, XEM, IOST");
        
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

 



 






   


  

bot.on("polling_error", (err) => console.log(err));
// Import necessary modules
const express = require('express');
const axios = require('axios');
var bodyParser = require('body-parser')
const { randomDigit, extractDetails, findOperatorCode } = require('./function');
// Create an instance of Express
const app = express();
const port = 3000; // Choose the port you want to run your server on

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

app.get('/', (req, res) => {
  console.log("GET api call", req.body);
  res.send('Hello World!');
});
 
async function sendMessageToWhatsApp({message,phone}) {
  try {
    const response = await axios.post('https://wa-toolbox.web.app/webhooks/HUQE3OKQ3', {
      action: 'send-message',
      type: 'text',
      content: message,
      phone: phone
    });

    console.log('Response: sendMessage To WhatsApp', {
      action: 'send-message',
      type: 'text',
      content: message,
      phone: phone
    },response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

app.get('/test', async (req, res) => {

  try {

    const usertx = randomDigit()

    const response = await axios.get('https://cyrusrecharge.in/api/recharge.aspx', {
      params: {
        memberid: 'AP420123',
        pin: '36FDD0063D',
        number: '8233639160',
        operator: 'AT',
        circle: '19',
        amount: '10',
        usertx: usertx,
        format: 'json'
      }
    });

    console.log(`Recharge successful. Response: ${usertx}`, response.data);

    res.status(200).json({
      status: true,
      message: 'Recharge successful',
      data: response.data,
    });
  } catch (error) {

    console.error('Error occurred during recharge:', error);

    res.status(400).json({
      status: 400,
      statusText: "BAD_REQUEST",
      message: "Error occurred during recharge",
    });
  }
});

app.get('/recharge', async (req, res) => {

  try {
    const message = req.query.message
    const { number, operator, circle, amount } = extractDetails(message);
    const usertx = randomDigit()
    const operatorCode = findOperatorCode(operator);

    const payload = {
      memberid: 'AP420123',
      pin: '36FDD0063D',
      number,
      operator: operatorCode,
      circle,
      amount,
      usertx,
      format: 'json'
    }

    console.log(`Recharge Request: ${usertx}`, payload);

    const response = await axios.get('https://cyrusrecharge.in/api/recharge.aspx', {
      params: payload
    });

    console.log(`Recharge successful. Response: ${usertx}`, response.data);

    res.status(200).json({
      status: true,
      message: 'Recharge successful',
      data: response.data,
    });
  } catch (error) {

    console.error('Error occurred during recharge:', error);

    res.status(400).json({
      status: 400,
      statusText: "BAD_REQUEST",
      message: "Error occurred during recharge",
    });
  }
}); 

app.get('/wa-recharge', async (req, res) => {

  try {
    console.log("Query  parameter",req.query);
    console.log("Query  parameter",req.params);
    console.log("Query  parameter",req.body);
    const message = req.query.m_content
    const { number, operator, circle, amount } = extractDetails(message);
    const usertx = randomDigit()
    const operatorCode = findOperatorCode(operator);

    const payload = {
      memberid: 'AP420123',
      pin: '36FDD0063D',
      number,
      operator: operatorCode,
      circle,
      amount,
      usertx,
      format: 'json'
    }

    console.log(`Recharge Request: ${usertx}`, payload);

    const response = await axios.get('https://cyrusrecharge.in/api/recharge.aspx', {
      params: payload
    });

    console.log(`Recharge successful. Response: ${usertx}`, response.data);

    res.status(200).json({
      status: true,
      message: 'Recharge successful',
      data: response.data,
    });
  } catch (error) {

    console.error('Error occurred during recharge:', error);

    res.status(400).json({
      status: 400,
      statusText: "BAD_REQUEST",
      message: "Error occurred during recharge",
    });
  }
}); 

app.post('/wa-recharge', async (req, res) => {

  try {
    console.log("Query  parameter post",req.body);

    const {m_content ,m_phone}  = req.body
    let operator_code;
    let circle_code;
    const { number, operator, circle, amount } = extractDetails(m_content);
    const usertx = randomDigit()
    const operatorCode = findOperatorCode(operator);

    operator_code = operator
    circle_code = circle

    if(!operator || !circle){

      const payload = {
        APIID: 'AP420123',
        PASSWORD: '8878E7F4D8',
        MOBILENUMBER:number
      }

      const response = await axios.get('https://cyrusrecharge.in/API/CyrusOperatorFatchAPI.aspx', {
        params: payload
      });

      console.log(response.data,"Operatord details");

      if(response.data){
        const {OperatorCode , CircleCode} =  response.data 
        operator_code= OperatorCode
        circle_code= CircleCode
      }
    }

    const payload = {
      memberid: 'AP420123',
      pin: '36FDD0063D',
      number,
      operator :operator_code,
      circle:circle_code,
      amount,
      usertx,
      format: 'json'
    }

    console.log(`Recharge Request: ${usertx}`, payload);

    const response = await axios.get('https://cyrusrecharge.in/api/recharge.aspx', {
      params: payload
    });

    console.log(`Recharge successful. Response: ${usertx}`, response.data);

    const { ApiTransID,Status ,ErrorMessage,OperatorRef,TransactionDate} = response.data 

    if(Status=='Success'){ 
     const newResponse =  await sendMessageToWhatsApp({
        message:`Recharge of ${amount} rupees successful for number ${number} with trasaction ref ${ApiTransID}.`,
        phone:m_phone
      })
      console.log(newResponse,"Send  Success Message");
      res.status(200).json({
        status: true,
        message: `Recharge of ${amount} rupees successful for number ${number} with trasaction ref ${ApiTransID}.`,
        data: response.data,
      });
    }else{ 
      const newResponse =  await sendMessageToWhatsApp({
        message:`Recharge of ${amount} rupees failed for number ${number}.`,
        phone:m_phone
      })
      console.log(newResponse,"Send  failed Message");
      res.status(200).json({
        status: true,
        message: `Recharge of ${amount} rupees failed for number ${number}.`,
        data: response.data,
      });
    }

  
  } catch (error) {

    console.error('Error occurred during recharge:', error);

    res.status(400).json({
      status: 400,
      statusText: "BAD_REQUEST",
      message: "Error occurred during recharge",
    });
  }
});


app.get('/callback', async (req, res) => {

  try {

    console.log(`Recharge callback .`,req.query);

    res.status(200).json({
      status: true,
      message: 'Recharge successful',
      data: response.data,
    })

    
  } catch (error) {

    console.error('Error occurred during recharge:', error);

    res.status(400).json({
      status: 400,
      statusText: "BAD_REQUEST",
      message: "Error occurred during recharge",
    })

  }
});

app.post('/', (req, res) => {
  console.log("Post api call", req.body);
  res.send('Hello World!');
}); 
// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


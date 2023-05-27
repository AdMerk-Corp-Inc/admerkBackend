const axios = require('axios');

const apiKey = 'your-api-key';
const id = 'your-id';

axios.post('https://services.mytravelagency.app/webservices/api_2_04.asmx/Reserva_GET', {
  apikey: apiKey,
  id: id
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});

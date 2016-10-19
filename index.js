var request = require('request');
var mqtt = require('mqtt');

// MQTT settings
var url = 'mqtt://127.0.0.1';
var client = mqtt.connect(url);

// POST request settings
var api = 'https://delta-api.fourfusion.nl/';

client.on('connect', function () {
  console.log('connected, subscribing');

  // Get all the LoRaWAN packets that are send over MQTT
  client.subscribe('lora/+/up');
});

/*
topic = euid of the LoRaWAN device
message = the MQTT message that's send by the LoRaWAN device

This function reacts when the Gateway receives a MQTT message. It then parses the messages to JSON objects.
*/
client.on('message', function (topic, message) {
  var eui = topic.split('/')[1];

  // convert MQTT message to JSON object
  var json = JSON.parse(message.toString());

  /* freq = json.freq;
  datarate = json.datr;
  snr = json.lsnr;
  rssi = json.rssi;
  sequence_number = json.seqn;
  timestamp = json.timestamp; */

  // decode base64 payload
  var data = new Buffer(json.data, 'base64');
  data = data.toString();
  console.log('eui: ', eui);
  console.log('data: ', data);
  submit(eui, data);
});

function submit (eui, data) {
  request.post({
    url: api + eui + '/measurement',
    method: 'POST',
    json: true,
    headers: {
      'content-type': 'applications/json'
    },
    body: {
      sensor_id: 1,
      value: data
    }
  },
  function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(data);
    }
  });
}

client.on('error', function (error) {
  console.log('mqtt error: ', error);
  process.exit();
});

//npm install --save-dev _PACKAGE_
var request = require('request');
var mqtt = require('mqtt');

//MQTT settings
var url = 'mqtt://127.0.0.1';
var client = mqtt.connect(url);

//POST request settings
var api = 'https://delta-api.fourfusion.nl/test/';

client.on('connect', function () {
    console.log('connected, subscribing');

    //Get all the LoRaWAN packets that are send over MQTT
    client.subscribe('lora/+/up');
});

/*
topic = euid of the LoRaWAN device
message = the MQTT message that's send by the LoRaWAN device

This function reacts when the Gateway receives a MQTT message. It then parses the messages to JSON objects.
*/
client.on('message', function (topic, message) {
    eui = topic.split('/')[1];

    // convert MQTT message to JSON object
    json = JSON.parse(message.toString());

    /*freq = json.freq;
    datarate = json.datr;
    snr = json.lsnr;
    rssi = json.rssi;
    sequence_number = json.seqn;
    timestamp = json.timestamp;*/

    // decode base64 payload
    data = new Buffer(json.data, "base64");
    data = data.toString();
    console.log('eui: ', eui);
    console.log('data: ', data);
    submit(eui, data);
});

function submit(eui, data){
    request.post(
	'https://delta-api.fourfusion.nl/test/'+eui,
    {
      "json": {
        "data": data
        }
    },
	function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body)
		}
	}
);
}

client.on('error', function (error) {
    console.log('mqtt error: ', error);
    exit();
});
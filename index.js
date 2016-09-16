//npm install --save-dev _PACKAGE_
var request = require('request');
var mqtt = require('mqtt');

//mqtt settings
var url = "mqtt://127.0.0.1";
var client = mqtt.connect(url);

client.on('connect', function() {
    console.log("connected, subscribing");

    // subscribe to all upstream lora packets
    client.subscribe('lora/+/up');
});

client.on('message', function (topic, message) {
    console.log("topic: ", topic);
    console.log("message: ", message.toString());

    eui = topic.split('/')[1];

    // convert MQTT message to JSON object
    json = JSON.parse(message.toString());

    freq = json.freq;
    datarate = json.datr;
    snr = json.lsnr;
    rssi = json.rssi;
    sequence_number = json.seqn;
    timestamp = json.timestamp;

    // decode base64 payload
    data = new Buffer(json.data, "base64");
    console.log("data: ", data.toString());
});

client.on("error", function(error) {
    console.log("mqtt error: ", error);
    exit();
});
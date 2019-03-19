const nmap = require('node-nmap');
let Service, Characteristic;

module.exports = function (homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	nmap.nmapLocation = "nmap";

	homebridge.registerAccessory('homebridge-wifi-room-sensor', 'WiFiRoomSensor', WifiRoomSensor);
}

function WifiRoomSensor(log, config) {
	this.services = [];
	this.log = log;
	this.name = config.name || 'WiFi Room Sensor';
	this.mac = config.mac;

	if (!this.mac) {
		throw new Error('Your must provide MAC address of the room sensor.');
	}

	this.service = new Service.MotionSensor(this.name);

	this.service
		.getCharacteristic(Characteristic.MotionDetected)
		.on('get', this.getRoomSensorState.bind(this));

	this.serviceInfo = new Service.AccessoryInformation();

	this.serviceInfo
		.setCharacteristic(Characteristic.Manufacturer, 'Clauzewitz')
		.setCharacteristic(Characteristic.Model, 'WiFi Room Sensor')
		.setCharacteristic(Characteristic.SerialNumber, this.mac.toUpperCase());

	this.services.push(this.service);
	this.services.push(this.serviceInfo);
}

WifiRoomSensor.prototype = {
	getRoomSensorState: function (callback) {
		let quickScan = new nmap.QuickScan('192.168.0.0/24');
		var state = false;

		quickScan.on('complete', function (result) {
			if (result && result.length > 0) {
				result.some(function (value) {
					state = (value.mac == this.mac);
					return state;
				});
			}

			callback(null, state);
		});
		
		quickScan.on('error', function (error) {
			callback(new Error(error));
		});
		
		quickScan.startScan();
	},

	identify: function (callback) {
		callback();
	},

	getServices: function () {
		return this.services;
	}
};

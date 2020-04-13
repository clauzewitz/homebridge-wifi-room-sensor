'use strict';

const exec = require('child_process').exec;
const version = require('./package.json').version;
let Service;
let Characteristic;
let logger;

module.exports = function (homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	homebridge.registerAccessory('homebridge-wifi-room-sensor', 'WiFiRoomSensor', WifiRoomSensor);
}

function WifiRoomSensor(log, config) {
	logger = log;

	this.services = [];
	this.name = config.name || 'WiFi Room Sensor';
	this.ip = config.ip;
	this.interval = Number(config.interval) || 30;
	this.hysteresis = Number(config.hysteresis) || 10;
	this.sensorState = undefined;
	this.lastSeen = 0;

	if (!this.ip) {
		throw new Error('Your must provide IP address of the room sensor.');
	}

	this.service = new Service.OccupancySensor(this.name);

	this.service
		.getCharacteristic(Characteristic.OccupancyDetected)
		.on('get', this.getRoomSensorState.bind(this));

	this.serviceInfo = new Service.AccessoryInformation();

	this.serviceInfo
		.setCharacteristic(Characteristic.Manufacturer, 'Clauzewitz')
		.setCharacteristic(Characteristic.Model, 'WiFi Room Sensor')
		.setCharacteristic(Characteristic.SerialNumber, this.ip)
		.setCharacteristic(Characteristic.FirmwareRevision, version);

	this.services.push(this.service);
	this.services.push(this.serviceInfo);
	
	this.discover();
}

WifiRoomSensor.prototype = {
	discover: function () {
		setInterval(this.updateRoomSensorState.bind(this), this.interval * 1000);
	},
	getRoomSensorState: function (callback) {
		callback(null, this.sensorState);
	},
	updateRoomSensorState: function () {
		const that = this;
		
		exec('bash -c "if ping ' + this.ip + ' -c 1 -w ' + parseInt(this.interval / 2) + ' &> /dev/null; then echo online; else echo offline; fi"', function (error, stdout, stderr) {
			if (error) {
				logger(error);
			} else {
				logger(that.ip + ' is ' + stdout);
				if (stdout.includes('online')) {
					that.lastSeen = Date.now();
					that.sensorState = true;
				} else if (Date.now() - that.lastSeen < that.hysteresis * 60000) {
					that.sensorState = true;
				} else {
					that.sensorState = false;
				}
				that.service.getCharacteristic(Characteristic.OccupancyDetected).updateValue(that.sensorState);
			}
		});
	},
	identify: function (callback) {
		callback();
	},

	getServices: function () {
		return this.services;
	}
};

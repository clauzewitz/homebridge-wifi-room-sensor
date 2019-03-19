const nmap = require('node-nmap');
const util = require('util');
let Service, Characteristic, UUIDGen;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	UUIDGen = homebridge.hap.uuid;

	homebridge.registerAccessory('homebridge-wifi-room-sensor', 'MiRobotVacuum', MiRobotVacuum);
}

function initCustomService() {
	const baseProp = {
		format: Characteristic.Formats.FLOAT,
		unit: '%',
		perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
	};

	let statusSensorsUUID = UUIDGen.generate('Sensors status');
	Characteristic.StatusSensors = function () {
		Characteristic.call(this, 'Sensors status', statusSensorsUUID);
		
		this.setProp(baseProp);

		this.value = this.getDefaultValue();
	};
	util.inherits(Characteristic.StatusSensors, Characteristic);
	Characteristic.StatusSensors.UUID = statusSensorsUUID;

	let statusFilterUUID = UUIDGen.generate('Filter status');
	Characteristic.StatusFilter = function () {
		Characteristic.call(this, 'Filter status', statusFilterUUID);
		
		this.setProp(baseProp);

		this.value = this.getDefaultValue();
	};
	util.inherits(Characteristic.StatusFilter, Characteristic);
	Characteristic.StatusFilter.UUID = statusFilterUUID;

	let statusSideBrushUUID = UUIDGen.generate('Side brush status');
	Characteristic.StatusSideBrush = function () {
		Characteristic.call(this, 'Side brush status', statusSideBrushUUID);
		
		this.setProp(baseProp);

		this.value = this.getDefaultValue();
	};
	util.inherits(Characteristic.StatusSideBrush, Characteristic);
	Characteristic.StatusSideBrush.UUID = statusSideBrushUUID;

	let statusMainBrushUUID = UUIDGen.generate('Main brush status');
	Characteristic.StatusMainBrush = function () {
		Characteristic.call(this, 'Main brush status', statusMainBrushUUID);
		
		this.setProp(baseProp);

		this.value = this.getDefaultValue();
	};
	util.inherits(Characteristic.StatusMainBrush, Characteristic);
	Characteristic.StatusMainBrush.UUID = statusMainBrushUUID;

	let statusUUID = UUIDGen.generate('Status Service');
	Service.Status = function (displayName, subType) {
		Service.call(this, displayName, statusUUID, subType);

		this.addCharacteristic(Characteristic.StatusSensors);
		this.addCharacteristic(Characteristic.StatusFilter);
		this.addCharacteristic(Characteristic.StatusSideBrush);
		this.addCharacteristic(Characteristic.StatusMainBrush);
	}
	util.inherits(Service.Status, Service);
	Service.Status.UUID = statusUUID;
}

function MiRobotVacuum(log, config) {
	this.services = [];
	this.log = log;
	this.name = config.name || 'WiFi Room Sensor';
	this.mac = config.mac;

	if (!this.mac) {
		throw new Error('Your must provide MAC address of the room sensor.');
	}

	this.serviceInfo = new Service.AccessoryInformation();

	this.serviceInfo
		.setCharacteristic(Characteristic.Manufacturer, 'Clauzewitz')
		.setCharacteristic(Characteristic.Model, 'WiFi Room Sensor')
		.setCharacteristic(Characteristic.SerialNumber, this.mac.toUpperCase());

	this.services.push(this.serviceInfo);

	this.discover();
}

MiRobotVacuum.prototype = {
	discover: function() {
		const that = this;
		let log = that.log;

	},

	getRoomSensorState: function(callback) {
		if (!this.device) {
			callback(new Error('No robot is discovered.'));
			return;
		}

		callback(null, lifetimepercent);
	},

	identify: function(callback) {
		callback();
	},

	getServices: function() {
		return this.services;
	}
};

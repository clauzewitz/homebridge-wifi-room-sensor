[![npm version](https://badge.fury.io/js/homebridge-wifi-room-sensor.svg)](https://badge.fury.io/js/homebridge-wifi-room-sensor)

# homebridge-wifi-room-sensor
This is WiFi Room Sensor plugin for [Homebridge](https://github.com/nfarina/homebridge). 



### Features
* Display sensors state.



### Installation
1. Install required packages.

   ```
   npm install -g homebridge-wifi-room-sensor
   ```

2. Check the IP address of WiFi Room Sensor.

3. Add these values to `config.json`.

    ```
      "accessories": [
        {
          "accessory": "WiFiRoomSensor",
          "name": "WiFi Room Sensor",
          "ip": "TOKEN_FROM_STEP_2",
          "interval": 30,
          "hysteresis": 10
        }
      ]
    ```
    Interval is measured in seconds and hysteresis is measured in minutes.

4. Restart Homebridge, and your WiFi Room Sensor will be added to Home app.



# License
MIT License

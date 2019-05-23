[![npm version](https://badge.fury.io/js/homebridge-wifi-room-sensor.svg)](https://badge.fury.io/js/homebridge-wifi-room-sensor)

# homebridge-wifi-room-sensor

This is WiFi Room Sensor plugin for [Homebridge](https://github.com/nfarina/homebridge). 



### Features

* Display sensors state.



### Installation

1. Install required library.

   ```
   apt-get install nmap
   ```

2. Install required packages.

   ```
   npm install -g homebridge-wifi-room-sensor
   ```

3. Check the MAC address and IP address of WiFi Room Sensor.

4. Add these values to `config.json`.

    ```
      "accessories": [
        {
          "accessory": "WiFiRoomSensor",
          "name": "WiFi Room Sensor",
          "ip": "TOKEN_FROM_STEP_3",
          "mac": "TOKEN_FROM_STEP_3",
          "interval": 5000
        }
      ]
    ```

4. Restart Homebridge, and your WiFi Room Sensor will be added to Home app.



### License

See the [LICENSE](https://github.com/clauzewitz/homebridge-wifi-room-sensor/blob/master/LICENSE.md) file for license rights and limitations (MIT).
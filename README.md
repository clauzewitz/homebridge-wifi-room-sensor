# homebridge-wifi-room-sensor

This is WiFi Room Sensor plugin for [Homebridge](https://github.com/nfarina/homebridge). 



### Features

* Display sensors state.



### Installation

1. Install required packages.

   ```
   npm install -g homebridge-wifi-room-sensor
   ```

2. Check the MAC address of WiFi Room Sensor.

3. Add these values to `config.json`.

    ```
      "accessories": [
        {
          "accessory": "WiFiRoomSensor",
			    "name": "WiFi Room Sensor",
			    "mac": "TOKEN_FROM_STEP_2"
        }
      ]
    ```

4. Restart Homebridge, and your WiFi Room Sensor will be added to Home app.



### License

See the [LICENSE](https://github.com/clauzewitz/homebridge-wifi-room-sensor/blob/master/LICENSE.md) file for license rights and limitations (MIT).




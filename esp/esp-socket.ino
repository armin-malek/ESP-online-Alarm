#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ArduinoJson.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

#include <Hash.h>

ESP8266WiFiMulti WiFiMulti;
SocketIOclient socketIO;


int redLed = 16;  // red LED
int pirPin = 5;   // PIR Out pin     D1
int pirStat = 0;  // PIR status
void setup() {
  pinMode(redLed, OUTPUT);
  pinMode(pirPin, INPUT);

  Serial.begin(9600);

  //Serial.setDebugOutput(true);
  //USE_SERIAL.setDebugOutput(true);

  Serial.println();
  Serial.println();
  Serial.println();

  for (uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
    //Serial.flush();
    delay(1000);
  }

  // disable AP
  if (WiFi.getMode() & WIFI_AP) {
    WiFi.softAPdisconnect(true);
  }

  Serial.println("after disable");
  WiFiMulti.addAP("Armin", "Vyper@2077");

  Serial.println("Connecting to WIFI");
  //WiFi.disconnect();
  while (WiFiMulti.run(5000) != WL_CONNECTED) {
    Serial.println("is run");
    delay(100);
  }

  String ip = WiFi.localIP().toString();
  Serial.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

  socketIO.beginSSL("armin-esp.iran.liara.run", 443,"/socket.io/?EIO=4");
  // server address, port and URL
  //socketIO.begin("it1.thotero.com", 3000, "/socket.io/?EIO=4");
  //socketIO.begin("armin-esp.iran.liara.run", 443,"");
  //socketIO.beginSSL("armin-esp.iran.liara.run", 443, "/socket.io/?transport=websocket", "0D AE 96 5D A1 16 29 2A E8 EF 19 F8 9B 19 BE 4B 9E 1D A9 6D");

  // event handler
  socketIO.onEvent(socketIOEvent);
}

bool hasSend = false;
unsigned long messageTimestamp = 0;
bool registered = false;
void loop() {

  socketIO.loop();

  pirStat = digitalRead(pirPin);
  if (pirStat == HIGH) {
    if (!hasSend) {
      digitalWrite(redLed, LOW);
      Serial.printf("Detected Movement!!!");
      // creat JSON message for Socket.IO (event)
      DynamicJsonDocument doc(1024);
      JsonArray array = doc.to<JsonArray>();

      // add evnet name
      // Hint: socket.on('event_name', ....
      array.add("movement");

      // add payload (parameters) for the event
      JsonObject param1 = array.createNestedObject();
      param1["mac"] = WiFi.macAddress();

      // JSON to String (serializion)
      String output;
      serializeJson(doc, output);

      // Send event
      socketIO.sendEVENT(output);
      
      // Print JSON for debugging
      Serial.println(output);
      //socketIO.sendEVENT("message","i see you")
      hasSend = true;
    }
  } else {
    hasSend = false;
    digitalWrite(redLed, HIGH);
  }
}

void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case sIOtype_DISCONNECT:
      Serial.printf("[IOc] Disconnected!\n");
      break;
    case sIOtype_CONNECT:
      Serial.printf("[IOc] Connected to url: %s\n", payload);

      // join default namespace (no auto join in Socket.IO V3)
      socketIO.send(sIOtype_CONNECT, "/");
      break;
    case sIOtype_EVENT:
      Serial.printf("[IOc] get event: %s\n", payload);
      break;
    case sIOtype_ACK:
      Serial.printf("[IOc] get ack: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_ERROR:
      Serial.printf("[IOc] get error: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_BINARY_EVENT:
      Serial.printf("[IOc] get binary: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_BINARY_ACK:
      Serial.printf("[IOc] get binary ack: %u\n", length);
      hexdump(payload, length);
      break;
  }
}
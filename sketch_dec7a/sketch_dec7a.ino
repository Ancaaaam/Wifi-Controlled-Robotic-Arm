
#include <SoftwareSerial.h>
#include <Servo.h>

// Configurare ESP8266
SoftwareSerial esp8266(10, 11); // RX, TX
#define serialCommunicationSpeed 115200
#define DEBUG true

// Configurare Servomotoare
Servo myservo1, myservo2, myservo3, myservo4;
int pos1 = 90, pos2 = 90, pos3 = 90, pos4 = 90;
int angle1sp = 90, angle2sp = 90, angle3sp = 90, angle4sp = 90;
int servo_speed = 6; //viteza servomotoarelor

void setup() {
    // Inițializare Servomotoare
    myservo1.attach(3);
    myservo1.write(pos1);
    myservo2.attach(5);
    myservo2.write(pos2);
    myservo3.attach(6);
    myservo3.write(pos3);
    myservo4.attach(9);
    myservo4.write(pos4);

    Serial.begin(serialCommunicationSpeed);
    esp8266.begin(serialCommunicationSpeed);

    // Configurare modul WiFi
    InitWifiModule();
}

void sendSimpleResponse(String message) {
    String response = message + "\r\n";
    esp8266.print(response);
    if (DEBUG) {
        Serial.println("Sent response: " + response);
    }
}

void loop() {
    if (esp8266.available()) {
        if(esp8266.find("+IPD,")) {
          delay(1000);
          int connectionId = esp8266.read() - 48;
          String msg;
          esp8266.find("?"); //cursul merge pana cand comanda este gasita
          msg = esp8266.readStringUntil(' '); //citeste mesajul
          String command = msg.substring(0, 3); //comanda are mai intai "srs"
          String valueStr1 = msg.substring(4, 7);   //pozitia primul servo
          String valueStr2 = msg.substring(8,11);   //pozitia celui de-al doilea servo
          String valueStr3 = msg.substring(12,15);   //pozitia celui de-al 3 servo
          String valueStr4 = msg.substring(16,19);   //pozitia celui de-al 4 servo

          //transforma in int pozitiile primite
          angle1sp = valueStr1.toInt();         
          angle2sp = valueStr2.toInt();         
          angle3sp = valueStr3.toInt();         
          angle4sp = valueStr4.toInt();         
          
          if (DEBUG) { 
            Serial.print(command);
            Serial.print(": ");
            Serial.print(angle1sp);
            Serial.print(", ");
            Serial.print(angle2sp);
            Serial.print(", ");
            Serial.print(angle3sp);
            Serial.print(", ");
            Serial.print(angle4sp);
          }

          //construieste raspunsul http pe care il trimite esp catre browser
          if(angle1sp == 0 &&angle2sp == 0 && angle3sp == 0 && angle4sp == 0) {

            String message = "ERROR: 0,0,0,0 received";

            String httpResponse = "HTTP/1.1 200 OK\r\n";
            httpResponse += "Content-Type: text/plain\r\n";
            httpResponse += "Access-Control-Allow-Origin: *\r\n";
            httpResponse += "Content-Length: " + String(message.length()) + "\r\n";
            httpResponse += "\r\n";
            httpResponse += message;

            String cipSend ="AT+CIPSEND=";
            cipSend += connectionId;
            cipSend += ",";
            cipSend += httpResponse.length();
            cipSend += "\r\n";

            sendData(cipSend, 1000, DEBUG);
            sendData(httpResponse, 1000, DEBUG);
            delay(50);
          } else {
            String message = "OK";

            String httpResponse = "HTTP/1.1 200 OK\r\n";
            httpResponse += "Content-Type: text/plain\r\n";
            httpResponse += "Access-Control-Allow-Origin: *\r\n";
            httpResponse += "Content-Length: " + String(message.length()) + "\r\n";
            httpResponse += "\r\n";
            httpResponse += message;

            String cipSend ="AT+CIPSEND=";
            cipSend += connectionId;
            cipSend += ",";
            cipSend += httpResponse.length();
            cipSend += "\r\n";

            sendData(cipSend, 1000, DEBUG);
            sendData(httpResponse, 2000, DEBUG);
            delay(50);
          }
        }
      }
  
  // muta servomotoarele
  if (pos1 > angle1sp) {
    pos1 -= 1;
    myservo1.write(pos1);
  }
  if (pos1 < angle1sp) {
    pos1 += 1;
    myservo1.write(pos1);
  }

  if (pos2 > angle2sp) {
    pos2 -= 1;
    myservo2.write(pos2);
  }
  if (pos2 < angle2sp) {
    pos2 += 1;
    myservo2.write(pos2);
  }

  if (pos3 > angle3sp) {
    pos3 -= 1;
    myservo3.write(pos3);
  }
  if (pos3 < angle3sp) {
    pos3 += 1;
    myservo3.write(pos3);
  }

  if (pos4 > angle4sp) {
    pos4 -= 1;
    myservo4.write(pos4);
  }
  if (pos4 < angle4sp) {
    pos4 += 1;
    myservo4.write(pos4);
  }
  delay(5);
}


//trimite date catre eso8266
String sendData(String command, const int timeout, boolean debug)
{
  String response = "";
  esp8266.print(command);
  long int time = millis();
  while ( (time + timeout) > millis())
  {
    while (esp8266.available())
    {
      char c = esp8266.read();
      response += c;
    }
  }
  if (debug)
  {
   Serial.print("Sent response: ");
        Serial.println(command); // Verificăm ce se trimite efectiv
        Serial.print("ESP8266 Response: ");
        Serial.println(response);
  }
  return response;
}


// Funcție pentru inițializarea modulului WiFi
void InitWifiModule() {
    sendData("AT+RST\r\n", 2000, DEBUG);
    sendData("AT+CWJAP=\"AndroidAP\",\"ohep1109\"\r\n", 2000, DEBUG); // Schimbă cu rețeaua ta
    delay(3000);
    sendData("AT+CWMODE=1\r\n", 1500, DEBUG);
    delay(1500);
    sendData("AT+CIFSR\r\n", 1500, DEBUG);
    delay(1500);
    sendData("AT+CIPMUX=1\r\n", 1500, DEBUG);
    delay(1500);
    sendData("AT+CIPSERVER=1,80\r\n", 1500, DEBUG);
}


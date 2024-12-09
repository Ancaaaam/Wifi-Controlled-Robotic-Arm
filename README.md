# Wifi-Controlled-Robotic-Arm
## Rezumat
Acest proiect implementează un braț robotic cu 4 servomotoare controlat printr-o interfață web intuitivă. Soluția utilizează un microcontroler Arduino UNO și un modul WiFi ESP8266 pentru a permite transmiterea comenzilor și monitorizarea sistemului printr-o rețea WiFi locală. Interfața web oferă utilizatorului posibilitatea de a seta unghiurile de rotație ale servomotoarelor și de a trimite comenzi secvențiale, asigurând astfel un control precis al mișcărilor.

## Caracteristici
Control prin Browser Web: Interfața permite utilizatorului să controleze brațul robotic de la distanță folosind un browser web standard.

Comenzi Secvențiale: Utilizatorul poate crea, edita și executa o secvență de comenzi pentru brațul robotic.

Feedback în Timp Real: Sistemul afișează notificări în interfața web pentru a indica succesul comenzilor sau posibilele erori.

Topologie IoT: Integrarea între Arduino, ESP8266 și dispozitivele client asigură o comunicare rapidă și fiabilă.

### Componentele Sistemului
#### Hardware:
Arduino UNO: Controlează servomotoarele pe baza comenzilor primite.

ESP8266 WiFi Module: Asigură conectivitatea rețelei WiFi.

Braț Robotic cu 4 Servomotoare: Rotire, extensie, înclinare și control al cleștelui.

#### Software:
Cod Arduino pentru controlul mișcărilor și gestionarea comunicării.

Scripturi JavaScript pentru gestionarea interfeței web.

HTML pentru afișarea interfeței utilizator.

## Fluxul de Funcționare
Inițializare: Arduino și ESP8266 se conectează la rețeaua WiFi.

Interacțiune: Utilizatorul setează unghiurile de rotație prin interfața web și trimite comenzi.

Execuție: Comenzile sunt transmise prin ESP8266 către Arduino, care controlează servomotoarele.

Feedback: Sistemul afișează notificări despre starea comenzilor și posibile erori în interfața web.

## Cum Funcționează
### Accesare Interfață Web:
Introduceți adresa IP a modulului ESP8266 în browser.
Utilizați interfața pentru a controla servomotoarele și pentru a crea comenzi secvențiale.
### Notificări:
Când o comandă este executată cu succes, se afișează un mesaj de confirmare.
Dacă apare o eroare, aceasta este indicată în notificări.
### Diagnoză:
Sistemul identifică și afișează valori suspecte (ex. 0,0,0,0) pentru a indica potențiale probleme hardware.


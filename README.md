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
Arduino UNO R3 CH340: Controlează servomotoarele pe baza comenzilor primite.

ESP8266 WiFi Module: Asigură conectivitatea rețelei WiFi.

Braț Robotic cu 4 Servomotoare: Rotire, extensie, înclinare și control al cleștelui.

Placa expansiune
#### Software:
Cod Arduino pentru controlul mișcărilor și gestionarea comunicării.

Scripturi JavaScript pentru gestionarea interfeței web.

HTML pentru afișarea interfeței utilizator.

## Fluxul de Funcționare
Inițializare: Arduino și ESP8266 se conectează la rețeaua WiFi.

Interacțiune: Utilizatorul setează unghiurile de rotație prin interfața web și trimite comenzi.

Execuție: Comenzile sunt transmise prin ESP8266 către Arduino, care controlează servomotoarele. Apoi ESP8266 trimite catre browser raspunsuri de tip http prin care notifica utlizatorul daca comanda a fost executata cu succes sau daca a aparut un reset fortat din cauza hardware-ului.

Feedback: Sistemul afișează notificări despre starea comenzilor și posibile erori în interfața web.

## Cum Funcționează
### Accesare Interfață Web:
Introduceți adresa IP a modulului ESP8266 în browser.
Utilizați interfața pentru modifica pozitia fiecarui servomotor in parte.
Se apasa butonul "Add position to command stack" pentru a adauga comanda in stack-ul de comenzi. Acest buton are in dreapta sa o casuta in care putem preciza timpul pe care trebuie sa il astepte urmatoarea comanda pana a incepe sa fie executata.
Daca vrem sa rulam comenzile din stack, se apasa butonul "Run command stack".
Putem de asemenea sa salvam comenzile din command stack intr-un fisier txt si putem sa incarcam un fisier txt in command stack
### Notificări:
Când o comandă este executată cu succes, se afișează un mesaj de confirmare.
Dacă apare o eroare (nu se trimite comanda catre server si primeste timeout/hardware-ul isi da reset fortat), aceasta este indicată în notificări.
### Diagnoză:
Sistemul identifică și afișează valori suspecte (ex. 0,0,0,0) pentru a indica potențiale probleme hardware.


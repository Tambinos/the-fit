# The Fit

## Setup ##
Alle Schritte werden in der frontend directory ausgeführt.
### DB Setup ###

Die Pocketbase kann mit folgendem Befehl gestartet werden:

```cmd
.\pocketbase_0.28.2_windows_amd64\pocketbase.exe serve
```

Dannach kann man sich bei

```
http://127.0.0.1:8090/_/
```

Einen Superuser Account erstellen.

### Frontend Setup ###

Das Frontend kann mit folgendem Befehl gestartet werden:

```cmd
ng serve
```

Dannach sollte das Frontend unter erreichbar sein.

```
http://localhost:4200/
```
#### Registrierung ####
Wenn man einen neuen Account erstellt ist es wichtig, eine valid E-Mail zu verwenden und das Passwort muss 8 Zeichen lang sein.

---

#### Schritt zähler ####
In dem feature/mobile-stepcounter branch ist der Code für den StepCounter

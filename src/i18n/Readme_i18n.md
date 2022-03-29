# Internationalisierung

Verwendet wird react-i18next, welches auf i18n aufsetzt und für react angepasst wurde.

## Verwendung

Die Konfiguration erfolgt in i18n/i18n.ts.
Dort werden auch die json Dateien eingebunden welche die Key/Values enthalten.

Die Keys dürfen keine von i18n verwendeten Sonderzeichen enthalten (also . und : ). 
Mit : können Namespaces verwendet werden (mehrere Dateien pro Sprache).
Mit . können Unterelemente angesprochen werden:
"sidebar": {
    "label": "App"
}
Kann wie folgt referenziert werden: t("sidebar.label");

## Entwicklung

In der Konfiguration kann der Debug Modus ("debug: true,") aktiviert werden, damit werden fehlende Internationalisierungen in der Konsole im Browser ausgegeben. 

Mit der Konfiguration
```ts
lng: "cimode",
```
werden die Keys anstatt der Internationalisierungen in der GUI ausgegeben. 
Damit lässt sich zB erkennen, welche Labels noch nicht übersetzt sind. 

useEffect()
Texte die im useEffect gesetzt werden, werden bei einer Sprach-Umschaltung nicht aktualisiert.
Wenn das notwendig ist, muss das i18n.language mit in die Dependencies des useEffect aufgenommen werden:
```ts
   React.useEffect(() => {
        setTitle(isAddMode ? t("page.new") : t("page.edit") + id);
        //...
    }
    , [i18n.language]);
```

### Fallback
Keys die in der aktuellen Sprache nicht gefunden werden und auf einen Fallback zurückgreifen, werden NICHT in der Konsole im Debug Modus ausgegeben. Ausgaben scheinen nur zu erfolgen wenn die Keys gar nicht vorhanden sind. 

## react-i18next

Dokumentation:
https://react.i18next.com/

Basiert auf i18next, dokumentation:
https://www.i18next.com/


i18next-http-backend
Kann verwendet werden um Sprachen im Browser nachzuladen, zB je nach Benutzersprache nur die Sprachdaten laden welche benötigt werden.
Zum erkennen der Sprache kann sowas wie "i18next-browser-languagedetector" verwendet werden.

## Mehrere Sprachdateien pro Sprache, Namespaces
Wie diese eingerichtet werden kann hier nachgelesen werden:
https://react.i18next.com/guides/multiple-translation-files

## Suspense (Experimental)
https://reactjs.org/docs/concurrent-mode-suspense.html
react-i18nnext uses Suspense by default. If you don't want to use it, you have to specify that in your configuration
Just be aware that choosing not to use Suspense has its implications. You have to write checks to handle the 'not ready' state ie: have a loading component render when state is not ready and your component render when the state is ready.Not doing so will result in rendering your translations before they loaded.
Wenn man Suspense nicht verwenden will:
https://react.i18next.com/latest/usetranslation-hook#not-using-suspense
Bsp:
https://codesandbox.io/s/react-i18next-without-suspense-hs0hc?file=/src/App.js

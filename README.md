# Infishiba

_Zadanie polega na utworzeniu aplikacji do wyświetlania losowych zdjęć w postaci infinity scrolla (np. 4 kafelki w rzędzie). Aplikacja powinna posiadać mechanizm ulubionych, zdjęcie można dodać oraz usunąć z ulubionych. Powinna być też możliwość wyświetlenia wszystkich swoich ulubionych. Aplikacja również powinna posiadać preloader zdjęć oraz animację._

_Należy:_

-   _Użyć dowolnego frameworka CSS np. Bootsrap_
-   _Użyć jednego z frameworków JS (React lub Vue)_
-   _Użyć API, które daje losowe zdjęcia Shiby w ilości o jakie poprosimy [http://shibe.online/api/shibes?count=16](http://shibe.online/api/shibes?count=16)_

## Słowo od autora

Aplikacja została napisana na bazie React, z wykorzystaniem:

-   Axios do komunikacji z API,
-   Dexie jako wrapper do IndexedDB
-   shortid do generowania unikalnych kluczy ID
-   wykorzystano standardowy routing oraz Redux

**[demo](https://infishiba.mojewronki.pl/)**

### Uwaga odnośnie API zdjęć Shiby

Serwer udostępniający publiczne API nie ustawia nagłówka HTTP `Access-Control-Allow-Origin`, przez co aplikacja może mieć problemy z pobieraniem zdjęć.

Zastosowałem obejście w postaci [proxy](https://cors-anywhere.herokuapp.com/), ale jej dostępność nie jest gwarantowana.

W przypadku problemów warto spróbować równiez z wtyczką do Google Chrome [Allow-Control-Allow-Origin: \*](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)

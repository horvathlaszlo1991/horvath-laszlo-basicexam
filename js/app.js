// ide deklaráljátok a függvényeket.

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  console.log(userDatas);
}
getData('/json/spaceships.json', successAjax);


console.log(userDatas);


/* hát én most ide fogom írni a függvényeket,
mert nekem ez nem világos, hogy hogy lehet kinyerni az adatokat a json fájlból... */

// 1. A kapott adatokat rendezd ár(cost_in_credits) szerint növekvő sorrendbe. (advanced bubble)

function sortByPriceAscending(tomb) {
  var i = tomb.length;
  var cs;
  while (i > 0) {
    cs = 0;
    for (var j = 0; j < i; j++) {
      if (tomb[j].cost_in_credits > tomb[j + 1].cost_in_credits) {
        [tomb[j], tomb[j + 1]] = [tomb[j + 1], tomb[j]];
        cs = j;
      }
    }
    i = cs;
  }
  return tomb;
  // vagy: console.log(tomb)
}

/* 2. Töröld az összes olyan adatot (tehát az objektumot a tömbből), ahol a consumables értéke NULL.
Fontos, hogy ne csak undefined-ra állítsd a tömbelemet!!! */

function deleteNullConsumables(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].consumables === null) {
      tomb.splice(i, 1);
    }
  }
  return tomb;
}


/* 3. Az összes NULL értéket (minden objektum minden tulajdonságánál) módosítsd "unknown"-ra */

function setNullToUnknown(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    var kulcs = Object.keys(tomb[i]);
    for (var k = 0; k < kulcs.length; k++) {
      if (tomb[i][kulcs[k]] === null) {
        tomb[i][kulcs[k]] = 'unknown';

        // 4. Írasd ki így kapott hajók adatait.
        console.log(kulcs[k] + ': ' + tomb[i][kulcs[k]]);
      }
    }
  }
}


/* 5. Készítened kell egy statisztikát, mely kiírja a következő statisztikai adatokat:

* Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
* A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
* Az összes hajó utasainak (passengers) összesített száma
* A leghosszabb(lengthiness) hajó képének a neve

*/

function getOneCrewShips(tomb) {
  var count = 0;
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].crew === 1) {
      count++;
    }
  }
  console.log(count);
}

function getLargestCargo(tomb) {
  var largest = tomb[0];
  for (var i = 1; i < tomb.length - 1; i++) {
    if (tomb[i].cargo_capacity > largest.cargo_capacity) {
      largest = tomb[i];
    }
  }
  console.log(largest.model);
}

function getAllPassengers(tomb) {
  var count = 0;
  for (var i = 0; i < tomb.length; i++) {
    count += tomb[i].passengers;
  }
  console.log(count);
}

function getImageofLongestShip(tomb) {
  var longest = tomb[0];
  for (var i = 1; i < tomb.length; i++) {
    if (tomb[i].lengthiness > longest.lengthiness) {
      longest = tomb[i];
    }
  } console.log(longest.image);
}


/* 6. Legyen lehetőség a hajókra rákeresni _model_ szerint. (logaritmikus/binary sort)

* A keresett nevet paraméterként kapja a függvényed.
* A keresés nem case sensitive
* Nem csak teljes egyezést vizsgálunk, tehát ha a keresett szöveg szerepel a hajó nevében már az is találat
* Ha több találatunk is lenne, azt a hajót adjuk vissza, amelyiknek a neve ABC sorrendben a legelső lenne.
* Írasd ki a hajó adatait.
*/


// ezt még be kell fejezni meg átnézni

var search = document.getElementById('search-text').toLowerCase();


function sortByModelNameAscending(tomb) {
  var i = tomb.length - 1;
  var swap;
  while (i > 0) {
    swap = 0;
    for (var j = 0; j < i; j++) {
      if (tomb[j].name.localeCompare(tomb[j + 1].name) === 1) {
        [tomb[j], tomb[j + 1]] = [tomb [j + 1], tomb[j]];
        swap = j;
      }
    }
    i = swap;
  }
  return tomb;
}

function searchByModel(search) {
  var search = document.getElementById('search-text').toLowerCase();
  var tomb = sortByModelNameAscending(tomb);
  for (var i = 0; i < tomb.length; i++) {
    var name = tomb[i].model.toLowerCase();
    if (name.indexOf(search) > -1) {
      return tomb[i];
    }
  }
  return 'Not found';
}


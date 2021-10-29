if(window.indexedDB){
  var db;
  var request = indexedDB.open("MyTestDatabase");
  request.onerror = function(event) {
    alert("Why didn't you allow my web app to use IndexedDB?!");
  };
  request.onsuccess = function(event) {
    db = event.target.result;
  };
}

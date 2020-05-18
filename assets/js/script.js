window.addEventListener('DOMContentLoaded', (event) => {

  var editor = document.getElementById('editor').contentWindow.document.body;

  function loadData() {
    var xhrLoad = new XMLHttpRequest();
    xhrLoad.onreadystatechange = function() {
      if (xhrLoad.readyState == XMLHttpRequest.DONE) {
        editor.innerHTML = xhrLoad.responseText; //see if you can must make this work with same origin
        editor.contentEditable = 'true';
      }
    }
    xhrLoad.open('GET', 'test.html', true);
    xhrLoad.send(null);
  }

  loadData();

  // document.getElementById('save').addEventListener('click', saveData);

  function saveData() {
    var data = new FormData(); //better way?
    data.append('data', editor.innerHTML);
    var xhrSave = new XMLHttpRequest();
    xhrSave.open( 'post', 'writer.php', true);
    xhrSave.send(data);
  }

  editor.addEventListener('keydown', function(e) {
    if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
      e.preventDefault();
      saveData();
      setTimeout(function(){loadData();}, 500);

    }
  }, false);


});

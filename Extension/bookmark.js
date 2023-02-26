

function collectLinks( bookmark , bag )
{ 
  if( bookmark.children)
  { 
    for(var i = 0; i < bookmark.children.length ; i++ ) 
      collectLinks( bookmark.children[i] , bag ) 
  } 
  if(bookmark.url)bag.push(bookmark) 
}

function loadData(){
    list = []
    chrome.bookmarks.getTree().then(data=>{
        collectLinks(data[0], list);
        console.log(list);
        fetch('http://localhost:3000/sendEmail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(list)
        })
        .then(response => response.json())
        .then(response => {
            console.log(JSON.stringify(response));
            showSnackbar();
            // document.getElementById("response").innerText = "Mail sent";
        })
            }).catch(err => console.log('error: ', err));
}

function showSnackbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("loadData").addEventListener("click", loadData);
});
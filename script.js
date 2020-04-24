var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var articleArray = [];
var channelName;

function processRSS(data){
    var items = data.querySelectorAll('item');
    channelName = data.querySelector('channel > title').innerHTML;
    console.log('nazov channelu - ', channelName);
    console.log('Items - ', items);
    items.forEach(item => {
        var image;
        if(item.querySelector('enclosure'))
          image = item.querySelector('enclosure').getAttribute('url');
        else if (item.querySelector('image'))
          image = item.querySelector('image').querySelector('url').innerHTML;
        else
          image = "";
          

        articleArray.push({
          title: item.querySelector('title').innerHTML,
          description: item.querySelector('description').innerHTML,
          pubDate: new Date(item.querySelector('pubDate').innerHTML),
          link: item.querySelector('link').innerHTML,
          image: image
        });      
        
    });

    renderArticles();

    console.log(articleArray);  
}

$( "#sort-select" ).change(function() {
    var selectedElement = document.getElementById("sort-select");
    var selectedValue = selectedElement.options[selectedElement.selectedIndex].text;

    if(selectedValue == "PubDate - Ascending"){
      console.log("sortujem asc");
      articleArray = articleArray.sort((a, b) => a.pubDate - b.pubDate);
      
    }
    else
    {
      console.log("sortujem desc");
      articleArray = articleArray.sort((a, b) => b.pubDate - a.pubDate);
    }
    console.log(articleArray);
    renderArticles();
  });

  function renderArticles() {

    document.getElementById('articles').innerHTML= "";
    var htmlString = ``;
    $("#channel").text(channelName);
    articleArray.forEach(article => {
      htmlString +=`       
        <div class="card mb-4">
          <img class="card-img-top" src="${article.image}" alt="">
        <div class="card-body">
          <h2 class="card-title"> ${article.title}</h2>
          <p class="card-text">  ${article.description}</p>
          <a href="${article.link}" class="btn btn-primary">Read More &rarr;</a>
        </div>
        <div class="card-footer text-muted">
        ${article.pubDate}
        </div>
      </div>`;
    });

    document.getElementById("articles").insertAdjacentHTML("beforeend", htmlString);
  }

  $( "#getURL" ).click(function() {

    articleArray = [];
    var valueUrl = $('#url').val();

    raw = JSON.stringify({"url":valueUrl});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://webp.itprof.sk:8000/fetchurl", requestOptions)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        processRSS(data);
    })
    .catch(error => console.log('error', error)); 
  });

  
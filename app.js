var apiSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.trello.com/1/cards/59166dc10cf965066a06bae8",
    "type": "GET"
};

function getCard() {
  $.ajax(apiSettings).done(function(response) {
    var name = "";
    var desc = "";
    var label = "";

    name = response.name;
    desc = response.desc;
    label = response.labels[0].color;

    console.log("Name: " + name);
    console.log("Description: " + desc);
    console.log("Color: " + label);
  })
}

getCard();

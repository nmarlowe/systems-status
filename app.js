// var apiSettings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://api.trello.com/1/cards/59166dc10cf965066a06bae8",
//     "type": "GET"
// };

var apiSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.trello.com/1/lists/59166dbbb5adda80877f2257/cards",
    "type": "GET"
};

function getCard() {
  $.ajax(apiSettings).done(function(response) {
    var name = "";
    var desc = "";
    var label = "";

    //TODO: Loop through each response array item
    name = response[1].name;
    desc = response[1].desc;
    label = response[1].labels[0].color;

    console.log(response.length);
    console.log("Name: " + name);
    console.log("Description: " + desc);
    console.log("Color: " + label);
  })
}

getCard();

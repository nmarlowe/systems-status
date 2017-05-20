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

// function getCard() {
//   $.ajax(apiSettings).done(function(response) {
//     var name = "";
//     var desc = "";
//     var label = "";
//
//     //TODO: Loop through each response array item
//     name = response[1].name;
//     desc = response[1].desc;
//     label = response[1].labels[0].color;
//
//     console.log(response.length);
//     console.log("Name: " + name);
//     console.log("Description: " + desc);
//     console.log("Color: " + label);
//   })
// };

// var dataSet = [
//   ["OMS", "Description: Room and Board issue is causing random inmates to be removed from exclusion. Ticket# 12345", "yellow"],
//   ["Imaging", "", "green"]
// ];

function getCard() {
  Trello.get("boards/59166d6e65974e2250d8c1c3/cards", function(cards) {
    var data = [];
    var name = [];
    var desc = [];
    var label = [];

    for (let i = 0; i < cards.length; i++) {
      name[i] = cards[i].name;
      desc[i] = cards[i].desc;
      label[i] = cards[i].labels[0].color;
      data[i] = [name[i], desc[i], label[i]];
      // data.push(name[i]);
      // data.push(desc[i]);
      console.log(data);
      // console.log("Name: " + name[i]);
      // console.log("Description: " + desc[i]);
      // console.log("Color: " + label[i]);

    }
    //console.log(data);
    // for (let i = 0; i < cards.length; i++) {
    //   for (let j = 0; j < cards[i].length; j++) {
    //     data[i][j] = cards[i].name;
    //   }
    //   console.log(data)
    // }

    // name = cards[1].name;
    // desc = cards[1].desc;
    // label = cards[1].labels[0].color;
    //
    // console.log(cards.length);
    // console.log("Name: " + name);
    // console.log("Description: " + desc);
    // console.log("Color: " + label);

    $(document).ready(function() {
        $('#example').DataTable( {
          paging: false,
          ordering: false,
          info: false,
          searching: false,
          data: data,
          columns: [
              { title: "Name" },
              { title: "Description" },
              { title: "Status" }
          ]
        } );
    } );
  });
};



getCard();

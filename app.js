const translateGreen = "#e7ffe7";
const translateReg = "#ffc0cb";
const translateYelllow = "#ffffbf";
const translateBlue = "#add8e6";

var boardID, boardEndpoint, cardsEndpoint, labelsEndpoint, greenLabel, yellowLabel, redLabel, blueLabel;
// var labelCombo = [];
// var labelName = [];
// var labelColor = [];

function loadConfigFile() {
  $.getJSON("config.json", function(config) {

    //sets API endpoints for board, cards, and labels from Trello board URL
    boardID = config.boardURL.substring(config.boardURL.lastIndexOf("/") + 1);
    boardEndpoint = "boards/" + boardID;
    cardsEndpoint = boardEndpoint + "/cards";
    labelsEndpoint = boardEndpoint + "/labels";
    greenLabel = config.green;
    yellowLabel = config.yellow;
    redLabel = config.red;
    blueLabel = config.blue;

    getBoard();
  });
}
//get board name and active labels
function getBoard() {
  Trello.get(boardEndpoint, function(board) {
    var boardName = board.name + " Dashboard";
    document.getElementById('board-name').innerHTML = boardName;
  });

  // Trello.get(labelsEndpoint, function(labels) {
  //
  //   for (let i = 0; i < labels.length; i++) {
  //     labelName[i] = labels[i].name;
  //     labelColor[i] = labels[i].color;
  //     //TODO: If color === green then color = translateGreen
  //     labelCombo[i] = [labelName[i], labelColor[i]];
  //   }
  // });

  getCard();
}

function getCard() {

  //label variables
  var down = "Down";
  var nonCritical = "Non-Critical";
  var testing = "Testing";

  //Get all cards for the Trello board.
  Trello.get(cardsEndpoint, function(cards) {
    var data = [];
    var name = [];
    var desc = [];
    var label = [];
    var cardLink = [];
    var checkItems = [];
    var labelColor = [];

    //Pull the name, description, and label fields from each card and save in data array.
    for (let i = 0; i < cards.length; i++) {
      name[i] = cards[i].name;
      checkItems[i] = cards[i].badges.checkItems;
      if (checkItems[i] > 0) {
        desc[i] = "Multiple Issues, Click See More";
      } else {
        desc[i] = cards[i].desc;
      };
      label[i] = cards[i].labels[0].name;
      cardLink[i] = cards[i].url;
      data[i] = [name[i], label[i], desc[i], cardLink[i]];
    }

    //Build DataTable on page load from the data array
    $(document).ready(function() {
        $('#example').DataTable( {
          paging: false,
          ordering: true,
          //order by status then name
          orderFixed: [[1, "asc"], [0, "asc"]],
          info: false,
          searching: false,
          data: data,
          columns: [
              { title: "Name" },
              { title: "Status" },
              { title: "Description of Current Status" },
              { title: "More Information", data: function(data, type, row, meta){
                return '<a href=' + data[3] + '>' + 'See More' + '</a>';
              }}
          ]
          //color the status cell based on status text
          ,"columnDefs": [ {
              "targets": 1,
              "createdCell": function(td, cellData, rowData, row, col) {
                if ( cellData === down ) {
                  $(td).css('background-color', redLabel)
                } else if (cellData === nonCritical){
                  $(td).css('background-color', yellowLabel)
                } else if (cellData === testing){
                  $(td).css('background-color', blueLabel)
                } else {
                  $(td).css('background-color', greenLabel)
                }
              }
            }]
        });
    });
  });
};

loadConfigFile();

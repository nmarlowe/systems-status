
//sets API endpoints for board, cards, and labels from Trello board URL
//const boardURL = "https://trello.com/b/lEGovC5r"
//const boardURL;
//const config = (require(Config));
var configData = "";
function loadConfigFile() {
  $.getJSON("config.json", function(config) {
      var boardID = config.boardID;
      var boardEndpoint = config.boardEndpoint;
      var cardsEndpoint = config.cardsEndpoint;
      var labelsEndpoint = config.labelsEndpoint;
      var greenLabel = config.green;
      var yellowLabel = config.yellow;
      var redLabel = config.red;
      var blueLabel = config.blue;

      init();
  })
}

function init() {
  console.log("Config " + configData);
}

loadConfigFile();


//const boardURL = Config.boardURL;
const boardID = boardURL.substring(boardURL.lastIndexOf("/") + 1);
const boardEndpoint = "boards/" + boardID;
const cardsEndpoint = boardEndpoint + "/cards";
const labelsEndpoint = boardEndpoint + "/labels";

//get board name and active labels
function getBoard() {
  Trello.get(boardEndpoint, function(board) {
    var boardName = board.name + " Dashboard";
    document.getElementById('board-name').innerHTML = boardName;
  });

  Trello.get(labelsEndpoint, function(labels) {
    var labelCombo = [];
    var labelName = [];
    var labelColor = [];

    for (let i = 0; i < labels.length; i++) {
      labelName[i] = labels[i].name;
      labelColor[i] = labels[i].color;
      labelCombo[i] = [labelName[i], labelColor[i]];
    }
  });

  getCard();
}

function getCard() {

  //label constants
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
          //colors the status cell based on status text
          ,"columnDefs": [ {
              "targets": 1,
              "createdCell": function (td, cellData, rowData, row, col) {
                if ( cellData === down ) {
                  $(td).css('background-color', '#ffc0cb')
                } else if (cellData === nonCritical){
                  $(td).css('background-color', '#ffffbf')
                } else if (cellData === testing){
                  $(td).css('background-color', '#add8e6')
                } else {
                  $(td).css('background-color', '#e7ffe7')
                }
              }
            }]
        });
    });
  });
};

getBoard();

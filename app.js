//IDEA: Use checklists to show multiple open issues. See OMS card.

function getCard() {
  //set the boardID (Option 1) by getting the ID from an api call to retrieve Board ID and add between boards/ and /cards
  //const boardID = "boards/59166d6e65974e2250d8c1c3/cards"

  //set the boardID (Option 2) by taking the link to the board in Trello board settings, use the last part of the link, and add between boards/ and /cards.
  const boardID = "boards/lEGovC5r/cards";

  //Get all cards for the Trello board.
  Trello.get(boardID, function(cards) {
    var data = [];
    var name = [];
    var desc = [];
    var label = [];
    var cardLink = [];

    //Pull the name, description, and label fields from each card and save in data array.
    for (let i = 0; i < cards.length; i++) {
      name[i] = cards[i].name;
      desc[i] = cards[i].desc;
      label[i] = cards[i].labels[0].name;
      cardLink[i] = cards[i].url;
      data[i] = [name[i], label[i], desc[i], cardLink[i]];
      //console.log(data);
    }
    //console.log(data);

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
                if ( cellData === "Down" ) {
                  $(td).css('background-color', 'pink')
                } else if (cellData === "Non-Critical"){
                  $(td).css('background-color', '#ffffbf')
                } else if (cellData === "Testing"){
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

getCard();

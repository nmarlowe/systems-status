//IDEA: Add links on each row to the Trello card using the returned ShortURL field
//IDEA: Use checklists to show multiple open issues. See OMS card.
//TODO: Rename repo to something without Trello in it (TrellStats, System Status)

function getCard() {
  //Get all cards for the Trello board.
  Trello.get("boards/59166d6e65974e2250d8c1c3/cards", function(cards) {
    var data = [];
    var name = [];
    var desc = [];
    var label = [];

    //Pull the name, description, and label fields from each card and save in data array.
    for (let i = 0; i < cards.length; i++) {
      name[i] = cards[i].name;
      desc[i] = cards[i].desc;
      label[i] = cards[i].labels[0].name;
      data[i] = [name[i], desc[i], label[i]];
      //console.log(data);
    }
    //console.log(data);

    //Build DataTable on page load from the data array
    $(document).ready(function() {
        $('#example').DataTable( {
          paging: false,
          ordering: true,
          //order by status then name
          orderFixed: [[2, "asc"], [0, "asc"]],
          info: false,
          searching: false,
          data: data,
          columns: [
              { title: "Name" },
              { title: "Description of Current Status" },
              { title: "Status" }
          ]
          //colors the status cell based on status text
          ,"columnDefs": [ {
              "targets": 2,
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

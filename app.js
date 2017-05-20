function getCard() {
  Trello.get("boards/59166d6e65974e2250d8c1c3/cards", function(cards) {
    var data = [];
    var name = [];
    var desc = [];
    var label = [];

    for (let i = 0; i < cards.length; i++) {
      name[i] = cards[i].name;
      desc[i] = cards[i].desc;
      label[i] = cards[i].labels[0].name;
      data[i] = [name[i], desc[i], label[i]];
      //console.log(data);
    }
    console.log(data);
    $(document).ready(function() {
        $('#example').DataTable( {
          paging: false,
          ordering: true,
          orderFixed: [[2, "asc"], [0, "asc"]],
          info: false,
          searching: false,
          data: data,
          columns: [
              { title: "Name" },
              { title: "Description" },
              { title: "Status" }
          ]
          ,"columnDefs": [ {
              "targets": 2,
              "createdCell": function (td, cellData, rowData, row, col) {
                if ( cellData === "Down" ) {
                  $(td).css('background-color', 'pink')
                } else if (cellData === "Non-Critical"){
                  $(td).css('background-color', '#ffffbf')
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

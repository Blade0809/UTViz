document.getElementById("searchBtn").addEventListener("click", function() {

     var input = document.getElementById('searchInput');
            var filter = input.value.toUpperCase();
            var table = document.getElementById('tableContainer');
            var rows = table.getElementsByTagName('tr');

            for (var i = 1; i < rows.length; i++) {
                var cells = rows[i].getElementsByTagName('td');
                var found = false;

                for (var j = 0; j < cells.length; j++) {
                    var cell = cells[j];

                    if (cell) {
                        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
                            found = true;
                            break;
                        }
                    }
                }

                if (found) {
                    rows[i].style.display = '';
                } else {
                    rows[i].style.display = 'none';
                }}

});

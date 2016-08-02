var categories = [];
var len = categories.length;
var task_nr = 0;


function init_categories() {
    categories = [];
    len = categories.length;

}


function refresh() {
    location.reload();
}


function writeStatus(message, state) {
    switch (state) {
        case "error":
            document.getElementById("status").innerHTML = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                " " + message;
            document.getElementById("status").className = "alert alert-danger";
            break;
        case "success":
            document.getElementById("status").innerHTML = '<span class="glyphicon glyphicon glyphicon-ok" aria-hidden="true"></span>' +
                " " + message;
            document.getElementById("status").className = "alert alert-success";
            break;
        case "info":
            document.getElementById("status").innerHTML = '<span class="glyphicon glyphicon glyphicon-flag" aria-hidden="true"></span>' +
                " " + message;
            document.getElementById("status").className = "alert alert-info";
            break;

    }
}

function addTask() {
    var elem = document.getElementById("input").value;
    document.getElementById("input").value = "";


    if (!elem) {
        writeStatus("Specificaţi taskul în casetă şi apăsaţi butonul 'Adaugă task'", "error");
    } else {
        writeStatus("Taskul " + '"' + elem + '"' + " adaugat", "success");

        document.getElementById('task_list').innerHTML += '<a href="#" class="list-group-item list-item"' +
            'id="task' + task_nr + '" onclick="delete_task(this)" value="' + elem + '">' + elem +
            '  <span class="glyphicon glyphicon-remove " aria-hidden="true" ></span></a>';
        task_nr++;

    };

    document.getElementById("generate_button").textContent = "Generează tabel";
}


function delete_task(elem) {
    elem.parentNode.removeChild(elem);
    writeStatus("Taskul " + elem.textContent + "a fost şters", "info");

    document.getElementById("generate_button").textContent = "Generează tabel";

}



function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function createCategories() {
    init_categories();
    for (i = 0; i < task_nr; i++) {
        elem = document.getElementById("task" + i);
        if (elem) {
            var value = document.getElementById(elem.id).textContent;
            categories.push(value);
        }

    }
    len = categories.length;
    shuffle(categories);
}

function myFunction() {
    createCategories();
    if (len == 0)
        writeStatus("Specificaţi în casetă taskurile şi apăsaţi butonul 'Adaugă task'", "error");
    else {
        var table = document.getElementById("myTable");
        table.innerHTML = "";

        var k = 0;


        var cells_array = [45];
        for (var i = 0; i < len; i++) {
            var row = table.insertRow(i);
            for (var j = 0; j < 7; j++) {
                var cell = row.insertCell(j);
                cell.innerHTML = categories[j];
                cells_array[k] = cell;
                k++;
            };
        };

     
        var days = ["Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sîmbătă", "Duminică"]
        var durata = ["10min", "15min", "20min", "30min", "1h", "30min", "20min", "10min", "20min", "30min", "25min"]
        var row = table.insertRow(0);
        for (var j = 0; j < 7; j++) {
            var cell = row.insertCell(j);
            cell.innerHTML = days[j];
            cell.className = "header";
            cell.id = "ziua" + j;
        };

        var row = table.insertRow(0);


        for (var i = 0; i < k; i++) {
            cells_array[i].innerHTML = "D" + i;
        };

        for (var i = 0; i < 7; i++) {
            var h = 0;
            var n = 0;
            while (h < k - 6) {
                cells_array[i + h].innerHTML = categories[n] + "<br>" + durata[Math.floor((Math.random() * 10))];
                n++;
                h += 7;

            };
            shuffle(categories);
        };



        writeStatus("Tabel generat cu succes", "success");
        document.getElementById("generate_button").textContent = "Schimbă ordinea taskurilor";
    }

}

function getDate() {
    var month = ["ianuarie", "februarie", "martie", 'aprilie', "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];
    var d = new Date();
    var n = d.getDate();
    var m = d.getMonth();
    var year = d.getFullYear();
    var day = getDay();
    var diff_monday = day - 0;
    if (n > diff_monday)
        n = n - diff_monday;
    else


    if (n < 10)
        n = "0" + n;
    var date = n + " " + month[m] + " " + year;
    document.getElementById("demo").innerHTML = date;
}

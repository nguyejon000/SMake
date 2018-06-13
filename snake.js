function Board(containerId, rowsCount, colsCount) {
    this.containerId = containerId;
    this.rowsCount = rowsCount;
    this.colsCount = colsCount;
 
    this.render = function () {
        var html = "<div class='snake-board'><table>";
        for (var i = 0; i < this.rowsCount; i++) {
            html += "<tr id='row-" + i + "' class='row'>";
            for (var j = 0; j < this.colsCount; j++) {
                html += "<td id='" + cellId(i, j) + "' class='col'></td>";
            }
            html += "</tr>"
        }
        html += "</table></div>";
        document.getElementById(containerId).innerHTML = html;
    };
}
 
function cellId(row, col) {
    return "snake-board-" + row + "-" + col;
}
.snake-board table {
    border-collapse: collapse;
}
 
.snake-board td {
    width: 20px;
    height: 20px;
    border: 0;
}
 
.snake-board .col {
    background-color: yellow;
}
function Snake(board, speed, head) {
    this.head = head;
    this.tail = head;
    this.cells = [head];
    this.board = board;
 
    var $snake = this;
    this.start = function () {
        addClass(document.getElementById(cellId(head.row, head.col)), "snake");
        addFruitToBoard(board, this);
    }
}
 
function addFruitToBoard(board, snake) {
    do {
        var row = Math.floor(Math.random() * board.rowsCount);
        var col = Math.floor(Math.random() * board.colsCount);
    } while (snake.containsCell(row, col));
    addClass(document.getElementById(cellId(row, col)), "fruit");
}
 
function addClass(element, className) {
    element.classList.add(className);
}
.snake-board .snake {
    background-color: blue;
}
 
.snake-board .fruit {
    background-color: red;
}

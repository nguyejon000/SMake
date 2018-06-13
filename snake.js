function Snake(board, speed, head) {
    this.head = head;
    this.tail = head;
    this.cells = [head];
    this.board = board;
 
    var $snake = this;
    this.start = function () {
        addClass(document.getElementById(cellId(head.row, head.col)), "snake");
 
        addFruitToBoard(board, this);
        addKeyboardListener(this);
 
        var intervalId = setInterval(function () {
            var newCells = [];
 
            var headMovingResult = moveHead();
            if (!headMovingResult) {
                clearInterval(intervalId);
                $snake.board.setScoreValue($snake.cells.length);
                $snake.board.showResults();
                return;
            }
            newCells.push(headMovingResult.newHead);
 
            if ($snake.cells.length > 1) {
                newCells.push.apply(newCells, moveCellsAfterHead($snake));
            }
 
            $snake.head = newCells[0];
            $snake.tail = newCells[newCells.length - 1];
            $snake.cells = newCells;
            if (headMovingResult.fruit) {
                $snake.grow();
                addFruitToBoard($snake.board, $snake);
            }
        }, speed);
 
        function moveHead() {
            var newHead = $snake.head.next();
            var nextHeadElement = document.getElementById(cellId(newHead.row, newHead.col));
            if (!nextHeadElement || nextHeadElement.classList.contains("snake")) {
                return null;
            }
 
            var fruit = nextHeadElement.classList.contains("fruit");
            if (fruit) {
                removeClass(nextHeadElement, "fruit");
            }
 
            removeClass(document.getElementById(cellId($snake.head.row, $snake.head.col)), "snake");
            addClass(nextHeadElement, "snake");
            return {newHead: newHead, fruit: fruit};
        }
 
        function moveCellsAfterHead($snake) {
            var newCells = [];
            for (var i = 1; i < $snake.cells.length; i++) {
                var currentCell = $snake.cells[i];
                removeClass(document.getElementById(cellId(currentCell.row, currentCell.col)), "snake");
 
                var nextCell = $snake.cells[i - 1];
                addClass(document.getElementById(cellId(nextCell.row, nextCell.col)), "snake");
 
                newCells.push(nextCell);
            }
            return newCells;
        }
    };
 
    this.setHeadDirection = function (keywordDirection) {
        this.head.direction = keywordDirection;
        this.cells[0].direction = keywordDirection;
    };
 
    this.grow = function () {
        var newTail = this.tail.prev();
        this.cells.push(newTail);
        this.tail = newTail;
    };
 
    this.containsCell = function (row, col) {
        for (var i = 0; i < this.cells.length; i++) {
            var cell = this.cells[i];
            if (cell.row === row && cell.col === col) {
                return true;
            }
        }
        return false;
    };
}

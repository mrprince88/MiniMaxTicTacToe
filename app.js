{
    const cell = document.querySelectorAll('.cell');
    const result = document.querySelector('.result');
    const resultText = document.querySelector('.text');
    const button = document.querySelector('.RestartButton');
    let chosen = [];
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    function startGame() {
        chosen = [];
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        cell.forEach(i => {
            i.textContent = '';
            i.classList.remove('zero');
        });
        playGame();
    }
    startGame();

    button.addEventListener('click', () => {
        startGame();
        result.classList.remove('show');
    })

    function check(a, b, c, d) {
        return (a == b) && (b == c) && a == d;
    }

    function checkWinner(a) {

        for (i = 0; i < 3; i++) {
            if (check(board[i][0], board[i][1], board[i][2], a))
                return true;
        }

        for (i = 0; i < 3; i++) {
            if (check(board[0][i], board[1][i], board[2][i], a))
                return true;
        }

        if (check(board[0][0], board[1][1], board[2][2], a))
            return true;

        if (check(board[0][2], board[1][1], board[2][0], a))
            return true;

        return false;
    }

    function playGame() {
        for (let i = 0; i < 9; i++) {
            cell[i].addEventListener('click', () => handleClick(i), {
                once: true
            });
        }
    }

    function handleClick(i) {

        if (chosen.includes(i))
            return;

        cell[i].append('X');
        board[Math.floor(i / 3)][i % 3] = 'X';

        chosen.push(i);

        if (checkWinner('X')) {
            result.classList.add('show');
            resultText.textContent = 'Player 1 Won';
            return;
        }

        if (chosen.length == 9) {
            result.classList.add('show');
            resultText.textContent = 'Tie';
            return;
        }

        bestMove();
    }

    function bestMove() {

        let bestScore = -Infinity;
        let move;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if (board[i][j] == '') {

                    board[i][j] = '0';
                    let score = miniMax(board, false, -1000, 1000);
                    board[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        move = i * 3 + j;
                    }

                }
            }
        }

        board[Math.floor(move / 3)][move % 3] = '0';
        cell[move].append('0');
        cell[move].classList.add('zero');
        chosen.push(move);
        if (checkWinner('0')) {
            result.classList.add('show');
            resultText.textContent = 'Player 2 Won';
        }
    }


    function miniMax(board, isMaximizing, alpha, beta) {
        if (checkWinner('X'))
            return -1;

        if (checkWinner('0'))
            return 1;

        let a = 0;

        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (board[i][j] == '')
                    a++;

        if (a == 0)
            return 0;


        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] == '') {
                        board[i][j] = '0';
                        let score = miniMax(board, false, alpha, beta);
                        board[i][j] = '';
                        bestScore = Math.max(score, bestScore);
                        alpha = Math.max(alpha, score);
                        if (alpha >= beta)
                            break;
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] == '') {
                        board[i][j] = 'X';
                        let score = miniMax(board, true, alpha, beta);
                        board[i][j] = '';
                        // console.log(score)
                        bestScore = Math.min(score, bestScore);
                        beta = Math.min(beta, score);
                        if (alpha >= beta)
                            break;
                    }
                }
            }
            return bestScore;
        }
    }

}
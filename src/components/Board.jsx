import { Square } from './Square';

import { useEffect, useState } from "react"

const b = [
    1,2,3
];

const c = b;
c[0] = 3;

// b[1] = 2;

// const a = [
//     b,
//     4,
//     2,
//     3,
//     4,
//     5
// ];

// // const index = 3;
// // a[index] = 4;

// a[0][1]


// function checkEqual(arr) {
//     return arr[0] === arr[1] && arr[1] === arr[2];
// };
const checkEqual = function (arr) {
    const isEqual = arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== null;
    return isEqual ? arr[0] : false;
};
const isGameEnd = (board) => {
    const result = checkEqual(board[0]) ||
    checkEqual(board[1]) ||
    checkEqual(board[2]) || // true/false  // проверили горизонтали
    checkEqual([
        board[0][0],
        board[1][0],
        board[2][0]
    ]) || // проверили вертикали
    checkEqual([
        board[0][1],
        board[1][1],
        board[2][1]
    ]) || // проверили вертикали
    checkEqual([
        board[0][2],
        board[1][2],
        board[2][2]
    ]) || // проверили вертикали
    checkEqual([
        board[0][0],
        board[1][1],
        board[2][2]
    ]) || // проверили диагонали
    checkEqual([
        board[0][2],
        board[1][1],
        board[2][0]
    ]); // проверили диагонали

    return result;
}

// '' - false
// 'x' - true

export function Board () {
    const [isXTurn, changeTurn] = useState(true);
    const [winner, setWinner] = useState(false);
    const [board, changeBoard] = useState([
    //    0     1     2
        [null, null, null], // 0
        [null, null, null], // 1
        [null, null, null] // 2
    ]);

    const createBoardClick = (line, column) => () => {

        changeBoard(prevBoard => {
            const prev = JSON.parse(JSON.stringify(prevBoard));
            if (isGameEnd(prev)) {
                return prev;
            }

            if (prev[line][column] !== null) {
                return prev;
            }

            prev[line][column] = isXTurn ? 'x' : 'o';
            return prev;
        });
    }

    useEffect(() => {
        console.log('Use effect');
        const hasWinner = isGameEnd(board);
        if (hasWinner) {
            setWinner(hasWinner);
        }
        changeTurn(prev => !prev);
    }, [board]);

    return <div>
        {
            winner && (
                <p>Winner: {winner}</p>
            )
        }
        {
            board.map((line, index) => (
                <div key={`line=${index}`} style={{ display: 'flex' }}>
                    {
                        line.map(
                            (value, colIndex) => (
                                <Square key={`${index}-${colIndex}`} value={value} onClick={createBoardClick(index, colIndex)}/>
                            )
                        )
                    }
                </div>
            ))
        }
    </div>
}

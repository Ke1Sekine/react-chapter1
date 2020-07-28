// import react from "react";

/**
 * 勝利しているか判定.
 * 勝利の際は勝利者を返却
 * @param {array} squares スコア表 
 */
export const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [one, two, three] = lines[i];
        if (
                squares[one] 
                && squares[one] === squares[two] 
                && squares[one] === squares[three]
        ) {
            return squares[one];
        }
    }
    return null;
}
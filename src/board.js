import React from 'react';
import Square from "./square";
import { calculateWinner } from "./calculate_winner";

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }
    /**
     * 印を取得
     */
    getMark() {
        return this.state.xIsNext ? '×' : '○'
    }

    /**
     * クリックされた際のイベントハンドラー
     * @param {number} i インデックス
     */
    handleClick(i) {
        const squares = this.state.squares.slice();
        //勝敗決定済みか入力済みの場合は処理しない
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.getMark();
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    /**
     * 四角の描写関数
     * @param {*} i インデックス
     */
    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)} />
        );
    }

    /**
     * ステータスを取得.
     * 勝者有無より文言が変更される。
     * @param {string | null} winner 
     */
    getStatus(winner) {
        if (winner) {
            return "Winner is " + winner;
        }
        return "Next player is " + (this.getMark());
    }


    render() {
        const winner = calculateWinner(this.state.squares);
        return (
            <div>
                <div className="status">{ this.getStatus(winner) }</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

import React from "react";
import Board from "./board";
import { calculateWinner } from "./calculate_winner";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history :[{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }
    /**
     * 印を取得
     */
    getMark() {
        return this.state.xIsNext ? '×' : '○'
    }

    /**
     * ステータスを取得.
     * 勝者有無より文言が変更される。
     * @param {string | null} winner 
     */
    getStatus(winner) {
        if (winner) {
            return "勝者：" + winner;
        }
        return "次のプライヤーは" + (this.getMark());
    }

    renderMove() {
        return this.state.history.map((value, index) => {
            const text = index ? 
            '手順を戻す #' + index :
            'ゲームを開始';
            return (
                <li key={index}>
                    <button onClick={() => this.jumpTo(index)}>{text}</button>
                </li>
            );
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber : step,
            xIsNext : (step % 2) === 0,
        });
    }

    /**
     * クリックされた際のイベントハンドラー
     * @param {number} i インデックス
     */
    handleClick(i) {
        //現在の履歴より1つ多めに生成する
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        //勝敗決定済みか入力済みの場合は処理しない
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.getMark();
        this.setState({
            history : history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        console.log(this.state.stepNumber);
        const current = history[this.state.stepNumber];
        let status = this.getStatus(calculateWinner(current.squares));
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={ current.squares } onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <div>{ this.renderMove()}</div>
                </div>
            </div>
        );
    }
}
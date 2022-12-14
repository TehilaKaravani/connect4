import './App.css';
import React from "react";

class App extends React.Component {

    state = {
        board: [],
        emptyCells: [],
        counterTurns: 0,
        isGameOver: false,
        rowsNumber: 6,
        columnNumber: 7,
    }

    createNewBoard = () => {
        const rows = [];
        for (let i = 0; i < this.state.rowsNumber; i++) {
            const columns = []
            for (let j = 0; j < this.state.columnNumber; j++) {
                columns.push("empty")
            }
            rows.push(columns)
        }
        const newEmptyCells = [];
        for (let i = 0; i < this.state.columnNumber; i++) {
            newEmptyCells.push(this.state.rowsNumber - 1)
        }
        this.setState({
            board: rows,
            emptyCells: newEmptyCells
        })
    }

    componentDidMount() {
        this.createNewBoard()
    }

    changePlayer = (column) => {
        if (!this.state.isGameOver){
            let newBoard = this.state.board

            const emptyCells = this.state.emptyCells[column]
            let newFullCells = this.state.emptyCells
            newFullCells[column] = this.state.emptyCells[column] - 1

            let currentPlayer = "player" + ((this.state.counterTurns % 2) + 1)
            newBoard[emptyCells][column] = currentPlayer

            this.setState({
                board: newBoard,
                fullCells: newFullCells,
                counterTurns: this.state.counterTurns + 1
            })

            if (this.checkWin(column, emptyCells, currentPlayer)) {
                this.setState({
                    isGameOver: true
                })
            }
        }

    }

    checkWin = (column, row, player) => {
        return (this.checkWinInColumn(column, row, player) || this.checkWinInRow(column, row, player) ||
            this.checkWinInDiagonalUp(column, row, player) || this.checkWinInDiagonalDown(column, row, player))
    }

    checkWinInColumn = (column, lastPaintedCell, player) => {
        let equalCells = 1
        if (lastPaintedCell <= 2) {
            for (let i = 1; i < 4; i++) {
                if (player === this.state.board[lastPaintedCell + i][column]) {
                    equalCells++
                } else {
                    break
                }
            }
        }
        return (equalCells === 4)
    }

    checkWinInRow = (column, row, player) => {
        let equalCells = 1
        for (let i = 1; i < (this.state.columnNumber - column - 1); i++) {
            if (player === this.state.board[row][column + i] && (equalCells < 4)) {
                equalCells++
            } else {
                break
            }
        }
        for (let i = 1; i <= column; i++) {
            if (player === this.state.board[row][column - i] && (equalCells < 4)) {
                equalCells++
            } else {
                break
            }
        }
        return (equalCells === 4)
    }

    checkWinInDiagonalUp = (column, row, player) => {
        let counter = 1
        let equalCells = 1
        while (((column + counter) < this.state.columnNumber) && ((row - counter) >= 0) && (equalCells < 4)) {
            if (player === this.state.board[row - counter][column + counter]) {
                equalCells++
            } else {
                break
            }
            counter++
        }
        counter = 1
        while (((column - counter) >= 0) && ((row + counter) < this.state.rowsNumber) && (equalCells < 4)) {
            if (player === this.state.board[row + counter][column - counter]) {
                equalCells++
            } else {
                break
            }
            counter++
        }
        return (equalCells === 4)
    }

    checkWinInDiagonalDown = (column, row, player) => {
        let counter = 1
        let equalCells = 1
        while (((column + counter) < this.state.columnNumber) && ((row + counter) < this.state.rowsNumber) && (equalCells < 4)) {
            if (player === this.state.board[row + counter][column + counter]) {
                equalCells++
            } else {
                break
            }
            counter++
        }
        counter = 1
        while (((column - counter) >= 0) && ((row - counter) >= 0) && (equalCells < 4)) {
            if (player === this.state.board[row - counter][column - counter]) {
                equalCells++
            } else {
                break
            }
            counter++
        }
        return (equalCells === 4)
    }


    render() {
        return (
            <div className="App">
                <div className= "Headline">
                    Connect- 4
                </div>
                <table>
                    {
                        this.state.board.map((row) => {
                            return (
                                <tr>
                                    {
                                        row.map((cell, columnIndex) => {
                                            return (
                                                <td className={cell}
                                                    onClick={() => this.changePlayer(columnIndex)}></td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </table>

                <br/>
                <div className={"player" + (((this.state.counterTurns - 1) % 2) + 1)}>
                    {(this.state.isGameOver) ? "Player " + (((this.state.counterTurns - 1) % 2) + 1) + " - You Are The Winner 🥇" : ""}
                </div>

            </div>
        );
    }
}

export default App;
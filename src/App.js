import './App.css';
import React from "react";

class App extends React.Component {

    state = {
        board: [],
        emptyCells: [],
        counter: 0,
    }

    createNewBoard = () => {
        const rows = [];
        for (let i = 0; i < 6; i++) {
            const columns = []
            for (let j = 0; j < 7; j++) {
                columns.push("empty")
            }
            rows.push(columns)
        }
        const newEmptyCells = [];
        for (let i = 0; i < 7; i++) {
            newEmptyCells.push(5)
        }
        this.setState({
            board: rows,
            emptyCells : newEmptyCells
        })
    }
    componentDidMount() {
        this.createNewBoard()
    }

    changePlayer = (column) => {
        let newBoard = this.state.board

        const emptyCells = this.state.emptyCells[column]
        let newFullCells = this.state.emptyCells
        newFullCells[column] = this.state.emptyCells[column] - 1

        let currentPlayer = ""
        if (this.state.counter % 2 === 0) {
            currentPlayer = "player1"
        }else {
            currentPlayer = "player2"
        }

        newBoard[emptyCells][column] = currentPlayer
        this.setState({
            board: newBoard,
            fullCells: newFullCells,
            counter: this.state.counter + 1
        })
    }


    render() {
        return (
            <div className="App">
                    <table>
                    {
                        this.state.board.map((row) => {
                            return (
                                <tr>
                                    {
                                        row.map((cell, columnIndex) => {
                                            return (
                                                <td className={cell}  onClick={() => this.changePlayer(columnIndex)}></td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        );
    }
}

export default App;
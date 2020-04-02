import React from 'react';
import Grid from '../Components/Grid'
import Buttons from '../Components/Buttons'
// import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends React.Component {
    constructor() {
        super();
        this.speed = 200;
        this.rows = 30;
        this.cols = 50;

        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }

    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({
            gridFull: gridCopy,
        })
    }

    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                gridCopy[i][j] = Math.floor(Math.random() * 4) === 1;
            }
        }
        this.setState({
            gridFull: gridCopy,
        })
    }

    playButton = () => {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.play, this.speed);
    }

    pauseButton = () => {
        clearInterval(this.intervalId);
    }

    slow = () => {
        this.speed = 1000;
        this.playButton();
    }

    fast = () => {
        this.speed = 100;
        this.playButton();
    }

    clear = () => {
        let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
        this.setState({
            gridFull: grid,
            generation: 0,
        });
    }

    gridSize = (size) => {
        switch (size) {
            case "1":
                this.cols = 20;
                this.rows = 10;
                break;
            case "2":
                this.cols = 50;
                this.rows = 30;
                break;
            case "3":
                this.cols = 70;
                this.rows = 50;
        }
        this.clear();
    }

    play = () => {
        const operations = [
            [0, 1],
            [0, -1],
            [1, -1],
            [-1, 1],
            [1, 1],
            [-1, -1],
            [1, 0],
            [-1, 0]
        ];

        let grid = this.state.gridFull;
        let gridClone = arrayClone(this.state.gridFull);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let neighbors = 0;

                operations.forEach(([x, y]) => {
                    const neighborI = i + x;
                    const neighborJ = j + y;
                    if (neighborI >= 0 && neighborI < this.rows && neighborJ >= 0 && neighborJ < this.cols) {
                        neighbors += grid[neighborI][neighborJ]
                    }
                })
                
                if (neighbors < 2 || neighbors > 3) {
                    gridClone[i][j] = false;
                } else if (neighbors === 3) {
                    gridClone[i][j] = true;
                }
            }
        }
        this.setState({
            gridFull: gridClone,
            generation: this.state.generation + 1
        })
    }

    componentDidMount() {
        this.seed();
        this.playButton();
    }

    render() {
        let { gridFull } = this.state
        return (
            <div>
                <h1>Kameron's Game of Life</h1>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    fast={this.fast}
                    clear={this.clear}
                    seed={this.seed}
                    gridSize={this.gridSize}
                />
                <Grid
                    gridFull={gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h2>Generations: {this.state.generation}</h2>
            </div>
        );
    }
}

function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

export default Main;

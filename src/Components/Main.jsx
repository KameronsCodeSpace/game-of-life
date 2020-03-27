import React from 'react';
import Grid from '../Components/Grid'


class Main extends React.Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;

        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }

    render() {
        let { gridFull } = this.state
        return (
            <div>
                <h1>Game of Life</h1>
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
export default Main;

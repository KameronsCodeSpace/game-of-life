import React from 'react';
// import { ButtonToolBar, MenuItem, DropdownButton } from 'react-bootstrap';
import ButtonToolBar from 'react-bootstrap/ButtonToolbar'
// import MenuItem from 'react-bootstrap/MenuItem'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'



class Buttons extends React.Component {

    handleSelect = (evt) => {
        this.props.gridSize(evt);
    }

    render() {
        return (
            <div className="center">
                <ButtonToolBar>
                    <Button variant="warning" onClick={this.props.playButton}>
                        Play
                    </Button>
                    <Button variant="warning" onClick={this.props.pauseButton}>
                        Pause
                    </Button>
                    <Button variant="warning" onClick={this.props.clear}>
                        Clear
                    </Button>
                    <Button variant="warning" onClick={this.props.slow}>
                        Slow
                    </Button>
                    <Button variant="warning" onClick={this.props.fast}>
                        Fast
                    </Button>
                    <Button variant="warning" onClick={this.props.seed}>
                        Seed
                    </Button>
                    <Dropdown onSelect={this.handleSelect}>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            Grid Size
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="1">20x10</Dropdown.Item>
                            <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
                            <Dropdown.Item eventKey="3">70x50</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </ButtonToolBar>
            </div>
        )
    }
}

export default Buttons;
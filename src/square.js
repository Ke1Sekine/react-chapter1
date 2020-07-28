import React from 'react';

export default class Square extends React.Component {
    // Square(props) {
    //     return (
    //         <button className="square" onClick={props.onClick}>
    //             {props.value}
    //         </button>
    //     );
    // }
    render() {
        return (
            <button className="square" onClick={() => {this.props.onClick()}}>
                {this.props.value}
            </button>
        );
    }
}
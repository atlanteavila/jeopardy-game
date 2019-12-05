import React from 'react'
import { hotkeys } from 'react-keyboard-shortcuts'

class NextButton extends React.PureComponent {
    state = {
        showAnswer: false,
    }

    hot_keys = {
        'space': {
            priority: 1,
            handler: (event) => {
                event.preventDefault();
                this.setState({ showAnswer: true })
            },
        },
    }

    render() {
        return (
            this.state.showAnswer && <div>{this.props.answer}</div>
        )
    }
}

export default hotkeys(NextButton)
import { Input } from 'antd';
import './Input.css';
import React from 'react';
import PropTypes from 'prop-types';

export default class Search extends React.Component {
    state = {
        value: '',
    };

    textInput = React.createRef();

    componentDidMount() {
        this.textInput.current.focus();
    }

    onChange = (e) => {
        const { search } = this.props;

        this.setState(
            {
                value: e.target.value,
            },
            () => {
                const { value } = this.state;

                search(value);
            }
        );
    };

    render() {
        const { value } = this.state;
        return (
            <Input
                ref={this.textInput}
                onChange={this.onChange}
                value={value}
                className="input"
                placeholder="Try typing..."
            />
        );
    }
}

Search.propTypes = {
    search: PropTypes.func,
};

Search.defaultProps = {
    search: () => {},
};

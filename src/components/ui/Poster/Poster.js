import React from 'react';
import PropTypes from 'prop-types';

import noImgtxt from '../../../assets/img/noImg-txt.png';
import Spin from '../Spin/Spin';
import Api from '../../../services/Api/Api';
import './Poster.css';

export default class Poster extends React.Component {
    state = {
        src: '',
        loading: true,
    };

    api = new Api();

    componentDidMount() {
        const { posterPath } = this.props;
        (async () => {
            try {
                const res = await this.api.getImg(posterPath);
                const blobUrl = URL.createObjectURL(res); // blob is the Blob object
                this.setState({ src: blobUrl, loading: false });
            } catch (error) {
                this.setState({ src: noImgtxt, loading: false });
            }
        })();
    }

    render() {
        const { loading, src } = this.state;
        return loading ? (
            <div className="img-spin">
                <Spin />{' '}
            </div>
        ) : (
            <img className="poster" alt="poster" src={src} />
        );
        // <>
        //     {
        //         loading ? <div className="img-spin"><Spin /> </div> :
        //             <img
        //                 className="poster"
        //                 alt="poster"
        //                 src={src}
        //             />
        //     }
        // </>
    }
}

Poster.defaultProps = {
    posterPath: '',
};
Poster.propTypes = {
    posterPath: PropTypes.string,
};

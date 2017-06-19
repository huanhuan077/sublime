/**
 * Created by Administrator on 2016/3/23.
 */
import React, { Component } from 'react';
import emitter from '../vender/emitter';
import $ from 'jquery';
import "semantic-ui/dist/components/dropdown.css"
import "semantic-ui/dist/components/dropdown.js"
import "semantic-ui/dist/components/transition.css"
import "semantic-ui/dist/components/transition.js"
import "../../css/Header.css"
import "bootstrap/dist/css/bootstrap.css"
import "../../font-awesome/less/font-awesome.less"
class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {media: 'all'};
        this._search = this._search.bind(this);
        this._onChange = this._onChange.bind(this);
    };

    componentDidMount() {
        const self = this;
        // initialize semantic UI dropdown
        $('.ui.dropdown').dropdown({
                onChange(value) {
                    //console.log(123);
                    self.setState({media: value});
                    // only start search if there is a search query inside of input box
                    self.state.query && emitter.emit('search', self.state);
                    console.log(123);
                }

            });
    }

    componentWillUnmount() {
        // reset dropdown
        $('.ui.dropdown').dropdown('refresh');
    }

    _search(e) {
        // only trigger search while user type enter
        e.keyCode === 13 && emitter.emit('search', this.state);
    }

    _onChange(e) {
        // set query state
        this.setState({
            query: e.target.value
        });
    }

    render() {

        return (
            <div className="ui inverted vertical segment center aligned header">
                <div className="ui right action left icon input massive action">
                    <i className="fa fa-search"></i>
                    <input type="text"
                           onKeyDown={this._search}
                           onChange={this._onChange}
                           placeholder="Search..." autoFocus
                    />
                    <div className="ui dropdown button button-default">
                        <div className="text">All</div>
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            <div className="item">All</div>
                            <div className="item">Audiobook</div>
                            <div className="item">eBook</div>
                            <div className="item">Movie</div>
                            <div className="item">Music</div>
                            <div className="item">Music Video</div>
                            <div className="item">Podcast</div>
                            <div className="item">TV Show</div>
                            <div className="item">Short Film</div>
                            <div className="item">Software</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;


/** WEBPACK FOOTER **
 ** ./js/components/Header.js
 **/
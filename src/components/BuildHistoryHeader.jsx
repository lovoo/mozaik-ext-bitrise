import React, { Component } from 'react';

import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';

import Mozaik from 'mozaik/browser';

class BuildHistoryHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            app: {
                title: ''
            }
        };
    }

    getApiRequest() {
        const { slug } = this.props;

        return {
            id: `bitrise.getApp.${slug}`,
            params: {
                slug
            }
        };
    }

    onApiData({data}) {
        this.setState({ app: data });
    }

    render() {
        return (
            <div className="widget__header">
                <span className="widget__header__subject">{this.state.app.title}</span> build history
                <i className="fa fa-bug" />
            </div>
        );
    }
}

reactMixin(BuildHistoryHeader.prototype, ListenerMixin);
reactMixin(BuildHistoryHeader.prototype, Mozaik.Mixin.ApiConsumer);

export default BuildHistoryHeader;

import React, { Component } from 'react';

import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';

import Mozaik from 'mozaik/browser';
import BuildHistoryItem from './BuildHistoryItem';
import BuildHistoryHeader from './BuildHistoryHeader';

class BuildHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {builds: []};
    }

    getApiRequest() {
        const { slug, limit } = this.props;

        return {
            id: `bitrise.getBuilds.${slug}.${limit}`,
            params: {
                slug, limit
            }
        };
    }

    onApiData(builds) {
        this.setState({ builds });
    }

    render() {
        const buildNodes = this.state.builds.map((build) => (
            <BuildHistoryItem key={build.build_number} build={build} />
        ));
        return (
            <div>
                <BuildHistoryHeader slug={this.props.slug} />
                <div className="widget__body">
                    {buildNodes}
                </div>
            </div>
        )
    }
}
BuildHistory.displayName = 'BuildHistory';

reactMixin(BuildHistory.prototype, ListenerMixin);
reactMixin(BuildHistory.prototype, Mozaik.Mixin.ApiConsumer);

export default BuildHistory;

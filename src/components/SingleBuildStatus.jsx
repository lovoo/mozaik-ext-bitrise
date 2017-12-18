import React, { Component, PropTypes } from 'react';

import reactMixin from 'react-mixin';
import { ListenerMixin } from 'reflux';

import Mozaik from 'mozaik/browser';;

import moment from 'moment';

import { BuildStatus, getBuildStatus, getBuildProgress } from './util';

class SingleBuildStatus extends Component {
    constructor(props) {
        super(props);

        this.state = { currentBuild: null, previousBuild: null };
    }

    getApiRequest() {
        const { slug, workflow } = this.props;

        return {
            id: `bitrise.getBuilds.${slug}.3.${workflow}`,
            params: {
                slug,
                limit: 3, // increase the estimation accuracy
                workflow
            }
        };
    }

    onApiData(builds) {
        const currentBuild = builds.length > 0 ? builds[0] : null;
        const previousBuild = builds.length > 1 ? builds[1] : null;
        this.setState({ currentBuild, previousBuild });
    }

    render() {
        const { currentBuild, previousBuild } = this.state;

        console.log(currentBuild);

        if (!currentBuild) {
            return (<div className="widget__body__colored">{'Build not found'}</div>);
        }

        const currentStatus = getBuildStatus(currentBuild);
        const previousStatus = getBuildStatus(previousBuild);
        const title = this.props.title || currentBuild.triggered_workflow;

        const classList = [
            'widget__body__colored',
            `bitrise__view__job__build__colored_status--${(currentStatus === 'running' ? previousStatus : currentStatus).toLowerCase()}`
        ];

        var iconClass;
        if (currentStatus === 'success') { iconClass = 'fa fa-check'; };
        if (currentStatus === 'failed') { iconClass = 'fa fa-close'; };
        if (currentStatus === 'cancelled') { iconClass = 'fa fa-meh-o'; };
        if (currentStatus === 'running') { iconClass = 'fa fa-spin fa-cog'; };

        const progress = currentStatus == 'running' ? getBuildProgress(currentBuild) * 100 : 100;

        const progressStyle = {
            border: '1px solid #000',
            backgroundColor: 'red',
            width: `${progress}%`
        };

        return (
            <div className={classList.join(' ')}>
                <div className="bitrise__job-status__current">
                   Build #{currentBuild.build_number}<br />
                    <a className="bitrise__job-status__current__status" href={currentBuild.url}>
                        {title}&nbsp;<br />
                        <i className={iconClass} />&nbsp;
                        <span className="bitrise__job-status__current__progress-number">
                            {progress < 100 && `${Math.round(progress)}%`}
                        </span>
                    </a>
                    {progress < 100 && <div className="bitrise__job-status__current__progress-bar" style={progressStyle} />}
                    <time className="bitrise__job-status__current__time">
                        <i className="fa fa-clock-o" />&nbsp;
                        {moment(currentBuild.triggered_at).fromNow()}
                    </time>
                </div>
            </div>
        );
    }
}

SingleBuildStatus.displayName = 'SingleBuildStatus';

SingleBuildStatus.propTypes = {
    slug: PropTypes.string.isRequired,
    workflow: PropTypes.number.isRequired,
    title: PropTypes.string
};

reactMixin(SingleBuildStatus.prototype, ListenerMixin);
reactMixin(SingleBuildStatus.prototype, Mozaik.Mixin.ApiConsumer);

export default SingleBuildStatus;

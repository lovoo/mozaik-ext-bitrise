import React, { Component, PropTypes } from 'react';
import moment from 'moment';

const buildStatus = {
    running: 0,
    success: 1,
    failed: 2,
    cancelled: 3
};

class BuildHistoryItem extends Component {
    renderTime(build) {
        return build.finished_at ? moment(build.finished_at).fromNow() : 'running';
    }

    getBuildStateClass({status}) {
        switch (status) {
            case buildStatus.running:
                return 'running';
            case buildStatus.success:
                return 'success';
            case buildStatus.failed:
                return 'failed';
            case buildStatus.cancelled:
                return 'cancelled';
        }
    }

    getBuildPercent({status, estimation, triggered_at}) {
        if (status !== buildStatus.running) {
            return;
        }

        const now = new Date();
        const start = Date.parse(triggered_at);

        return Math.min((now - start ) / estimation, .95);
    }

    redirectToBuild(slug) {
        window.location = `https://www.bitrise.io/build/${this}`;
    }

    render() {
        const { build } = this.props;
        const cssClasses = `list__item bitrise__build-history__item bitrise__build-history__item--${this.getBuildStateClass(build)}`;
        const barPercent = `${(this.getBuildPercent(build) * 100)}%`;
        const gradientString = `linear-gradient(to right, rgba(0,0,0,.3) 0%, rgba(0,0,0,.3) ${barPercent}, transparent ${barPercent}, transparent 100%)`;
        const buildStyle = build.status === buildStatus.running ? {background:  gradientString} : undefined;
        const iconClass = build.status === buildStatus.running ? 'fa fa-cog fa-spin' : 'fa fa-clock-o';
        const onClickHandler = this.redirectToBuild.bind(build.slug);

        return (<div className={cssClasses} style={buildStyle} onClick={onClickHandler}>
            {build.triggered_workflow} #{build.build_number}
            <div className="commit">{build.commit_message}</div>
            <div>
                <time className="list__item__time">
                    <i className={iconClass} />&nbsp;
                    {this.renderTime(build)}
                </time>
            </div>
        </div>);
    }
}

BuildHistoryItem.displayName = 'BuildHistoryItem';

BuildHistoryItem.propTypes = {
    build: PropTypes.shape({
        number:      PropTypes.string.isRequired,
        state:       PropTypes.string.isRequired,
        finished_at: PropTypes.string.isRequired,
        commit:      PropTypes.shape({
            message: PropTypes.string.isRequired
        }),
        slug:        PropTypes.string.isRequired
    }).isRequired
};


export default BuildHistoryItem;

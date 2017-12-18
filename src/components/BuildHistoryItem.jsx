import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import { BuildStatus, getBuildStatus, getBuildProgress} from './util';

class BuildHistoryItem extends Component {
    renderTime(build) {
        return build.finished_at ? moment(build.finished_at).fromNow() : 'running';
    }

    redirectToBuild() {
        window.open(`https://www.bitrise.io/build/${this}`, '_blank');
    }

    render() {
        const { build } = this.props;
        const cssClasses = `list__item bitrise__build-history__item bitrise__build-history__item--${getBuildStatus(build)}`;
        const barPercent = `${(getBuildProgress(build) * 100)}%`;
        const gradientString = `linear-gradient(to right, rgba(0,0,0,.3) 0%, rgba(0,0,0,.3) ${barPercent}, transparent ${barPercent}, transparent 100%)`;
        const buildStyle = build.status === BuildStatus.running ? {background:  gradientString} : undefined;
        const iconClass = build.status === BuildStatus.running ? 'fa fa-cog fa-spin' : 'fa fa-clock-o';
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

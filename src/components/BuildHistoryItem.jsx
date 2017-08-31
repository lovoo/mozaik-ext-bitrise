import React, { Component, PropTypes } from 'react';
import moment                          from 'moment';

class BuildHistoryItem extends Component {
    renderTime(build) {
        return build.finished_at ? moment(build.finished_at).fromNow() : 'running';
    }

    getBuildStateClass({status}) {
        switch (status) {
            case 0:
                return 'running';
            case 1:
                return 'success';
            case 2:
                return 'failed';
            case 3:
                return 'cancelled';
        }
    }

    render() {
        const { build } = this.props;
        const cssClasses = `list__item bitrise__build-history__item bitrise__build-history__item--${this.getBuildStateClass(build)}`;

        return (
            <div className={cssClasses}>
                {build.triggered_workflow} #{build.build_number}
                <div className="commit">{build.commit_message}</div>
                <div>
                    <time className="list__item__time">
                        <i className="fa fa-clock-o" />&nbsp;
                        {this.renderTime(build)}
                    </time>
                </div>
            </div>
        );
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
        })
    }).isRequired
};


export default BuildHistoryItem;

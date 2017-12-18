import process from 'process';
import fetch from 'node-fetch';

import convict from 'convict';

const config = convict({
    bitrise: {
        token: {
            doc: 'The Bitrise API Token',
            default: null,
            format: String,
            env: 'BITRISE_API_TOKEN'
        }
    }
});

function bitriseApiRequest(path) {
    return fetch(`https://api.bitrise.io/v0.1/${path}`, {
        headers: {
            'Authorization': `token ${config.get('bitrise.token')}`
        }
    });
}

/**
 * adds a estimation about the build time
 */
function addEstimation(builds) {

    if (builds.length < 2) {
        return builds;
    }

    const estimatedWorkflowTime = {};

    for (const build of builds) {
        if ( build.status === 1 && !estimatedWorkflowTime[build.triggered_workflow]) {
            const start = Date.parse(build.triggered_at);
            const end = Date.parse(build.finished_at);

            estimatedWorkflowTime[build.triggered_workflow] = end - start;
        }
    }

    return builds.map((build) => {
        if (build.status === 0 && build.is_on_hold === false) {
            return Object.assign({}, build, {estimation: estimatedWorkflowTime[build.triggered_workflow]});
        }

        return build;
    });
}

function getMe() {
    return bitriseApiRequest('me').then(res => res.json());
}

function getApp({slug}) {
    return bitriseApiRequest(`apps/${slug}`).then(res => res.json());
}

function getBuilds({ slug , limit = 10, workflow}) {

    var path = `apps/${slug}/builds?limit=${limit}`;
    if (workflow) {
        path += `&workflow=${workflow}`;
    }

    return bitriseApiRequest(path).then((res) => {
        return res.json();
    }).then((res) => {
        return res.data;
    }).then(addEstimation);
}

const client = mozaik => {
    mozaik.loadApiConfig(config);

    return {
        getApp,
        getMe,
        getBuilds
    };
};

export default client;

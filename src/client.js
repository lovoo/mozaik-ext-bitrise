import Promise from 'bluebird';
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

function getMe() {
    return bitriseApiRequest('me').then(res => res.json());
}

function getApp ({slug}) {
    return bitriseApiRequest(`apps/${slug}`).then(res => res.json());
}

function getBuilds({ slug , limit = 10}) {
    return bitriseApiRequest(`apps/${slug}/builds?limit=${limit}`).then((res) => {
        return res.json();
    }).then((res) => {
        return res.data;
    });
}

const client = mozaik => {
    mozaik.loadApiConfig(config);

    return {
        getApp,
        getMe,
        getBuilds
    }
}

// TODO per workflow helper
/*for (build of res.data) {
    if (!workflows.hasOwnProperty(build.triggered_workflow)) {
        workflows[build.triggered_workflow] = new Array();
    }

    workflows[build.triggered_workflow].push(build);
}*/

export default client;

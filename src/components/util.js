export const BuildStatus = {
    running: 0,
    success: 1,
    failed: 2,
    cancelled: 3
};

export function getBuildStatus({status}) {
    switch (status) {
        case BuildStatus.running:
            return 'running';
        case BuildStatus.success:
            return 'success';
        case BuildStatus.failed:
            return 'failed';
        case BuildStatus.cancelled:
            return 'cancelled';
    }
}

export function getBuildProgress({status, estimation, triggered_at}) {
    if (status !== BuildStatus.running) {
        return;
    }

    const now = new Date();
    const start = Date.parse(triggered_at);

    return Math.min((now - start ) / estimation, .95);
}

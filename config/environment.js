const development={
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'ZFSl8PIyJTw8TqBT4rUZoRyjjj75MV52',
    db: 'job_portal_development'
}

const production={
    name: process.env.JOB_ENVIRONMENT,
    asset_path: process.env.JOB_ASSET_PATH,
    session_cookie_key: process.env.JOB_SESSION_COOKIE_KEY,
    db: process.env.JOB_DB
}

module.exports= development;
// module.exports= production;
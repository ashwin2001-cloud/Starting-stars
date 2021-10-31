const development={
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'ZFSl8PIyJTw8TqBT4rUZoRyjjj75MV52',
    db: 'startingstars-db',
    username: 'ashwin_baranwal',
    password: 'Ashclash_123'
}

const production={
    name: process.env.JOB_ENVIRONMENT,
    asset_path: process.env.JOB_ASSET_PATH,
    session_cookie_key: process.env.JOB_SESSION_COOKIE_KEY,
    db: process.env.JOB_DB,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
}

module.exports= development;
// module.exports= production;
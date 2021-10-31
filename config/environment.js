const production={
    name: process.env.JOB_ENVIRONMENT,
    asset_path: process.env.JOB_ASSET_PATH,
    session_cookie_key: process.env.JOB_SESSION_COOKIE_KEY,
    db: process.env.JOB_DB,
    mongo_username: process.env.MONGOATLAS_USERNAME,
    password: process.env.MONGOATLAS_PASSWORD
}

// module.exports= development;
module.exports= production;
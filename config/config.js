exports.user = "ADMIN"

exports.password = "3&E?u~FAJQk57h9x"

// For information on connection strings see:
// https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#connectionstrings

exports.connectString = "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.eu-zurich-1.oraclecloud.com))(connect_data=(service_name=g98d789b83f0cbe_quiz_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))"

//CID = "ORCL"

// Setting externalAuth is optional.  It defaults to false.  See:
// https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#extauth
//externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,

exports.mySecret = "~!T{!?aTCy-[Pg3e"

exports.BCRYPT_SALT_ROUNDS = 12

exports.LOGIN_MIN_LENGTH = 3
exports.LOGIN_MAX_LENGTH = 20

exports.FACEBOOK_CLIENT_ID = "1054814425676957"
exports.FACEBOOK_SECRET_KEY = "4c87b5adb7216a26993c523cd3887e62"
exports.FACEBOOK_CALLBACK_URL = "http://localhost:4000/api/facebook/callback"


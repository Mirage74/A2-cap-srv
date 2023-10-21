exports.user = "?????"

exports.password = "?????"

// For information on connection strings see:
// https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#connectionstrings

exports.connectString = "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.eu-zurich-1.oraclecloud.com))(connect_data=(service_name=??????_quiz_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))"

//CID = "ORCL"

// Setting externalAuth is optional.  It defaults to false.  See:
// https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#extauth
//externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,

exports.mySecret = "????"

exports.BCRYPT_SALT_ROUNDS = 12

exports.LOGIN_MIN_LENGTH = 3
exports.LOGIN_MAX_LENGTH = 20

exports.FACEBOOK_CLIENT_ID = "???"
exports.FACEBOOK_SECRET_KEY = "????"
exports.FACEBOOK_CALLBACK_URL = "http://localhost:4000/api/facebook/callback"


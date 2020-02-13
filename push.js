var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BNzOkvMWMAMNwE-__jlCrqmKzyCi15BKDWH6stbEqYlpS8yGX--wbukqngokcJU_8trhqkT6rOesVoAdE9TNF48",
    "privateKey": "eZsdtdvpE1XVmgdrZA3MLejE95hgfiWkGRJpHI0az6s"
};
 
 
webPush.setVapidDetails(
    'mailto:irfanchairurrachman@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cvvE6wOejbM:APA91bGIpxFyTVkE5KqcPrqdGmseqNYBCwfxH9HxKFt8gzpHxwkMbfHmgWWAedeDbHKx6JsF3YYSrOus8EAtsB2e2R_xTf8v8MdS_-sDNFKBgyCBBV6uCHFxoaEMl_3lUlHXm4WExkVG",
    "keys": {
        "p256dh": "BCc3eXLp1qzdmgoJG+yAknKDR+SpjLnhDv23acrrId2dgLKQ1R4UcVgmuh+HjQWSt8lce33aIJTZxJ20U69aR2M=",
        "auth": "hy6H+tKvNaJxVYAsUSFpQA=="
    }
};
var payload = 'Hey look, this is EPL for my 3nd Submission!';
var options = {
    gcmAPIKey: '410705002544',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
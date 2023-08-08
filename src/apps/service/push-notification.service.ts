// import { ONE_SIGNAL_CONFIG } from "../config/firebase/one-signal";

// async function SendNotification(data: any, callback: any) {
//   let inputMessage = {
//     app_id: ONE_SIGNAL_CONFIG.APP_ID,
//     contents: {
//       en: `${data}`,
//     },
//     included_segments: ["Active Users"],
//     content_available: true,
//     small_icon: "ic_notification_icon",
//     data: {
//       PushTitle: "Thuc hanh Lab Flutter",
//     },
//   };

//   let headers = {
//     "Content-Type": "application/json; charset = utf-8",
//     Authorization: "Basic " + ONE_SIGNAL_CONFIG.API_KEY,
//   };
//   const options = {
//     host: "onesignal.com",
//     port: 443,
//     path: "/api/v1/notifications",
//     method: "POST",
//     headers: headers,
//   };

//   var https = require("https");
//   let req = https.request(options, function (res) {
//     res.on("data", function (data) {
//       console.log(JSON.parse(data));
//       return callback(null, JSON.parse(data));
//     });
//   });
//   req.on("error", function (e) {
//     return callback({
//       message: e,
//     });
//   });

//   req.write(JSON.stringify(inputMessage));
//   req.end();
// }

// export { SendNotification };

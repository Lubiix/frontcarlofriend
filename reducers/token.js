export default function (token = null, action) {
  console.log("action dans reducer", action);
  if (action.type == "setToken") {
    return action.token;
  }
  if (action.type == "deleteToken") {
    return null;
  }
  return token;
}

export default function (token = "", action) {
  console.log("action dans reducer", action);
  if (action.type == "setToken") {
    return action.token;
  }
  return token;
}

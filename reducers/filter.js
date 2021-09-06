export default function (filter = null, action) {
  console.log("action dans reducer filtre", action);
  if (action.type == "setFilter") {
    return action.filter;
  }
  return filter;
}

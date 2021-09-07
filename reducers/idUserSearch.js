export default function (idUser = null, action) {
  console.log("action dans reducer", action);
  if (action.type == "addID") {
    return action.idUser;
  }
  return idUser;
}

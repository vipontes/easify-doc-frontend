import Axios from "axios";

export default class UsuarioService {

  static login(usuarioEmail, usuarioSenha) {
    const data = {
      usuario_email: usuarioEmail,
      usuario_senha: usuarioSenha,
    };

    return Axios.post("http://localhost:8080/v1/login", data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

}

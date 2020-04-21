<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CCol col="6">
      <CRow>
        <CCol>
          <CAlert :show.sync="dismissCountDown" closeButton color="danger">
            {{errorMessage}}
            <CProgress color="danger" :max="dismissSecs" :value="dismissCountDown" height="4px" />
          </CAlert>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    id="username"
                    autocomplete="username email"
                    v-model="username"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    id="password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" v-on:click="login()">Login</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CCol>
  </CContainer>
</template>

<script>
import UsuarioService from "../../services/usuario-service";
import LocalStorageService from "../../utils/local-storage-service";
import router from '../../router';

export default {
  name: "Login",
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      errorMessage: "",
      username: "",
      password: "",
      loginData: []
    };
  },
  methods: {
    login() {
      if (this.username == "") {
        this.dismissCountDown = 10;
        this.errorMessage = "Usuário inválido";
        return;
      }

      if (this.password == "") {
        this.dismissCountDown = 10;
        this.errorMessage = "Senha inválida";
        return;
      }

      UsuarioService.login(this.username, this.password)
        .then(response => {
          if (response.status == 200) {
            this.loginData = response.data;
            LocalStorageService.setUserData(this.loginData);
            router.push({ name: "Home" });
          } else {
            this.errorMessage = response.response.data.message;
            this.dismissCountDown = 10;
            console.log(response.response.data.message);
          }
        })
        .catch(error => {
          this.errorMessage = error.response.data.message;
          this.dismissCountDown = 10;
          console.error(error.response.data.message);
        });
    }
  }
};
</script>

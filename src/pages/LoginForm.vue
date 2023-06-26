<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page
        class="window-height window-width row justify-center items-center"
      >
        <q-card square bordered style="width: 500px" class="q-pa-md shadow-1">
          <q-form>
            <q-card-section>
              <div class="text-h6">Авторизация</div>
            </q-card-section>

            <q-card-section class="q-pt-none q-gutter-md">
              <q-input
                label="Электронная почта"
                v-model="userCred.username"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input 
                label="Пароль" 
                v-model="userCred.password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-card-section>

            <q-card-actions align="center">
              <q-btn
                label="Войти"
                color="primary"
                @click="login"
                v-close-popup
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginForm",

  data() {
    return {
      userCred: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      api
        .post("/auth/authenticate", this.userCred)
        .then((response) => {
          this.$store.commit("login", response);
          this.$http.defaults.headers.common["Authorization"] =
            response.data.token;
          this.$router.push("/");
        })
        .catch((reason) => {
          console.log(reason);
          this.loginError = true;
          this.errorMessage = "Ошибка входа!";
        });
    },
  },
});
</script>

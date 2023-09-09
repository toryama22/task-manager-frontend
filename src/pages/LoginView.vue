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
              <q-input label="Электронная почта" v-model="email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input label="Пароль" v-model="password">
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

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";

//const router = useRouter();
const userStore = useUserStore();

let errors = ref([]);
let email = ref(null);
let password = ref(null);

const login = async () => {
  errors.value = [];

  try {
    let res = await axios.post("/auth/authenticate", {
      email: email.value,
      password: password.value,
    });
    axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
    userStore.setUserDetails(res);

    //router.push('/')
  } catch (err) {
    errors.value = err.response.data.errors;
  }
};
</script>

<template>
    <q-dialog v-model="visible" max-width="500px">
      <q-card>
        <q-card-title class="text-sm-h6">Вы уверены, что хотите удалить запись?</q-card-title>
        <q-card-actions>
          <q-space></q-space>
          <q-btn color="blue darken-1" text @click="$emit('deletion-canceled')">Отменить</q-btn>
          <q-btn color="blue darken-1" text @click="$emit('deletion-confirmed')">Удалить</q-btn>
          <q-spacer></q-spacer>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "DeleteConfirmDialog",
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    }
  })
  </script>
  
  <style >
  
  </style>
<template>
  <q-dialog max-width="1000px" max-height="1000px">
    <q-card>
      <div class="q-pa-lg">Вы уверены, что хотите удалить запись?</div>
      <div class="q-pa-sm">
        <q-card-actions align="center">
          <q-btn color="blue darken-1" text @click="$emit('deletion-canceled')"
            >Отменить</q-btn
          >
          <q-btn color="red darken-1" text @click="$emit('deletion-confirmed')"
            >Удалить</q-btn
          >
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ConfirmDialog",
});
</script>

<style scoped></style>

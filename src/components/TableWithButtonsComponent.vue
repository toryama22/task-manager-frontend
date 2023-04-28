<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableWithButtonsComponent",
  
  props: {
    items: Array,
    headers: Array,
  },

  data() {

  }
});
</script>

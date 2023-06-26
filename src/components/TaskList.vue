<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>Single line item</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
          <q-item-label caption>Caption</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label overline>OVERLINE</q-item-label>
          <q-item-label>Item with caption</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TaskList",

  data() {
    return {
      loading: true,
      positions: [],

      columns: [
        {
          name: "id",
          label: "ID",
          field: "id",
          align: "center",
          sortable: true,
        },
        {
          name: "positionTitle",
          label: "Должность",
          field: "positionTitle",
          align: "center",
          sortable: true,
        },
        {
          name: "createdDate",
          label: "Дата создания",
          field: "createdDate",
          align: "center",
          sortable: true,
        },
        {
          name: "modifiedDate",
          label: "Дата изменения",
          field: "modifiedDate",
          align: "center",
          sortable: true,
        },
        { name: "actions", label: "Action" },
      ],
    };
  },
});
</script>

<template>
  <div class="q-pa-md q-gutter-md">
    <q-btn label="Создать" color="primary" @click="basic = true" />

    <q-dialog v-model="basic" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-form autofocus @submit="submitForm">
          <q-card-section>
            <div class="text-h6">Terms of Agreement</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              label="Название должности *"
              v-model="editedPosition.positionTitle"
            ></q-input>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Отмена" v-close-popup />
            <q-btn label="Создать" color="primary" @click="submitForm" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-table
      title="Должности"
      color="secondary"
      :loading="loading"
      :rows="positions"
      :columns="columns"
      :separator="separator"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";

export default defineComponent({
  name: "PositionsPage",

  data() {
    return {
      /*loading = true,
      positions = [],*/

      loading: true,
      positions: [],

      separator: "horizontal",
      basic: false,
      fixed: false,

      editedPosition: {
        id: null,
        createdDate: null,
        modifiedDate: null,
        deletedDate: null,
        positionTitle: null,
      },

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
    ]
    }
  },

  methods: {
    async createPosition(editedPosition) {
    await api.post("/position", editedPosition)/*.then((response) => {
      if (response.status === 200) {
        this.merchants.push(response.data);
        this.closeEditDialog();
      } else {
        this.$router.push("/connection-error");
      }
    });*/
    },

    fetchPositions() {
      api
      .get("/position")
      .then((response) => {
        this.positions = response.data;
      })
      .finally(() => {
        this.loading = false;
      });
    },
    

    submitForm() {
      this.createPosition(this.editedPosition);
      this.fetchPositions();
    },
  },

  mounted() {
    this.fetchPositions();
    console.log(this.positions)
  },





  /*setup() {
    const loading = ref(true);
    const positions = ref([]);

    const editedPosition = {
      id: null,
      createdDate: null,
      modifiedDate: null,
      deletedDate: null,
      positionTitle: null,
    };

    const columns = [
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
    ];

    api
      .get("/position")
      .then((response) => {
        positions.value = response.data;
      })
      .finally(() => {
        loading.value = false;
      });

    return {
      separator: ref("horizontal"),
      columns,
      loading,
      positions,
      basic: ref(false),
      fixed: ref(false),
    };
  },*/
});
</script>

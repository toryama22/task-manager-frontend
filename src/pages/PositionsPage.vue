<template>
  <div class="q-pa-md q-gutter-lg">
    <q-btn label="Создать" color="primary" @click="editDialogVisible = true" />

    <q-dialog
      v-model="editDialogVisible"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card style="min-width: 350px">
        <q-form>
          <q-card-section>
            <div class="text-h6">{{ editDialogTitle }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              label="Название должности *"
              v-model="editedPosition.positionTitle"
            ></q-input>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn 
              flat 
              label="Отмена" 
              v-close-popup 
            />
            
            <q-btn
              label="Создать"
              color="primary"
              @click="onSaveClicked"
              v-close-popup
            />
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
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="mode_edit" @click="onEdit(props.row)"></q-btn>
          <q-btn
            icon="delete"
            @click="showDeleteConfirmDialog(props.row)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>

    <ConfirmDialog
      v-model="deleteConfirmDialogVisible"
      @deletion-confirmed="onDeleteConfirmed"
      @deletion-canceled="closeDeleteConfirmDialog"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import { api } from "boot/axios";

export default defineComponent({
  components: {
    ConfirmDialog,
  },

  name: "PositionsPage",

  data() {
    return {
      loading: true,
      positions: [],

      separator: "horizontal",
      editDialogVisible: false,
      deleteConfirmDialogVisible: false,
      editDialogTitle: "",
      fixed: false,

      pagination: {
        rowsPerPage: 50,
        sortBy: "id",
        //descending: true,
      },

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
        { 
          name: "actions", 
          label: "Action",
          align: "center"
        },
      ],
    };
  },

  methods: {
    async createPosition(editedPosition) {
      await api.post("/position", editedPosition); /*.then((response) => {
      if (response.status === 200) {
        this.merchants.push(response.data);
        this.closeEditDialog();
      } else {
        this.$router.push("/connection-error");
      }
    });*/
    },

    async fetchPositions() {
      //console.log(sessionStorage.getItem('token'))
      await api.get("/position").then((response) => {
        if (response.status === 200) {
          this.positions = response.data;
          this.loading = false;
        } else {
          this.$router.push("/connection-error");
        }
      });
    },

    async updatePosition(position) {
      await api.put("/position/" + position.id, position).then((response) => {
        if (response.status === 200) {
          position = response.data;
          const index = this.positions.findIndex((p) => p.id === position.id);
          Object.assign(this.positions[index], position);
          this.closeEditDialog();
        } else {
          this.$router.push("/connection-error");
          console.log("error" + response.status);
        }
      });
    },

    async deletePosition(position) {
      await api.delete("/position/" + position.id).then((response) => {
        if (response.status === 200) {
          const index = this.positions.findIndex((p) => p.id === position.id);
          this.positions.splice(index, 1);
          this.closeDeleteConfirmDialog();
        } else {
          this.$router.push("/connection-error");
          console.log("error " + response.status);
        }
      });
    },

    onEdit(position) {
      this.editedPosition = Object.assign({}, position);
      this.editDialogVisible = true;
      this.editDialogTitle = this.editedPosition.id == null ? "Новая должность" : "Редактирование";
    },

    showDeleteConfirmDialog(position) {
      this.editedPosition = Object.assign({}, position);
      this.deleteConfirmDialogVisible = true;
    },

    closeDeleteConfirmDialog() {
      this.deleteConfirmDialogVisible = false;
      this.editedPosition = {
        id: null,
        createdDate: null,
        modifiedDate: null,
        deletedDate: null,
        positionTitle: null,
      };
    },

    onSaveClicked() {
      if (this.editedPosition.id == null) {
        this.createPosition(this.editedPosition);
      } else {
        this.updatePosition(this.editedPosition);
      }
    },

    closeEditDialog() {
      this.editDialogVisible = false;
      this.editedPosition = {
        id: null,
        createdDate: null,
        modifiedDate: null,
        deletedDate: null,
        positionTitle: null,
      };
    },

    onDeleteConfirmed() {
      this.deletePosition(this.editedPosition);
      this.deleteConfirmDialogVisible = false;
    },
  },

  mounted() {
    this.fetchPositions();
  },
});
</script>

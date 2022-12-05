<template>
  <Modal :model-value="modal">
    <div
      data-cy="modal-information"
      class="bg-white rounded-xl lg:w-4/12 w-10/12"
    >
      <!-- content -->
      <div class="flex flex-row p-5 items-center w-full gap-3">
        <Info data-cy="modal-information-icon" />
        <span data-cy="modal-information-title" class="font-medium"
          >Activity berhasil dihapus</span
        >
      </div>
    </div>
  </Modal>
</template>

<script setup>
import Info from "@/assets/svgs/Info.svg?component";

const props = defineProps({
  modal: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["close"]);
</script>

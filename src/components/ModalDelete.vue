<template>
  <div
    class="fixed w-full h-full flex justify-center items-center z-50 top-0 bg-overlay"
    v-show="modal"
    @click.self="$emit('close')"
  >
    <div data-cy="modal-delete" class="bg-white rounded-lg lg:w-4/12 w-10/12">
      <!-- content -->
      <div class="flex flex-col p-10 items-center w-full gap-7">
        <Warning data-cy="modal-delete-icon" />
        <span
          data-cy="modal-delete-title"
          class="text-lg font-normal flex flex-col text-center"
        >
          {{ heading }}
          <span class="font-bold">"{{ title }}"?</span>
        </span>
        <!-- action -->
        <div class="flex flex-row justify-center items-center gap-7 px-8">
          <Button
            data-cy="modal-delete-cancel-button"
            text="Batal"
            @click="$emit('close')"
            color="bg-gray"
            class="text-black"
          />
          <Button
            data-cy="modal-delete-confirm-button"
            text="Hapus"
            @click="$emit('confirm')"
            color="bg-red"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Warning from "@/assets/svgs/Warning.svg?component";

const props = defineProps({
  modal: {
    type: Boolean,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
});

defineEmits(["close", "confirm"]);
</script>

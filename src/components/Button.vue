<template>
  <button
    class="py-4 px-7 font-semibold text-white rounded-full flex flex-row gap-2 disabled:cursor-not-allowed disabled:opacity-20"
    @click="$emit('click')"
    :disabled="disabled"
    :class="color"
  >
    <Plus :data-cy="icon ? 'tabler:plus' : ''" v-if="icon" />
    <span class="capitalize" v-text="text"></span>
  </button>
</template>

<script setup>
import Plus from "@/assets/svgs/Plus.svg?component";
import { onMounted } from "vue";

defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "bg-primary",
  },
});

defineEmits(["click"]);
</script>

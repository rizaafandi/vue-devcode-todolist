<template>
  <div
    class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-3"
  >
    <template v-for="(item, index) in data" :key="index">
      <div
        :data-cy="'activity-item-' + index"
        class="bg-white shadow-md hover:shadow-lg p-6 rounded-xl h-56 flex flex-col justify-between cursor-pointer"
        @click.self="router.push({ path: '/detail/' + item.id })"
      >
        <h1
          data-cy="activity-item-title"
          v-text="item.title"
          class="font-bold"
        ></h1>
        <div class="flex flex-row justify-between items-center">
          <span
            data-cy="activity-item-date"
            v-text="useFormat(item.created_at)"
            class="text-sm text-secondary"
          ></span>
          <div
            data-cy="activity-item-delete-button"
            @click="$emit('delete', item)"
            class="cursor-pointer hover:bg-gray rounded-full h-10 w-10 flex text-sm text-secondary"
          >
            <Delete data-cy="tabler:trash" class="m-auto" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import Delete from "@/assets/svgs/Delete.svg?component";
import { useFormat } from "@/utils";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  data: {
    type: Array,
  },
});

defineEmits(["delete"]);
</script>

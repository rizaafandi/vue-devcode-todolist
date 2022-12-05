<template>
  <div class="flex flex-col w-full gap-3">
    <template v-for="(item, index) in filteredData" :key="index">
      <div
        :data-cy="'todo-item-' + index"
        class="bg-white shadow-md hover:shadow-lg p-5 rounded-xl flex flex-row justify-between cursor-pointer"
        :class="item.is_active ? '' : 'text-gray'"
      >
        <div class="flex flex-row gap-4 items-center">
          <input
            data-cy="todo-item-checkbox"
            type="checkbox"
            :checked="!item.is_active"
            @change.self="$emit('close', item)"
            class="cursor-pointer"
          />
          <span
            data-cy="todo-item-priority-indicator"
            class="h-3 w-3 rounded-full"
            :class="GET_PRIRITIES(item.priority)"
          ></span>
          <del v-if="!item.is_active">
            <h1
              data-cy="todo-item-title"
              v-text="item.title"
              class="font-medium"
            ></h1>
          </del>
          <h1
            data-cy="todo-item-title"
            v-else
            v-text="item.title"
            class="font-medium"
          ></h1>
          <button
            data-cy="todo-item-edit-button"
            @click="$emit('edit', item)"
            class="cursor-pointer hover:bg-gray rounded-full h-10 w-10 flex"
          >
            <Edit class="m-auto" />
          </button>
        </div>
        <button
          data-cy="todo-item-delete-button"
          @click="$emit('delete', item)"
          class="cursor-pointer hover:bg-gray rounded-full h-10 w-10 flex"
        >
          <Delete class="m-auto" />
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import Delete from "@/assets/svgs/Delete.svg?component";
import Edit from "@/assets/svgs/Edit.svg?component";
import { computed } from "vue";
import _ from "lodash";

let props = defineProps({
  data: {
    type: Array,
  },
  filter: {
    type: String,
    required: true,
  },
});

defineEmits(["delete", "close", "edit"]);

const PRIRITIES = [
  {
    text: "Very High",
    value: "very-high",
    color: "bg-red",
  },
  {
    text: "High",
    value: "high",
    color: "bg-orange",
  },
  {
    text: "Medium",
    value: "medium",
    color: "bg-green",
  },
  {
    text: "Low",
    value: "low",
    color: "bg-blue",
  },
  {
    text: "Very Low",
    value: "very-low",
    color: "bg-purple",
  },
];
const GET_PRIRITIES = (str) => {
  return PRIRITIES.find((x) => x.value == str).color;
};
const filteredData = computed(() => {
  let f = props.filter,
    d = props.data;

  let data =
    f == "Terbaru"
      ? d.sort((a, b) => b.id - a.id)
      : f == "Terlama"
      ? d.sort((a, b) => a.id - b.id)
      : f == "A-Z"
      ? d.sort((a, b) => a.title.localeCompare(b.title))
      : f == "Z-A"
      ? d.sort((a, b) => b.title.localeCompare(a.title))
      : f == "Belum Selesai"
      ? d.sort((a, b) => b.is_active - a.is_active)
      : d;

  return data;
});
</script>

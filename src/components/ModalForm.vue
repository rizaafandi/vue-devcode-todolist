<template>
  <div
    class="fixed w-full h-full flex justify-center items-center z-50 top-0 bg-overlay"
    v-show="modal"
    @click.self="$emit('close')"
  >
    <div data-cy="modal-add" class="bg-white rounded-lg lg:w-5/12 w-10/12">
      <!-- header -->
      <div
        class="flex flex-row justify-between items-center border-b border-b-gray py-6 px-8"
      >
        <h2
          data-cy="modal-add-title"
          class="font-semibold text-lg capitalize"
          v-text="heading"
        ></h2>
        <button
          data-cy="modal-add-close-button"
          @click="$emit('close')"
          class="cursor-pointer hover:bg-gray rounded-full h-10 w-10 flex"
        >
          <Close class="m-auto" />
        </button>
      </div>

      <!-- content -->
      <div class="flex flex-col border-b border-b-gray py-6 px-8">
        <label class="block">
          <span
            data-cy="modal-add-name-title"
            class="font-semibold text-xs uppercase"
            >nama list item</span
          >
          <input
            data-cy="modal-add-name-input"
            type="text"
            class="p-2 block w-full mt-1 rounded-md shadow-sm border border-gray hover:bg-slate-100 focus:border focus:border-primary focus:border-opacity-50 text-sm"
            placeholder="Tambahkan nama list item"
            :value="title"
            @input="$emit('update:title', $event.target.value)"
          />
        </label>
        <label class="block mt-7 relative select-none">
          <span
            data-cy="modal-add-priority-title"
            class="font-semibold text-xs uppercase"
            >priority</span
          >
          <div
            class="lg:w-2/6 w-2/4 p-2 rounded-md border border-gray flex flex-row justify-between items-center text-sm cursor-pointer"
            @click="dropdown = !dropdown"
            :class="dropdown ? 'bg-neutral-100' : ' '"
          >
            <div class="flex flex-row gap-2 items-center">
              <span
                data-cy="modal-add-priority-item"
                v-if="priorities"
                class="h-3 w-3 rounded-full"
                :class="priorities.color"
              ></span>
              <span
                data-cy="modal-add-priority-item"
                class="whitespace-nowrap"
                v-text="priorities?.text ?? 'Pilih priority'"
              ></span>
            </div>
            <ArrowDown
              data-cy="tabler:chevron-down"
              :class="dropdown ? 'rotate-180' : ''"
            />
          </div>
          <!-- dropdown -->
          <div class="w-full relative">
            <div
              data-cy="modal-add-priority-dropdown"
              :class="dropdown ? 'absolute' : 'hidden'"
              class="lg:w-2/6 w-2/4 bg-white rounded-md"
            >
              <template v-for="(P, index) of PRIRITIES">
                <div
                  :data-cy="P.cy"
                  class="w-full p-2 z-10 hover:bg-slate-100 border border-gray flex flex-row justify-between items-center text-sm cursor-pointer"
                  :class="
                    index == 0
                      ? 'rounded-t-md'
                      : index == PRIRITIES.length - 1
                      ? 'rounded-b-md'
                      : ''
                  "
                  @click="
                    $emit('update:priority', P.value);
                    dropdown = false;
                  "
                >
                  <div
                    data-cy="modal-add-priority-item"
                    class="flex flex-row items-center gap-3 px-2 whitespace-nowrap"
                  >
                    <span class="h-3 w-3 rounded-full" :class="P.color"></span>
                    <span v-text="P.text"></span>
                  </div>
                  <CheckList v-if="P.value == priority" />
                </div>
              </template>
            </div>
          </div>
        </label>
      </div>

      <!-- action -->
      <div class="flex flex-row justify-end items-center border-b py-4 px-8">
        <Button
          data-cy="modal-add-save-button"
          text="Simpan"
          @click="$emit('confirm')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/Button.vue";

import Close from "@/assets/svgs/Close.svg?component";
import ArrowDown from "@/assets/svgs/ArrowDown.svg?component";
import CheckList from "@/assets/svgs/CheckList.svg?component";
import { computed, ref } from "vue";

const dropdown = ref(false);

const PRIRITIES = [
  {
    text: "Very High",
    value: "very-high",
    color: "bg-red",
    cy: "modal-add-priority-very-high",
  },
  {
    text: "High",
    value: "high",
    color: "bg-orange",
    cy: "modal-add-priority-high",
  },
  {
    text: "Medium",
    value: "medium",
    color: "bg-green",
    cy: "modal-add-priority-medium",
  },
  {
    text: "Low",
    value: "low",
    color: "bg-blue",
    cy: "modal-add-priority-low",
  },
  {
    text: "Very Low",
    value: "very-low",
    color: "bg-purple",
    cy: "modal-add-priority-very-low",
  },
];
const props = defineProps({
  modal: {
    type: Boolean,
    required: true,
  },
  heading: {
    type: String,
    default: "Tambah List Item",
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  priority: {
    type: String,
    required: true,
    default: "very-high",
  },
});

const priorities = computed(() => {
  return PRIRITIES.find((x) => x.value == props.priority);
});
defineEmits(["close", "confirm", "update:title", "update:priority"]);
</script>

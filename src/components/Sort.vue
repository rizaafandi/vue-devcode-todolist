<template>
  <div class="relative select-none">
    <button
      data-cy="todo-sort-button"
      class="cursor-pointer border-2 border-gray rounded-full h-14 w-14 flex"
      @click="dropdown = !dropdown"
    >
      <SortUndefined class="m-auto" />
    </button>
    <!-- dropdown -->
    <div class="w-96 bg-white absolute">
      <div
        data-cy="sort-parent"
        :class="dropdown ? 'absolute' : 'hidden'"
        class="lg:w-3/6 w-2/4 bg-white rounded-md"
      >
        <template v-for="(P, index) of SORTS">
          <div
            :data-cy="P.cy"
            class="w-full p-3 z-10 bg-white hover:bg-slate-100 border border-gray flex flex-row justify-between items-center text-sm cursor-pointer"
            :class="
              index == 0
                ? 'rounded-t-md'
                : index == SORTS.length - 1
                ? 'rounded-b-md'
                : ''
            "
            @click="
              $emit('update:sort', P.text);
              $emit('sort');
              dropdown = false;
            "
          >
            <div class="flex flex-row items-center gap-3 px-2 justify-between">
              <div class="flex flex-row items-center gap-2 whitespace-nowrap">
                <component :is="P.component" />
                <span v-text="P.text"></span>
              </div>
            </div>
            <CheckList v-if="sort == P.text" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import SortUndefined from "@/assets/svgs/SortUndefined.svg?component";
import SortAz from "@/assets/svgs/SortAz.svg?component";
import SortZa from "@/assets/svgs/SortZa.svg?component";
import SortLatest from "@/assets/svgs/SortLatest.svg?component";
import SortOld from "@/assets/svgs/SortOld.svg?component";
import CheckList from "@/assets/svgs/CheckList.svg?component";
import { onMounted, ref } from "vue";
const dropdown = ref(false);
const SORTS = [
  {
    text: "Terbaru",
    component: SortLatest,
    cy: "sort-selection",
  },
  {
    text: "Terlama",
    component: SortOld,
    cy: "sort-selection",
  },
  {
    text: "A-Z",
    component: SortAz,
    cy: "sort-selection",
  },
  {
    text: "Z-A",
    component: SortZa,
    cy: "sort-selection",
  },
  {
    text: "Belum Selesai",
    component: SortUndefined,
    cy: "sort-selection",
  },
];

defineProps({
  sort: {
    type: String,
  },
});
defineEmits(["update:sort", "sort"]);
onMounted(async () => {
  document.body.addEventListener(
    "click",
    () => {
      // dropdown.value = false;
    }
    // { capture: true }
  );
});
</script>

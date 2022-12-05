<template>
  <div class="lg:px-48 lg:py-14 sm:px-32 py-14 px-5 flex flex-col">
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row items-center justify-start gap-2">
        <button
          data-cy="todo-back-button"
          class="cursor-pointer hover:bg-gray rounded-full h-10 w-10 flex"
        >
          <Back class="m-auto" @click="router.back()" />
        </button>
        <h1
          data-cy="todo-title"
          class="capitalize font-bold lg:text-4xl text-2xl"
          v-text="isFetching ? 'Loading' : data?.title"
          v-if="!EDIT_TITLE"
          @click="EDIT_TITLE = true"
          id="todo-title"
        ></h1>
        <input
          v-if="EDIT_TITLE"
          type="text"
          class="p-3 mt-1 rounded-md shadow-sm border border-gray hover:bg-slate-100 focus:border focus:border-primary focus:border-opacity-50 text-sm"
          v-model="data.title"
          @input="data.title = $event.target.value"
          id="todo-title-input"
        />
        <button
          v-if="EDIT_TITLE"
          @click="executeEdit()"
          class="cursor-pointer hover:bg-gray rounded-full h-10 w-10 flex"
        >
          <CheckList class="m-auto" />
        </button>
        <button
          data-cy="todo-title-edit-button"
          v-if="!EDIT_TITLE"
          @click="EDIT_TITLE = true"
          class="cursor-pointer hover:bg-gray rounded-full h-10 w-10 flex"
        >
          <Edit class="m-auto" />
        </button>
      </div>
      <div class="flex flex-row items-center gap-2">
        <Sort v-model:sort="filter.sort" />
        <Button
          data-cy="todo-add-button"
          icon
          text="tambah"
          @click="MODAL_ADD_LIST = true"
        />
      </div>
    </div>
    <div class="flex justify-start items-center mt-10">
      <template v-if="isFetching">
        <div class="w-full text-center font-light text-2xl">Loading...</div>
      </template>
      <template v-else>
        <ActivityEmptyList
          data-cy="todo-empty-state"
          @click="MODAL_ADD_LIST = true"
          v-if="!data || !data.todo_items.length"
          class="w-auto lg:w-4/6 mx-auto"
        />
        <ActivityListItem
          v-else
          :data="data.todo_items"
          :filter="filter.sort"
          @delete="openModalDeleteItem"
          @close="executeCloseItem"
          @edit="openModalEditItem"
        />
      </template>
    </div>
  </div>

  <AlertInfo :modal="MODAL_INF" />
  <ModalDelete
    :modal="MODAL_DEL"
    @close="MODAL_DEL = false"
    :title="data?.title"
    heading="Apakah anda yakin menghapus activity"
    @confirm="executeDelete()"
  />
  <ModalDelete
    :modal="MODAL_DEL_LIST"
    @close="MODAL_DEL_LIST = false"
    :title="MODAL_FORM?.title"
    heading="Apakah anda yakin menghapus List Item"
    @confirm="executeDeleteItem()"
  />
  <ModalForm
    :modal="MODAL_ADD_LIST"
    :heading="MODAL_FORM.id ? 'edit list item' : 'tambah list item'"
    @close="
      MODAL_ADD_LIST = false;
      MODAL_FORM = {};
    "
    @confirm="executeAddItem()"
    v-model:title="MODAL_FORM.title"
    v-model:priority="MODAL_FORM.priority"
  />
</template>

<script setup>
import ActivityEmptyList from "@/assets/svgs/ActivityEmptyList.svg?component";
import Back from "@/assets/svgs/Back.svg?component";
import CheckList from "@/assets/svgs/CheckList.svg?component";
import Edit from "@/assets/svgs/Edit.svg?component";

import Button from "@/components/Button.vue";
import ActivityListItem from "@/components/ActivityListItem.vue";
import Sort from "@/components/Sort.vue";
import AlertInfo from "@/components/AlertInfo.vue";
import ModalDelete from "@/components/ModalDelete.vue";
import ModalForm from "@/components/ModalForm.vue";

import { useRouter } from "vue-router";
import { api } from "@/utils";
import { onMounted, reactive, ref } from "vue";

const router = useRouter();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const MODAL_INF = ref(false);
const MODAL_DEL = ref(false);
const MODAL_DEL_LIST = ref(false);
const MODAL_ADD_LIST = ref(false);
const EDIT_TITLE = ref(false);
const MODAL_FORM = ref({});

const {
  execute: getDetail,
  data,
  isFetching,
} = api(`/activity-groups/${props.id}`, {
  immediate: false,
})
  .get()
  .json();

const executeEdit = async () => {
  const { execute, isFetching: patchFetching } = api(
    `/activity-groups/${props.id}`,
    {
      immediate: false,
    }
  ).patch({
    title: data.value?.title,
  });
  await execute().then(async () => {
    await getDetail();
    EDIT_TITLE.value = false;
  });
};

onMounted(async () => {
  await getDetail();

  document.body.addEventListener(
    "click",
    () => {
      MODAL_INF.value = false;
    },
    {
      capture: true,
    }
  );
});

//

const filter = reactive({
  sort: "Terbaru",
});

const openModalDeleteItem = async (obj) => {
  MODAL_DEL_LIST.value = true;
  MODAL_FORM.value = obj;
};

const executeDeleteItem = async () => {
  const { execute } = api("/todo-items/" + MODAL_FORM.value.id, {
    immediate: false,
  }).delete();

  MODAL_DEL_LIST.value = false;
  await execute().then(async () => {
    MODAL_INF.value = true;
    MODAL_FORM.value = {};
    await getDetail();
  });
};

const executeCloseItem = async (list) => {
  const { execute } = api("/todo-items/" + list.id, {
    immediate: false,
  }).patch({
    is_active: list.is_active == 1 ? 0 : 1,
  });

  await execute().then(async () => {
    await getDetail();
  });
};

const executeAddItem = async () => {
  if (MODAL_FORM.value.id) {
    const { execute } = api("/todo-items/" + MODAL_FORM.value.id, {
      immediate: false,
    }).patch({
      title: MODAL_FORM.value.title,
      priority: MODAL_FORM.value.priority,
    });

    await execute().then(async () => {
      await getDetail();
      MODAL_ADD_LIST.value = false;
      MODAL_FORM.value = {};
    });
  } else {
    const { execute } = api("/todo-items/", {
      immediate: false,
    }).post({
      activity_group_id: props.id,
      title: MODAL_FORM.value.title,
      priority: MODAL_FORM.value.priority,
    });

    await execute().then(async () => {
      await getDetail();
      MODAL_ADD_LIST.value = false;
      MODAL_FORM.value = {};
    });
  }
};

const openModalEditItem = async (obj) => {
  MODAL_ADD_LIST.value = true;
  MODAL_FORM.value = { ...obj };
};
</script>

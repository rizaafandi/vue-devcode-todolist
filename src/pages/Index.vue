<template>
  <div class="lg:px-48 lg:py-14 py-14 px-5 flex flex-col">
    <div class="flex flex-row justify-between items-center">
      <h1
        data-cy="activity-title"
        class="capitalize font-bold lg:text-4xl text-2xl"
      >
        Activity
      </h1>
      <Button
        data-cy="activity-add-button"
        icon
        text="Tambah"
        @click="postData().then(async () => await getData())"
      />
    </div>
    <div class="flex justify-start items-center mt-10">
      <template v-if="isFetching">
        <div class="w-full text-center font-light text-2xl">Loading...</div>
      </template>
      <template v-else>
        <ActivityEmptyState
          data-cy="activity-empty-state"
          v-show="!data || !data.data.length"
          class="w-auto lg:w-4/6 m-auto"
          @click="postData().then(async () => await getData())"
        />
        <ActivityList
          data-cy="activity-item"
          v-show="data || data?.data?.length"
          :data="data ? data.data : []"
          @delete.self="openModalDelete"
        />
      </template>
    </div>
  </div>

  <AlertInfo :modal="MODAL_INF" />
  <ModalDelete
    :modal="MODAL_DEL"
    :title="MODAL_FORM.title"
    heading="Apakah anda yakin menghapus activity"
    @close="MODAL_DEL = false"
    @confirm="executeDelete()"
  />
</template>

<script setup>
import ActivityEmptyState from "@/assets/svgs/ActivityEmptyState.svg?component";

import Button from "@/components/Button.vue";
import ActivityList from "@/components/ActivityList.vue";
import { api } from "@/utils";
import { onMounted, reactive, ref } from "vue";
import AlertInfo from "@/components/AlertInfo.vue";
import ModalDelete from "@/components/ModalDelete.vue";

const EMAIL = import.meta.env.VITE_BASE_EMAIL;
const MODAL_INF = ref(false);
const MODAL_DEL = ref(false);
const MODAL_FORM = ref({
  title: "",
  id: "",
});

const {
  execute: getData,
  isFetching,
  data,
} = api(`/activity-groups?email=${EMAIL}`, {
  immediate: false,
})
  .get()
  .json();

const { execute: postData } = api("/activity-groups", {
  immediate: false,
}).post({
  title: "New Activity",
  email: EMAIL,
});

const openModalDelete = async (obj) => {
  MODAL_DEL.value = true;
  MODAL_FORM.value = obj;
};

const executeDelete = async () => {
  const { execute } = api("/activity-groups/" + MODAL_FORM.value.id, {
    immediate: false,
  }).delete();

  MODAL_DEL.value = false;
  await execute().then(async () => {
    MODAL_INF.value = true;
    MODAL_FORM.value = {
      ...MODAL_FORM.value,
      title: "",
      id: "",
    };
    await getData();
  });
};

onMounted(async () => {
  await getData();

  document.body.addEventListener(
    "click",
    () => {
      MODAL_INF.value = false;
    },
    {
      // capture: true,
    }
  );

  // document
  //   .querySelector(".vue-universal-modal")
  //   ?.addEventListener("click", () => {
  //     MODAL_DEL.value = false;
  //   });
});
</script>

<script setup lang="ts">
import { groupBy, orderBy } from "lodash-es";
import { computed } from "vue";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";

import AscentDateGroup from "@/components/logbook/ascent/AscentDateGroup.vue";
import { useLogbookAscentStore } from "@/stores";

const props = defineProps<{ recent: boolean }>();

const ascentStore = useLogbookAscentStore();

const ordered = computed(() =>
  orderBy(ascentStore.tree, ["date", "date_added"], ["desc", "desc"]),
);
const grouped = computed(() =>
  groupBy(props.recent ? ordered.value.slice(0, 5) : ordered.value, "date"),
);

const foo = computed(() =>
  Object.values(grouped.value).map((item, index) => ({
    id: index,
    data: item,
  })),
);
</script>

<template>
  <section>
    <h1>{{ props.recent ? "Latest ascents" : "Your ascents" }}</h1>
    <DynamicScroller
      v-if="!props.recent"
      page-mode
      :items="foo"
      :min-item-size="72"
      class="scroller"
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :data-index="index"
        >
          <AscentDateGroup :ascents="item.data" />
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>

    <AscentDateGroup
      v-for="ascents in grouped"
      v-else
      :key="ascents[0].date"
      :ascents="ascents"
    />
    <RouterLink
      v-if="props.recent"
      key="logbook"
      class="link"
      :to="{ name: 'ascents' }"
    >
      show all ascents
    </RouterLink>
  </section>
</template>

<style scoped>
.scroller {
  height: 100%;
  overflow-y: auto;
}

section {
  container: ascents / inline-size;
}

.link {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}
</style>

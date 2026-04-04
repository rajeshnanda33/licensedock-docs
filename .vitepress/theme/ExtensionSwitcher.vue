<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useData, useRouter, useRoute } from 'vitepress'

interface Extension {
  text: string
  link: string
}

const { theme } = useData()
const router = useRouter()
const route = useRoute()

const extensions = computed<Extension[]>(() => theme.value.extensions ?? [])

const open = ref(false)
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const current = computed(() => {
  const path = route.path
  return extensions.value.find(e => path.startsWith(e.link)) ?? null
})

const filtered = computed(() => {
  if (!query.value) return extensions.value
  const q = query.value.toLowerCase()
  return extensions.value.filter(e => e.text.toLowerCase().includes(q))
})

watch(query, () => {
  activeIndex.value = 0
})

function toggle() {
  open.value = !open.value
  if (open.value) {
    query.value = ''
    activeIndex.value = 0
    nextTick(() => inputRef.value?.focus())
  }
}

function close() {
  open.value = false
  query.value = ''
}

function select(ext: Extension) {
  router.go(ext.link)
  close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, filtered.value.length - 1)
    scrollToActive()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
    scrollToActive()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (filtered.value[activeIndex.value]) {
      select(filtered.value[activeIndex.value])
    }
  } else if (e.key === 'Escape') {
    close()
  }
}

function scrollToActive() {
  nextTick(() => {
    const el = listRef.value?.children[activeIndex.value] as HTMLElement
    el?.scrollIntoView({ block: 'nearest' })
  })
}

function onClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    close()
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div class="ext-switcher" ref="containerRef" @click.prevent.stop>
    <button class="ext-switcher-btn" @click="toggle" :aria-expanded="open">
      <span class="ext-switcher-label">{{ current?.text ?? 'Extensions' }}</span>
      <svg class="ext-switcher-chevron" :class="{ open }" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div v-if="open" class="ext-switcher-dropdown">
      <div class="ext-switcher-search">
        <input
          ref="inputRef"
          v-model="query"
          placeholder="Search extensions..."
          @keydown="onKeydown"
        />
      </div>
      <ul ref="listRef" class="ext-switcher-list" role="listbox">
        <li
          v-for="(ext, i) in filtered"
          :key="ext.link"
          :class="['ext-switcher-item', { active: i === activeIndex, current: ext.link === current?.link }]"
          role="option"
          :aria-selected="ext.link === current?.link"
          @mouseenter="activeIndex = i"
          @click="select(ext)"
        >
          <span>{{ ext.text }}</span>
          <svg v-if="ext.link === current?.link" class="ext-switcher-check" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </li>
        <li v-if="filtered.length === 0" class="ext-switcher-empty">No extensions found</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.ext-switcher {
  position: relative;
  margin-left: 12px;
}

.ext-switcher-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
  white-space: nowrap;
}

.ext-switcher-btn:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-mute);
}

.ext-switcher-chevron {
  transition: transform 0.2s;
  opacity: 0.6;
}

.ext-switcher-chevron.open {
  transform: rotate(180deg);
}

.ext-switcher-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 100;
  min-width: 240px;
  max-height: 360px;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ext-switcher-search {
  padding: 8px;
  border-bottom: 1px solid var(--vp-c-border);
}

.ext-switcher-search input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.ext-switcher-search input:focus {
  border-color: var(--vp-c-brand-1);
}

.ext-switcher-search input::placeholder {
  color: var(--vp-c-text-3);
}

.ext-switcher-list {
  list-style: none;
  margin: 0;
  padding: 4px;
  overflow-y: auto;
  max-height: 280px;
}

.ext-switcher-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background-color 0.15s;
}

.ext-switcher-item.active {
  background: var(--vp-c-bg-soft);
}

.ext-switcher-item.current {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.ext-switcher-check {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.ext-switcher-empty {
  padding: 12px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  text-align: center;
}

@media (max-width: 768px) {
  .ext-switcher {
    margin-left: 8px;
  }

  .ext-switcher-btn {
    font-size: 12px;
    padding: 3px 8px;
  }

  .ext-switcher-dropdown {
    min-width: 200px;
    left: -40px;
  }
}
</style>

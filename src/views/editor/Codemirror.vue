<template>
  <div>
    <PageHeader title="Codemirror">
      <a href="https://gitcode.net/mirrors/surmon-china/vue-codemirror" target="_blank"
        >vue-codemirror
      </a>
    </PageHeader>
    <div class="mx-4">
      <el-tabs @tab-change="changeMode">
        <el-tab-pane v-for="item in modeList" :label="item.lan"></el-tab-pane>
      </el-tabs>
      <codemirror
        v-model="code"
        placeholder="Code gose here..."
        :lineNumbers="false"
        :style="{ height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tabSize="2"
        :extensions="extensions"
        @ready="log('ready', $event)"
        @change="log('change', $event)"
        @focus="log('focus', $event)"
        @blur="log('blur', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'
import { ref } from 'vue'

const modeList = [
  { lan: 'javascript', ex: javascript() },
  { lan: 'css', ex: css() },
  { lan: 'html', ex: html() },
  { lan: 'python', ex: python() }
]

const code = ref(`console.log('Hello, world!')`)
const extensions = ref([python(), oneDark])

function log(str: string, event: Event) {
  console.log(str)
}

function changeMode(e: number) {
  extensions.value = [modeList[e].ex, oneDark]
}
</script>

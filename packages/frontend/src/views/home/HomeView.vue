<script setup lang="ts">
import Navbar from '../../components/navbar.vue'
import { Repl } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'
</script>
<template>
  <Navbar></Navbar>
  <div class="bg-white px-2 h-[calc(100vh-50px)]">
    <Repl :editor="Monaco" />
  </div>
</template>

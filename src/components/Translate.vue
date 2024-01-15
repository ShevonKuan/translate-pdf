<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    selectedText: String
})
watch(() => props.selectedText, (value) => {
    console.log(value)
})

console.log(props.selectedText)


onMounted(() => {


});

// get title

// .on('change', function () {
//     var title = (pdfViewer as HTMLIFrameElement).contentWindow.PDFViewerApplication._title
//     emit('getTitle', title)
//     console.log(title)
// }, true);
</script>

<template>

<div class="translate-field" mdui-prose>

   <mdui-divider middle></mdui-divider>
123
   <mdui-card clickable variant="outlined" class="translate-field">{{ selectedText }}</mdui-card></div>
</template>


<style scoped>
.translate-field {
   font-size: small;
   width:100%;
   height: 100%;
   padding: 10px;
   overflow: auto;
}
</style>

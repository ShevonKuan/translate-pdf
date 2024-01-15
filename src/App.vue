<script setup lang="ts">

import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import PdfView from "@/components/PdfViewer.vue";
import Theme from '@/components/Theme.vue'
import Translate from '@/components/Translate.vue'
// 选中文本
let selectedText = ref("");
const getSelectedText = (text: string) => {
    selectedText.value = text;
    // console.log(text);
};

// pagesNum
let pagesNum = ref({ currentPage: 1, totalPage: 2 });
const getPagesNum = (n: JSON) => {
    pagesNum.value = n;
};
// title
let title = ref("");
const getTitle = (text: string) => {
    title.value = text;
    // console.log(text);
};



// selected tabs
let selectedTab = ref("1");



</script>

<template>
    <!-- Main Layout -->
    <mdui-top-app-bar variant="small" scrolling>
        <mdui-button-icon icon="menu"></mdui-button-icon>

        <mdui-top-app-bar-title>
            {{ title }}
        </mdui-top-app-bar-title>
        <div style="flex-grow: 1"></div>
        <Theme />
        <mdui-button-icon icon="more_vert"></mdui-button-icon>
    </mdui-top-app-bar>
    <mdui-linear-progress :value="pagesNum['currentPage'] - 1" :max="pagesNum['totalPage'] - 1" style="
                position: fixed;
                display: inline-block;
                width: 100%;
                top: 4rem;
                left: 0px;
                right: 0px;
                height: 0.25rem;
                background-color: transparent;
            "></mdui-linear-progress>

    <div class="container">
        <PdfView url="/public/pdfjs/web/compressed.tracemonkey-pldi-09.pdf" @getSelectedText="getSelectedText"
            @getTitle="getTitle" @getPagesNum="getPagesNum" class="left" />

        <div class="right mdui-prose">
            <mdui-tabs full-width value="1" @change="selectedTab=$event.target.value" >
                <mdui-tab value="1">翻译</mdui-tab>
                <mdui-tab value="2">历史</mdui-tab>
            </mdui-tabs>
            <div class="side-container">
                <Translate v-if="selectedTab=='1'" :selected-text="selectedText" />
            </div>
        </div>

    </div>
</template>

<style scoped>
.container {
    flex: 1;
    width: 100%;
    display: flex;
    overflow-y: hidden;
    flex-wrap: wrap;
    height: calc(100vh - 5rem);
    flex-direction: column;
}
.side-container {
    height: 100%;
    overflow-y: auto;
    padding: 1rem;
}
.container .left {
    width: 65%;
    height: 100%;

}

.container .right {
    width: 30%;
    height: 100%;
    padding: 1rem;
}

/* 在移动设备上改为列布局 */
@media (max-width: 768px) {
    .container {
        flex-direction: row;
    }

    .container .left {
        width: 100%;
        height: 70%;
    }

    .container .right {
        width: 100%;
        height: 30%;
    }
}</style>

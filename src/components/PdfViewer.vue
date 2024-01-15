<script setup lang="ts">
import { onMounted, ref } from 'vue';
interface Props {
    url: string; // pdf文件地址
}
const props = defineProps<Props>();
const pdfUrl = ref(''); // pdf文件地址
const fileUrl = '/pdfjs/web/viewer.html?file='; // pdfjs文件地址

// 传回选中文本
const emit = defineEmits(['getSelectedText','getTitle','getPagesNum']);



onMounted(() => {
    // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
    // 核心就是将 iframe 的 src 属性设置为 pdfjs 的地址，然后将 pdf 文件的地址作为参数传递给 pdfjs
    // 例如：http://localhost:8080/pdfjs-4.0.189-dist/web/viewer.html?file=http%3A%2F%2Flocalhost%3A8080%2Fpdf%2Ftest.pdf
    pdfUrl.value = fileUrl + encodeURIComponent(props.url);

    // 监听 pdfjs 的文本选中事件
    let pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.addEventListener('load', () => {
        (pdfViewer as HTMLIFrameElement).contentWindow.addEventListener('mouseup', function () {
            var selectedText = (pdfViewer as HTMLIFrameElement).contentWindow.getSelection().toString();
            if (selectedText.length <= 1)
                return;
            selectedText = selectedText.replace(/[\.][\r\n]/g, "\t").replace(/[-][\r\n]/g, "").replace(/[\r\n]/g, " ").replace(/[\t]/g, ".\n ");
            emit('getSelectedText', selectedText);
        }, true);
        emit('getTitle', (pdfViewer as HTMLIFrameElement).contentWindow.PDFViewerApplication._title);

        (pdfViewer as HTMLIFrameElement).contentWindow.PDFViewerApplication.eventBus.on('pagechanging', function (event) {
            // 获取当前页面
            var currentPage = event.pageNumber;
            // 获取总页数
            var totalPage = (pdfViewer as HTMLIFrameElement).contentWindow.PDFViewerApplication.pagesCount;
            emit('getPagesNum', { currentPage, totalPage });

        });
        (pdfViewer as HTMLIFrameElement).contentWindow.PDFViewerApplication.eventBus.on('fileinputchange', function (event) {
            // 获取打开的文件
            var file = event.fileInput.files[0];

            // 获取文件名
            var fileName = file.name;
            emit('getTitle', fileName);
        });
    });
    
});

// get title

// .on('change', function () {
//     var title = (pdfViewer as HTMLIFrameElement).contentWindow.PDFViewerApplication._title
//     emit('getTitle', title)
//     console.log(title)
// }, true);
</script>

<template>
        <iframe :src="pdfUrl" width="100%" οnlοad="javascript:this.height=this.contentWindow.document.body.scrollHeight+30;" id="pdfViewer" class="pdfViewer"></iframe>
</template>

<style scoped>

.pdfViewer {
    border: inherit;
}
</style>

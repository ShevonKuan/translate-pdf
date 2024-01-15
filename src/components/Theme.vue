<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { setColorScheme } from "mdui";

const presetColors = ['red', 'purple', 'blue', 'green', 'yellow', 'grey'];

const handleColorClick = (color) => {
    const element = document.querySelector(`.color-preset .${color}`);
    const computedStyle = window.getComputedStyle(element);
    const backgroundColor = computedStyle.getPropertyValue('background-color');
    // theme
    setColorScheme(rgbToHex(backgroundColor), { target: window.document.documentElement });
};

const handleCustomColorChange = (event) => {
    const color = event.target.value;
    // theme
    setColorScheme(color, { target: window.document.documentElement });
};

const rgbToHex = (rgbColor) => {
    // 将rgb颜色值转换为十六进制值
    const match = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
        return rgbColor;
    }
    const hex = (x) => {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    };
    return "#" + hex(match[1]) + hex(match[2]) + hex(match[3]);
};

onMounted(() => {
    // theme
    setColorScheme("#129821", { target: window.document.documentElement });
});

</script>

<template>
    <mdui-dropdown stay-open-on-click class="color-scheme" trigger="click" placement="auto" open-delay="150"
        close-delay="150">
        <mdui-button-icon slot="trigger" class="icon" name="" value="" type="button" variant="standard">
            <mdui-icon name="palette--outlined" class="outlined"></mdui-icon>
        </mdui-button-icon>
        <mdui-card class="card" variant="elevated">

            <div class="color-label">预设颜色</div>
            
            <div class="color-preset">
                <div v-for="(color, index) in presetColors" :key="index" :class="color" @click="handleColorClick(color)"></div>
            </div>
            <div class="color-label">自选颜色</div><input type="color" class="color-custom" @input="handleCustomColorChange($event)">
        </mdui-card>
    </mdui-dropdown>
</template>

<style scoped>
.card {
    padding: 1rem;
}

.color-label {
    cursor: default;
    color: rgb(var(--mdui-color-on-surface-variant));
    font-size: var(--mdui-typescale-title-small-size);
    font-weight: var(--mdui-typescale-title-small-weight);
    letter-spacing: var(--mdui-typescale-title-small-tracking);
    line-height: var(--mdui-typescale-title-small-line-height)
}

.color-label:not(:first-child) {
    margin-top: .5rem
}

.color-preset {
    display: flex;
    padding: 0.5rem 0rem;
    justify-content: space-around;
}

.color-preset div {
    cursor: pointer;
    box-sizing: border-box;
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 5%;
    border: 0.0625rem solid rgb(var(--mdui-color-outline));
    
}

.color-custom {
    cursor: pointer;
    box-sizing: border-box;
    width: 1.875rem;
    height: 1.875rem;
    border-radius: var(--mdui-shape-corner-extra-small);
    border: 0.0625rem solid rgb(var(--mdui-color-outline));
    margin: 0.5rem 0rem;
}

.color-preset {
    display: flex;
    padding: .5rem 0rem
}

.color-preset div {
    cursor: pointer;
    box-sizing: border-box;
    width: 1.875rem;
    height: 1.875rem;
    border-radius: var(--mdui-shape-corner-extra-small);
    border: .0625rem solid rgb(var(--mdui-color-outline))
}

.color-preset div+div {
    margin-left: .5rem
}

.color-preset .red {
    background-color: #bb1614
}

.color-preset .purple {
    background-color: #9a25ae
}

.color-preset .blue {
    background-color: #0061a4
}

.color-preset .green {
    background-color: #006e1c
}

.color-preset .yellow {
    background-color: #695f00
}

.color-preset .grey {
    background-color: #006874
}

.mdui-theme-dark .color-preset .red {
    background-color: #ffb4aa
}

.mdui-theme-dark .color-preset .purple {
    background-color: #f9abff
}

.mdui-theme-dark .color-preset .blue {
    background-color: #9ecaff
}

.mdui-theme-dark .color-preset .green {
    background-color: #78dc77
}

.mdui-theme-dark .color-preset .yellow {
    background-color: #dbc90a
}

.mdui-theme-dark .color-preset .grey {
    background-color: #4fd8eb
}

@media (prefers-color-scheme: dark) {
    .mdui-theme-auto .color-preset .red {
        background-color:#ffb4aa
    }

    .mdui-theme-auto .color-preset .purple {
        background-color: #f9abff
    }

    .mdui-theme-auto .color-preset .blue {
        background-color: #9ecaff
    }

    .mdui-theme-auto .color-preset .green {
        background-color: #78dc77
    }

    .mdui-theme-auto .color-preset .yellow {
        background-color: #dbc90a
    }

    .mdui-theme-auto .color-preset .grey {
        background-color: #4fd8eb
    }
}





</style>

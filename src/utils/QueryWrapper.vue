<template>
<div v-if="loading">
    <div class="loading-overlay">
        <Loading />
        <div class="preload">
            <div class="loading-text">{{ loadingText }}</div>
            <div class="loading-dot"><span class="dot dot1">.</span><span class="dot dot2">.</span><span class="dot dot3">.</span></div>
        </div>
    </div>
</div>
<template v-if="error" id="modal-template">
    <div class="modal">
        <div class="modal-content">
            <p>An error occurred while fetching the data.</p>
            <button @click="error = false">Close</button>
        </div>
    </div>
</template>
<slot v-else :data="data" :loaded="!loading" />
</template>

<script>
import Loading from '../utils/Loading';
import axios from 'axios'
import {
    reactive,
    toRefs
} from 'vue'
import {
    setPageTitle
} from '@/utils/title';
import {
    ls
} from 'vue-lsp'

export default {
    name: 'QueryWrapper',
    props: {
        url: {
            type: String,
            required: true,
        },
        loadingText: {
            type: String,
            default: 'Loading data...',
        },
        mode: {
            type: String,
            default: 'single',
        },
        pageName: {
            type: String,
            default: 'หน้าเว็บ',
        },
    },
    components: {
        Loading,
    },
    setup(props) {
        const state = reactive({
            loading: true,
            error: false,
            data: null,
        })

        const checkData = async () => {
            try {
                setPageTitle("Loading....");
                state.loading = true
                //document.body.style.overflow = 'hidden';
                let headers = {};
                const token = ls.get("token");
                if (token) {
                    headers.Authorization = 'Bearer ' + token;
                }

                const response = await axios.get(props.url, {
                    headers
                });
                state.loading = false
                //document.body.style.overflow = '';

                if (props.mode === 'single') {
                    state.data = response.data
                    state.format = state.data.data
                    setPageTitle(state.format.name);
                    console.log(state.data)
                } else {
                    state.data = response.data.data
                    state.data.sort(function (a, b) {
                        return a.order < b.order ? -1 : 1
                    });
                    setPageTitle(props.pageName);
                }
            } catch (error) {
                console.error(error)
                state.error = true
            }
        }

        checkData()

        return {
            ...toRefs(state),
            watch: {
                url: {
                    handler: checkData,
                    immediate: true,
                },
            },
        }
    },
}
</script>

<style>
.loader {
    width: 64px;
    height: 44px;
    position: relative;
    border: 5px solid #000;
    border-radius: 8px;
}

.loader::before {
    content: '';
    position: absolute;
    border: 5px solid #000;
    width: 32px;
    height: 28px;
    border-radius: 50% 50% 0 0;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%)
}

.loader::after {
    content: '';
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #000;
    box-shadow: 16px 0 #000, -16px 0 #000;
    animation: flash 0.5s ease-out infinite alternate;
}

@keyframes flash {
    0% {
        background-color: rgba(0, 0, 0, 0.25);
        box-shadow: 16px 0 rgba(0, 0, 0, 0.25), -16px 0 rgba(0, 0, 0, 1);
    }

    50% {
        background-color: rgba(0, 0, 0, 1);
        box-shadow: 16px 0 rgba(0, 0, 0, 0.25), -16px 0 rgba(0, 0, 0, 0.25);
    }

    100% {
        background-color: rgba(0, 0, 0, 0.25);
        box-shadow: 16px 0 rgba(0, 0, 0, 1), -16px 0 rgba(0, 0, 0, 0.25);
    }
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.spinner {
    width: 100px;
    height: 100px;
    border: 4px solid #fff;
    border-radius: 50%;
    border-top-color: #3498db;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>

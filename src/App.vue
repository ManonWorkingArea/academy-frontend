<script>

import Default 	from './interface/layout/Default.vue';
import Fullscreen 	from './interface/layout/Fullscreen.vue';
import Blank 	from './interface/layout/Blank.vue';

export default {
	components: {
		'Default': Default,
		'Fullscreen': Fullscreen,
    'Blank': Blank,
	},
	data() {
    return {
      layout: 'Default',
    };
  },
  created() {
    this.layout = this.$route.meta.layout;
  },
  watch: {
    $route(to) {
      this.layout = to.meta.layout;
    },
  },
};
</script>

<template>
<component v-bind:is="layout"></component>
</template>

<style>
#app {}
.vue-back-to-top {
@apply p-2 bg-indigo-500 hover:bg-indigo-600 text-white transition
duration-500
ease-in-out
transform
hover:-translate-y-1 hover:scale-110;
border-radius: 50%;
font-size: 22px;
line-height: 22px;
}
.fade-enter-active {
animation: coming 0.4s;
animation-delay: 0.2s;
opacity: 0;
}
.fade-leave-active {
animation: going 0.4s;
}

.feather-16{
    width: 16px;
    height: 16px;
}

.feather-22{
    width: 22px;
    height: 22px;
}

.feather-24{
    width: 24px;
    height: 24px;
}

.feather-32{
    width: 32px;
    height: 32px;
}

@keyframes going {
from {
transform: translateX(0);
}
to {
transform: translateX(-10px);
opacity: 0;
}
}
@keyframes coming {
from {
transform: translateX(-10px);
opacity: 0;
}
to {
transform: translateX(0px);
opacity: 1;
}
}

.isblock
{
	pointer-events: none;
	cursor: progress;
}

.isblock:before {
	content: 'กำลังโหลดข้อมูล.....';
    opacity: 1;
    position: absolute;
    margin-left: 100px;
    margin-top: 90px;
    background: #000;
    color: #fff;
    padding: 5px 20px 5px 20px;
	z-index: 999;
}

div.isblock.container{
	opacity: 0.6;
}

.swal2-popup.swal2-toast .swal2-title {
    margin: 0.1em 1em !important;
}


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
  transform: translate(-50% , -100%)

}
.loader::after {
  content: '';
  position: absolute;
  transform: translate(-50% , -50%);
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
    background-color: rgba(255, 255, 255, 1);
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
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
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

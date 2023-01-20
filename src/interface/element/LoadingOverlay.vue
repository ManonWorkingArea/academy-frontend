<template>
    <div v-if="showOverlay" class="loading-overlay">
      <div class="spinner"></div>
      <div v-if="!error" class="loading-text">{{ text }}</div>
      <div v-else class="error-text">{{ text }}</div>
      <button v-if="error && internalKeepError" @click="handleCloseOverlay" class="close-button">Close</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      text: {
        type: String,
        required: false,
        default: 'Loading...',
      },
      error: {
        type: Boolean,
        required: false,
        default: false,
      },
      keepError: {
        type: Boolean,
        required: false,
        default: false,
      },
      closeOverlay: {
        type: Function,
        required: false,
      },
    },
    computed: {
        showOverlay() {
        return this.error && this.keepError;
        },
    },
    watch: {
        keepError(newValue) {
        this.internalKeepError = newValue;
        },
    },
    methods: {
    handleCloseOverlay() {
        console.log("Close");
      this.internalKeepError = false;
      if (this.closeOverlay) {
        this.closeOverlay();
      }
    },
  },
  }
  </script>
  <style>
  .loader2 {
    width: 96px;
    height: 16px;
    display: inline-block;
    background-color: #FFF;
    border: 1px solid #FFF;
    border-radius: 4px;
    background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.25) 75%, transparent 75%, transparent);
    font-size: 30px;
    background-size: 1em 1em;
    box-sizing: border-box;
    animation: barStripe 1s linear infinite;
  }
  
  @keyframes barStripe {
    0% {
      background-position: 1em 0;
    }
    100% {
      background-position: 0 0;
    }
  }
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 0.6s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .error-text {
    color: #f00;
  }
  
  .close-button {
    margin-top: 10px;
    background-color: #333;
    border: none;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }

  .loading-text,
.error-text {
  margin-top: 10px;
  font-size: 18px;
  color: #fff;
  text-align: center;
}

  </style>
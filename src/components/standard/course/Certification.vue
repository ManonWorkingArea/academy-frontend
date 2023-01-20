<template>
    <div class="container mx-auto p-4 bg-gray-300 rounded-lg shadow-lg certification">
      <div class="text-2xl font-bold mb-4">Certification of Completion</div>
      <div class="text-lg font-semibold mb-4">This certifies that</div>
      <div class="text-xl font-bold mb-4">{{ name }}</div>
      <div class="text-lg font-semibold mb-4">has completed the course</div>
      <div class="text-xl font-bold mb-4">{{ className }}</div>
      <div class="mb-4">
        <img :src="image" alt="Profile picture" class="rounded-full w-32 h-32">
      </div>
      <div>
        <img :src="qrCode" alt="QR code" class="w-32 h-32">
      </div>
    </div>
  </template>
  
  <style>
    /* Use Tailwind CSS to style your certification */
  </style>
  
  <script>
  
  export default {
    data() {
      return {
        name: 'John Doe',
        className: 'Vue.js Fundamentals',
        image: 'https://via.placeholder.com/150',
        qrCode: 'https://via.placeholder.com/150'
      }
    }
  }
  </script>
  
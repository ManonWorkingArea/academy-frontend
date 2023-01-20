<script>
import feather from 'feather-icons';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
	name: 'Home',
  components: { Carousel,
    Slide,
    Pagination,
    Navigation, },
	data: () => {
		return {
			theme: '',
      images: [
        "https://picsum.photos/id/1/1920/768",
        "https://picsum.photos/id/2/1920/768",
        "https://picsum.photos/id/3/1920/768"
        ],
        active: 0
		};
	},
	created() {
		this.theme = localStorage.getItem('theme') || 'light';
	},
	mounted() {
		feather.replace();
		this.theme = localStorage.getItem('theme') || 'light';
	},
	updated() {
		feather.replace();
	},
	methods: {},
};
</script>

<template>

  <div class="relative bg-white">
    <main class="lg:relative">
      <Carousel>
        <Slide v-for="(slide,index) in images" :key="slide">
          <div class="carousel__item">

            <div class="absolute px-4 sm:px-8 lg:w-1/2 xl:pr-16 z-10">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span class="block xl:inline">Data to enrich your - {{index}}</span>
                <span class="block text-indigo-600 xl:inline">online business</span>
              </h1>
              <p class="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
              
              <div class="mx-auto mt-10 sm:flex sm:justify-center lg:justify-start text-center max-w-md">
                <div class="rounded-md shadow">
                  <a href="#" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg">Get started</a>
                </div>
                <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a href="#" class="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg">Live demo</a>
                </div>
              </div>

            </div>
            
            <div class="my-cool-item">
              <img class="z-0 inset-0 h-full w-full object-cover" :src="slide"/>
            </div>

        </div>
        </Slide>
    
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </main>
  </div>
</template>

<style>

.my-cool-item {
  position: relative;
  display: inline-block;
}

.my-cool-item:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 800px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), white);
}
.carousel__item {
  min-height: 600px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
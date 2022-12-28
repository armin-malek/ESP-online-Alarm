<template>
  <div>
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
    <app-bottom-menu/>
  </div>

</template>


<script>
import BottomMenu from "@/components/BottomMenu";

export default {
  name: 'App',

  data: () => ({
    deferredPrompt: null

  }), components: {
    AppBottomMenu: BottomMenu,
  },
}
</script>
<style>
@import "./assets/css/vendors/bootstrap.rtl.css";
@import './assets/css/style.css';
@import './assets/css/rtl.css';
@import './assets/fonts/vazir/Farsi-Digits/Vazirmatn-FD-font-face.css';
@import './assets/css/iconly.css';

.header .logo-wrap i {
  color: #FFF;
}

.header h3 {
  color: #FFF;
  font-size: 15px;
  text-align: right;
}

.address2-page .address-wrap .address-box .conten-box h3 {
  margin-top: 0;
}

.header {
  background-color: #6fa9ff;
  padding: calc(20px + (15 - 10) * ((100vw - 320px) / (1920 - 320))) 15px;
  box-shadow: 0 0 20px #d5d5d5b8;
}

.slide-enter-active {
  animation: slide-in 200ms ease-in-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-in-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}
</style>

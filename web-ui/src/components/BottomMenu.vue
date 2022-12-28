<template>
  <footer class="footer-wrap">
    <ul class="footer">
      <router-link :to="{name:'home' }" tag="li" exact-active-class="active" class="footer-item " exact>
        <a href="#" class="footer-link">
          <i class="iconly-Home icli"></i>
          <span>رخداد ها</span>
        </a>
      </router-link>

      <router-link :to="{name:'settings' }" tag="li" exact-active-class="active" class="footer-item " exact>
        <a href="#" class="footer-link">
          <i class="iconly-Category icli"></i>
          <span>تنظیمات</span>
        </a>
      </router-link>


    </ul>
  </footer>
</template>

<script>
export default {
  name: "BottomMenu"
}
</script>

<style scoped>

</style>

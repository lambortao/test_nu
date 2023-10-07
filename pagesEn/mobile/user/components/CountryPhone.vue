<template>
  <div class="country-phone">
    <en-mselect
      :value="countryTag"
      :country="true"
      :style="{ width: '25%' }"
      defaultdata="+86"
      :options="globalTagOptions"
      @update:value="value => $emit('changeCountryTag', value)"
    />
    <en-minput
      :value="phoneNumber"
      :style="{ width: '65%' }"
      autocomplete="off"
      type="tel"
      placeholder="Phone number"
      @update:value="value => $emit('update:value', value)"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EnMselect from '~/componentsEn/AAMobile/InputComponent/select.vue'
import EnMinput from '~/componentsEn/AAMobile/InputComponent/input.vue'
export default {
  components: {
    EnMselect,
    EnMinput
  },
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    phoneNumber: {
      type: [String, Number],
      default: ''
    },
    countryTag: {
      type: String,
      default: '+86'
    }
  },
  computed: {
    ...mapState('login', {
      globalTagOptions: 'areaCode'
    })
  }
}
</script>

<style lang="scss" scoped>
.country-phone {
  display: flex;
  justify-content: space-between;
  border: 1px solid #eee;
  margin: mvw(30) 0;
}
</style>

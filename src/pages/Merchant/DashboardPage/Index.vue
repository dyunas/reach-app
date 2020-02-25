<!-- eslint-disable prettier/prettier -->
<template>
  <q-page>
    <h4 class="pageHeader">Dashboard</h4>

    <div
      class="q-pa-md row items-start q-gutter-y-md"
      :class="{ 'q-gutter-x-md' : $q.platform.is.desktop }"
    >
      <q-card
        flat
        bordered
        class="my-card col-md-3 col-sm-3 col-xs-12"
      >
        <q-card-section>
          <div class="text-h6 text-weight-regular">Daily Revenue</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="text-right">
          <span class="text-h4 text-weight-thin">
            Php 3,456.00
          </span>
          <!-- <q-inner-loading :showing="visible">
            <q-spinner-bars
              size="50px"
              color="primary"
            />
          </q-inner-loading> -->
        </q-card-section>
      </q-card>
      <q-card
        flat
        bordered
        class="my-card col-md-3 col-sm-3 col-xs-12"
      >
        <q-card-section>
          <div class="text-h6 text-weight-regular">Weekly Revenue</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="text-right">
          <span class="text-h4 text-weight-thin">
            Php 3,456.00
          </span>
          <!-- <q-inner-loading :showing="visible">
            <q-spinner-bars
              size="50px"
              color="primary"
            />
          </q-inner-loading> -->
        </q-card-section>
      </q-card>
      <q-card
        flat
        bordered
        class="my-card col-md-3 col-sm-3 col-xs-12"
      >
        <q-card-section>
          <div class="text-h6 text-weight-regular">Monthly Revenue</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="text-right">
          <span class="text-h4 text-weight-thin">
            Php 3,456.00
          </span>
          <!-- <q-inner-loading :showing="visible">
            <q-spinner-bars
              size="50px"
              color="primary"
            />
          </q-inner-loading> -->
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 5px 15px
</style>

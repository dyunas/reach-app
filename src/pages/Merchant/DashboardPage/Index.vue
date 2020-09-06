<!-- eslint-disable prettier/prettier -->
<template>
  <q-page>
    <h4 class="pageHeader">Dashboard</h4>
		
		<div class="q-pa-md row">			
			<q-btn
        color="red"
        label="Close Store"
				v-if="this.store_status"
        :loading="loading"
        :disable="disabled"
        @click="updateStoreStatus"
      ></q-btn>
			<q-btn
        color="primary"
        label="Open Store"        
        v-else
        :loading="loading"
        :disable="disabled"
        @click="updateStoreStatus"
      ></q-btn>
		</div>

    <div
      class="q-pa-md row items-start q-gutter-y-md"
      :class="{ 'q-gutter-x-md' : $q.platform.is.desktop }"
    >
			<q-card
        flat
        bordered
        class="my-card col"
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
        class="my-card col"
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
        class="my-card col"
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
			store_status: null,
			loading: false,
			disabled: false
    }
	},

	created () {
		this.getStoreStatus()
	},

	methods: {
		getStoreStatus() {
			this.loading = true
			this.disabled = true

			this.$store.dispatch('merchantSettingsModule/getStoreStatus')
				.then(response => {
					this.store_status = response.status
				})
				.catch(error => {
					console.log(error)
				})
				.finally(() => {
					this.loading = false
					this.disabled = false
				})
		},
		
		updateStoreStatus () {
			this.loading = true
			this.disabled = true
			
			this.$store.dispatch('merchantSettingsModule/updateStoreStatus', {
				'status': (this.store_status) ? 0 : 1
			})
        .then(response => {
          this.$q.notify({
            color: 'green-9',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Store status successfully updated!',
            position: 'top',
            timeout: 2000
          })

					this.store_status = response.status
        })
        .catch(error => {
          console.log(error.message)
				})
				.finally(() => {
					this.loading = false
          this.disabled = false
				})
		}
	}
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 5px 15px
</style>

<template>
  <div>
    <q-list
      bordered
      class="rounded-borders"
      v-if="$q.platform.is.desktop"
    >
      <q-item-label header>My Information</q-item-label>

      <q-form
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                outlined
                v-model="fname"
                label="Firstname"
                dense
                :rules="[ val => val && val.length > 0 || 'Firstname is required']"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                outlined
                v-model="lname"
                label="Lastname"
                dense
                :rules="[ val => val && val.length > 0 || 'Lastname is required']"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                outlined
                v-model="contactNumber"
                label="Contact Number"
                dense
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <div>
            <q-btn
              label="Save"
              type="submit"
              color="primary"
              :loading="this.loading"
              :disable="this.disabled"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-item>
      </q-form>
    </q-list>

    <q-list
      bordered
      class="rounded-borders"
      v-if="$q.platform.is.mobile"
    >
      <q-item-label header>My Information</q-item-label>

      <q-form
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                outlined
                v-model="fname"
                label="Firstname"
                dense
                :rules="[ val => val && val.length > 0 || 'Firstname is required']"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                outlined
                v-model="lname"
                label="Lastname"
                dense
                :rules="[ val => val && val.length > 0 || 'Lastname is required']"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                outlined
                v-model="contactNumber"
                label="Contact Number"
                dense
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <div>
            <q-btn
              label="Save"
              type="submit"
              color="primary"
              :loading="this.loading"
              :disable="this.disabled"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-item>
      </q-form>
    </q-list>

    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      requried: true
    },

    loading: {
      type: Boolean,
      required: true
    },

    disabled: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      fname: this.profile.fname,
      lname: this.profile.lname,
      contactNumber: this.profile.contact_number,
      loadingState: false
    }
  },

  methods: {
    onSubmit () {
      this.$emit('submitting', {
        fname: this.fname,
        lname: this.lname,
        contactNumber: this.contactNumber
      })
    },

    onReset () {
      this.fname = this.profile.customer.fname
      this.lname = this.profile.customer.lname
      this.contactNumber = this.profile.customer.contact_number
    }
  }
}
</script>

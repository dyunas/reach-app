<template>
  <div>
    <q-list
      bordered
      class="rounded-borders"
      v-if="$q.platform.is.desktop"
    >
      <q-item>
        <q-item-section>
          <q-item-label class="text-right">
            <q-btn
              label="Change banner"
              outline
              style="color: #027BE3"
              icon="insert_photo"
              @click="changeBanner = true"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-img
            :src="'http://18.163.185.208/storage/' + this.profile.photo"
            alt="Banner"
            style="width: 100%; height: 370px;"
            :ratio="16/9"
          />
        </q-item-section>
      </q-item>

      <q-item-label header>My Information</q-item-label>

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Merchant: </span>
            {{ this.profile.merchant_name }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Store Hours: </span>
            {{ (this.profile.opening !== '00:00:00' && this.profile.closing !== '00:00:00') ? this.profile.opening+' - '+ this.profile.closing : '24hrs' }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Status: </span>
            {{ this.profile.status }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Email: </span>
            {{ this.profile.email }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Phone Number: </span>
            {{ this.profile.contact_num }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Account type: </span>
            {{ this.profile.account_type }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Location: </span>
            {{ this.profile.location }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Joined: </span>
            {{ this.profile.created_at }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list
      bordered
      class="rounded-borders"
      v-if="$q.platform.is.mobile"
    >
      <q-item>
        <q-item-section>
          <q-item-label class="text-right">
            <q-btn
              label="Change banner"
              outline
              style="color: #027BE3"
              icon="insert_photo"
              @click="changeBanner = true"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-img
            :src="'http://18.163.185.208/storage/' + this.profile.photo"
            alt="Banner"
            style="width: 100%; height: 370px;"
            :ratio="16/9"
          />
        </q-item-section>
      </q-item>

      <q-item-label header>My Information</q-item-label>

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Merchant: </span>
            {{ this.profile.merchant_name }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Store Hours: </span>
            {{ (this.profile.opening !== '00:00:00' && this.profile.closing !== '00:00:00') ? this.profile.opening+' - '+ this.profile.closing : '24hrs' }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Status: </span>
            {{ this.profile.status }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Email: </span>
            {{ this.profile.email }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Phone Number: </span>
            {{ this.profile.contact_num }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Account type: </span>
            {{ this.profile.account_type }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Location: </span>
            {{ this.profile.location }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Joined: </span>
            {{ this.profile.created_at }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog
      v-model="changeBanner"
      ref="changeBanner"
    >
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Change Banner</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-section>

        <q-card-section>
          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
          >
            <div class="col col-xs-12 col-sm-12 col-md-4">
              <q-input
                @change="onFileSelected"
                outlined
                type="file"
              />
            </div>
            <br />
            <div>
              <q-btn
                label="Save"
                :loading="submitting"
                type="submit"
                color="primary"
              >
                <template v-slot:loading>
                  <q-spinner-bars />
                </template>
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      requried: true
    }
  },

  data () {
    return {
      changeBanner: false,
      banner: '',
      submitting: false,
    }
  },

  methods: {
    onFileSelected (event) {
      this.banner = event.target.files[0]
    },

    onSubmit () {
      this.loading = true

      this.$store.dispatch('merchantSettingsModule/changeBanner', {
        banner: this.banner
      })
        .then(response => {
          this.loading = false
          this.$refs.changeBanner.hide()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>


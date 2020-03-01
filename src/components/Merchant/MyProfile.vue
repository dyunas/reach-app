<template>
  <div>
    <q-list
      bordered
      class="rounded-borders"
      v-if="$q.platform.is.desktop"
    >
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
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      requried: true
    }
  }
}
</script>


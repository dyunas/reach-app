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
            <span class="text-weight-bold">Name: </span>
            {{ this.profile.fname +' '+ this.profile.lname }}
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
            {{ '+63' + this.profile.contact_number }}
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
            <span class="text-weight-bold">Name: </span>
            {{ this.profile.fname +' '+ this.profile.lname }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Status: </span>
            {{ this.profile.account_status }}
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
            {{ '+63' + this.profile.contact_number }}
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
  },
}
</script>

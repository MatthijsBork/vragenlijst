<template>
  <div>
    <img class="w-auto h-12 mx-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company" />
    <h2 class="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">Sign in to your account</h2>
    <p class="mt-2 text-sm text-center text-gray-600">
      Or
      {{ ' ' }}
      <router-link :to="{ name: 'Register' }" class="font-medium text-indigo-600 hover:text-indigo-500">Register
        here</router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit="login">
    <div v-if="errorMsg" class="py-3 px-5 bg-red-500 text-white rounded">
      {{ errorMsg }}
      <span @click="errorMsg = '' " class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </div>
    <input type="hidden" name="remember" value="true" />
    <div class="-space-y-px rounded-md shadow-sm">
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email" required="" v-model="user.email"
          class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Email address" />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required=""
          v-model="user.password"
          class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Password" />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input id="remember-me" name="remember-me" type="checkbox" v-model="user.remember"
          class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
        <label for="remember-me" class="block ml-2 text-sm text-gray-900">Remember me</label>
      </div>
    </div>

    <div>
      <button type="submit"
        class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <LockClosedIcon class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        </span>
        Sign in
      </button>
    </div>
  </form>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import store from '../store';
import { useRouter } from 'vue-router'

const router = useRouter();

const user = {
  email: '',
  password: '',
  remember: false
};

let errorMsg = ref('');

function login(ev) {
  ev.preventDefault();

  store.dispatch('login', user)
    .then(() => {
      router.push({
        name: 'Dashboard'
      })
    })
    .catch(err => {
      errorMsg.value = err.response.data.message
    })

}

</script>

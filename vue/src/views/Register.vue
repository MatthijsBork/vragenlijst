
<template>
  <div>
    <img class="w-auto h-12 mx-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company" />
    <h2 class="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">Register an account</h2>
    <p class="mt-2 text-sm text-center text-gray-600">
      Or
      {{ ' ' }}
      <router-link :to="{ name: 'Login' }" class="font-medium text-indigo-600 hover:text-indigo-500">Log in</router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit="register">
    <input type="hidden" name="remember" value="true" />
    <div class="-space-y-px rounded-md shadow-sm">
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email" required="" v-model="user.email"
          class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Email address" />
      </div>
      <div>
        <label for="fullname" class="sr-only">Full name</label>
        <input id="fullname" name="fullname" type="text" autocomplete="name" required="" v-model="user.name"
          class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Full Name" />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required=""
          v-model="user.password"
          class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Password" />
      </div>
      <div>
        <label for="password_confirm" class="sr-only">Confirm password</label>
        <input id="password_confirm" name="password_confirm" type="password" autocomplete="current-password" required=""
          v-model="user.password_confirmation"
          class="rounded-b-md relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Password" />
      </div>
    </div>
    <div>
      <button type="submit"
        class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <LockClosedIcon class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        </span>
        Register
      </button>
    </div>
  </form>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store/index.js';

const router = useRouter();

const user = {
  name: '',
  email: '',
  password: '',
  password_confirm: '',
};

function register(ev) {
  ev.preventDefault();
  store.dispatch('register', user)
    // Nadat de user geregistreerd is
    .then((res) => {
      router.push({
        name: 'Dashboard'
      })
    });
}
</script>

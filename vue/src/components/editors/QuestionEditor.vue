<!-- QuestionEditor.vue view om survey-vragen te bewerken -->

<template>
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">
      <!-- index + 1, eerste item zal namelijk 0 zijn -->
      {{ index + 1 }} {{ model.question }}
    </h3>

    <div class="flex items-center">
      <!-- vraag toevoegen -->
      <button type="button" @click="addQuestion()"
        class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd" />
        </svg>
        Add
      </button>
      <!-- vraag verwijderen -->
      <button type="button" @click="deleteQuestion()"
        class="flex marker:items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd" />
        </svg>
        Delete
      </button>
    </div>
  </div>
  <!-- vragen index -->
  <div class=" grid gap-3 grid-cols-12">
    <!-- vraag -->
    <div class="mt-3 col-span-9">
      <label :for="'question_text_' + model.data" class="block text-sm font-medium text-gray-700">Question Text</label>
      <input type="text" :name="'question_text_' + model.data" v-model="model.question" @change="dataChange"
        :id="'question_text_' + model.data"
        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
    </div>
    <!-- vraag type -->
    <div class="mt-3 col-span-3">
      <label for="question_type" class="block text-sm font-medium text-gray-700">
        Select question type
      </label>
      <select name="question_type" id="question_type" v-model="model.type" @change="typeChange"
        class="mt-1 w-full block px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo- sm:text-sm">
        <option :value="type" :key="type" v-for="type in questionTypes">
          {{ upperCaseFirst(type) }}
        </option>
      </select>
    </div>
  </div>
  <!-- vraag beschrijving -->
  <div class="mt-3 col-span-9">
    <label :for="'question_description_' + model.id" class="block text-sm font-medium text-gray-700">Question
      Description</label>
    <textarea :name="'question_description_' + model.id" :id="'question_description_' + model.id" @change="dataChange"
      v-model="model.description" cols="30" rows="5"
      class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
  </div>

  <!-- data -->
  <div>
    <div v-if="shouldHaveOptions()" class="mt-2">
      <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
        Options

        <!-- optie toevoegen -->
        <button type="button" @click="addOption()"
          class="flexitems-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd" />
          </svg>
          Add option
        </button>
      </h4>
      <!-- Als er geen opties zijn -->
      <div v-if="!model.data.options.length" class="text-xs text-gray-600 text-center py-3">
        No options defined
      </div>

      <!-- itereer door alle opties heen -->
      <div v-for="(option, index) in model.data.options" :key="option.uuid" class="flex items-center mb-1">
        <!-- vraag-nummer (index) -->
        <span class="w-6 text-sm">{{ index + 1 }}</span>
        <input type="text" v-model="option.text" @change="dataChange"
          class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500">
        <!-- Optie verwijderen -->
        <button type="button" @click="removeOption(option)"
          class="h-6 w-6 rounded-full flex items-center justify-center border border-trannsparent transition-colors hover:border-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd" />
          </svg>
        </button>

      </div>
    </div>
  </div>


  <hr class="my-5">
</template>

<script setup>

import { ref, computed } from 'vue';
import store from '../../store';
import { v4 as uuid } from 'uuid';

const props = defineProps({
  question: Object,
  index: Number,
});


// Definieer events
const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion']);

// Hier maken we de vraag-data opnieuw om onbedoelde referance veranderingen te voorkomen
const model = ref(JSON.parse(JSON.stringify(props.question)));

// Beschikbare vraag types, computed omdat we de options veranderen op basis van de vraag type
const questionTypes = computed(() => store.state.questionTypes);

function upperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// bepalen of de vraag type meerdere options moet hebben, zoals bijv. een dropdown menu
function shouldHaveOptions() {
  return ['select', 'radio', 'checkbox'].includes(model.value.type);
}

function getOptions() {
  return model.value.data.options;
}

function setOptions(options) {
  return model.value.data.options = options;
}

function addOption() {
  setOptions([
    ...getOptions(),
    { uuid: uuid(), text: '' }
  ]);
  dataChange();
}

function removeOption(option) {
  /*
  - filter() wordt aangeroepen op getOptions(),
    en die maakt een nieuwe array aan met alle elementen die niet aan de 'test'/method voldoet
  - De opties worden opnieuw geset, maar zonder de optie die is meegegeven aan deze functie (option)
  - Nu is er een nieuwe option array, zonder de verwijderde optie
  */
  setOptions(getOptions().filter((opt) => opt !== option));
}

// stel de vraag type verandert, willen we de options weer aanpassen
function typeChange() {
  if (shouldHaveOptions()) {
    setOptions(getOptions() || []);
  }
  dataChange();
}

function dataChange() {
  // Wat dit in principe doet, is een clone van model.value maken.
  // Zo verliezen we de data niet als we de option type veranderen
  const data = JSON.parse(JSON.stringify(model.value));
  // als de vraag geen opties moet hebben, verwijder opties voor die vraag
  if (!shouldHaveOptions()) {
    delete data.data.options;
  }

  emit('change', data);
}

function addQuestion() {
  emit('addQuestion');
}

function deleteQuestion() {
  emit('deleteQuestion', props.question);
}



</script>

<style></style>

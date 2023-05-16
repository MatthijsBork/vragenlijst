<template>
  <Page>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ model.id ? model.title : "Create a survey" }}
        </h1>
      </div>
    </template>
    <form @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          {{ model }}
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img v-if="model.image" :src="model.image" :alt="model.title" class="w-64 h-48 object-cover">
              <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd" />
                </svg>
              </span>
              <button type="button"
                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <input type="file" @change="onImageChoose"
                  class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer" />
                Change
              </button>
            </div>
          </div>
          <div>
            <div>
              <!-- Survey titel -->
              <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" id="title" v-model="model.title" autocomplete="survey_title"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />

              <!-- Survey description -->
              <div>
                <label for="about" class="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div class="mt-1">
                  <textarea name="description" id="description" rows="3" v-model="model.description"
                    autocomplete="survey_description"
                    class=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Describe your survey"></textarea>
                </div>
              </div>
              <!-- Survey verloopdatum -->
              <div>
                <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
                <input type="date" name="expire_date" id="expire_date" v-model="model.expire_date"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <!-- Survey status -->
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input type="checkbox" name="status" id="status" v-model="model.status"
                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                </div>
                <div class="ml-3 text-sm">
                  <label for="status" class="font-medium text-gray-700">Active</label>
                </div>
              </div>
            </div>

            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <h3 class="text-2xl font-semibold flex items-center justify-between">
                Questions

                <!-- Vraag toevoegen -->
                <button type="button" @click="addQuestion()"
                  class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd" />
                  </svg>
                  Add Question
                </button>

              </h3>
              <div v-if="!model.questions.length" class="text-center text-gray-600">
                No questions have been created yet...
              </div>
              <div v-for="(question, index) in model.questions" :key="question.id">
                <QuestionEditor :question="question" :index="index" @change="questionChange" @addQuestion="addQuestion"
                  @deleteQuestion="deleteQuestion" />
              </div>
            </div>
            <div class="px-4 py-3 bg-white gray-50 text-right sm:px-6">
              <button type="submit"
                class="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium shadow-sm rounded-md text-white bg-indigo-600  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </Page>
</template>
<script setup>
import { ref } from 'vue';
import store from '../store';
import { useRoute, useRouter } from 'vue-router';
import Page from '../components/Page.vue';
import QuestionEditor from '../components/editors/QuestionEditor.vue';
import { v4 as uuid } from 'uuid';

const router = useRouter();

const route = useRoute();

let model = ref({
  title: "",
  status: false,
  description: null,
  image: null,
  expire_date: null,
  questions: [],
});

if (route.params.id) {
  model.value = store.state.surveys.find(
    (s) => s.id === parseInt(route.params.id)
  );
}

if (route.params.id) {
  store.dispatch("getSurvey", route.params.id);
}

function addQuestion() {
  const newQuestion = {
    id: uuid(),
    type: 'text',
    question: '',
    description: null,
    data: {}
  }

  model.value.questions.push(newQuestion);
}

function deleteQuestion(question) {
  model.value.questions.splice(model.value.questions.findIndex(q => q.id === question.id), 1);
}

function questionChange(question) {
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}

function saveSurvey() {
  let action = "created";
  if (model.value.id) {
    action = "updated";
  }
  store.dispatch("saveSurvey", { ...model.value }).then(({ data }) => {
    store.commit("notify", {
      type: "success",
      message: "The survey was successfully " + action,
    });
    router.push({
      name: "SurveyView",
      params: { id: data.data.id },
    });
  });
}
</script>

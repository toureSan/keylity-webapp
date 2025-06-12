<template>

  <div class="flex min-h-screen">
    <div
      class="flex flex-1 flex-col justify-center px-0 py-0 sm:px-6 lg:flex-none lg:px-10 xl:px-44"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div class="animate-fade-in">
          <NuxtLink to="/" class="cursor-pointer">
            <img
              :src="logoImage"
              alt="Keylity"
              class="cursor-pointer h-15 w-auto transform transition-transform duration-300 hover:scale-105"
            />
          </NuxtLink>
          <h2 class="fluid-subtitle font-extrabold tracking-tight">
            Créer un compte
          </h2>
          <p class="mt-2 text-sm/6 text-gray-500">
            Déjà un compte ?

            <NuxtLink
              to="/login"
              class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-300"
            >
              Se connecter
            </NuxtLink>
          </p>
        </div>

        <div class="mt-10">
          <form @submit="onSubmit" class="space-y-6">
            <div v-if="serverError" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-red-700">{{ serverError }}</p>
                </div>
              </div>
            </div>

            <div class="group">
              <label
                for="firstName"
                class="block text-sm/6 font-medium text-gray-900"
                >Prénom</label
              >
              <div class="mt-2 relative">
                <input
                  v-model="firstName"
                  type="text"
                  name="firstName"
                  id="firstName"
                  autocomplete="given-name"
                  required
                  class="block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"
                  :class="{
                    'ring-red-500': firstNameTouched && firstNameError,
                    'ring-green-500': firstNameTouched && !firstNameError && firstName
                  }"
                  placeholder="John"
                />
                <span v-if="firstNameTouched && firstNameError" class="text-red-500 text-sm mt-1 block">{{ firstNameError }}</span>
              </div>
            </div>

            <div class="group">
              <label
                for="lastName"
                class="block text-sm/6 font-medium text-gray-900"
                >Nom</label
              >
              <div class="mt-2 relative">
                <input
                  v-model="lastName"
                  type="text"
                  name="lastName"
                  id="lastName"
                  autocomplete="family-name"
                  required
                  class="block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"
                  :class="{
                    'ring-red-500': lastNameTouched && lastNameError,
                    'ring-green-500': lastNameTouched && !lastNameError && lastName
                  }"
                  placeholder="Doe"
                />
                <span v-if="lastNameTouched && lastNameError" class="text-red-500 text-sm mt-1 block">{{ lastNameError }}</span>
              </div>
            </div>

            <div class="group">
              <label
                for="email"
                class="block text-sm/6 font-medium text-gray-900"
                >Adresse email</label
              >
              <div class="mt-2 relative">
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  required
                  class="block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"
                  :class="{
                    'ring-red-500': emailTouched && emailError,
                    'ring-green-500': emailTouched && !emailError && email
                  }"
                  placeholder="exemple@email.com"
                />
                <span v-if="emailTouched && emailError" class="text-red-500 text-sm mt-1 block">{{ emailError }}</span>
              </div>
            </div>

            <div class="group">
              <label
                for="password"
                class="block text-sm/6 font-medium text-gray-900"
                >Mot de passe</label
              >
              <div class="mt-2 relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  id="password"
                  autocomplete="new-password"
                  required
                  class="block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"
                  :class="{
                    'ring-red-500': passwordTouched && passwordError,
                    'ring-green-500': passwordTouched && !passwordError && password
                  }"
                  placeholder="••••••••"
                />
                <span v-if="passwordTouched && passwordError" class="text-red-500 text-sm mt-1 block">{{ passwordError }}</span>
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <svg
                    v-if="!showPassword"
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clip-rule="evenodd"
                    />
                    <path
                      d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="group">
              <label
                for="confirmPassword"
                class="block text-sm/6 font-medium text-gray-900"
                >Confirmer le mot de passe</label
              >
              <div class="mt-2 relative">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  name="confirmPassword"
                  id="confirmPassword"
                  autocomplete="new-password"
                  required
                  class="block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"
                  :class="{
                    'ring-red-500': confirmPasswordTouched && confirmPasswordError,
                    'ring-green-500': confirmPasswordTouched && !confirmPasswordError && confirmPassword
                  }"
                  placeholder="••••••••"
                />
                <span v-if="confirmPasswordTouched && confirmPasswordError" class="text-red-500 text-sm mt-1 block">{{ confirmPasswordError }}</span>
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <svg
                    v-if="!showConfirmPassword"
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clip-rule="evenodd"
                    />
                    <path
                      d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading"
                class="group flex w-full justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm/6 font-semibold text-white shadow-sm transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="flex items-center">
                  <span v-if="loading" class="mr-2">
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  {{ loading ? 'Création en cours...' : 'Créer un compte' }}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="relative hidden flex-1 lg:block">
      <!-- Image floutée -->
      <img
        class="absolute inset-0 w-full h-full object-cover"
        src="@/assets/images/famille.png"
        alt=""
        style="filter: blur(2px)"
      />

                           <!-- Overlay léger pour assombrir un peu -->
                           <div class="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900/40"></div>

                           <!-- Texte net en bas à gauche -->
                           <div class="absolute bottom-2 left-6 text-white max-w-xl z-10">
                                    <h2 class="fluid-title animate-fade-in-up">Bienvenue chez Keylity</h2>
                                    <p
                                             class="mt-0 fluid-subtitle text-white/90 drop-shadow-sm animate-fade-in-up animation-delay-200">
                                             Simplifiez vos démarches administratives
                                    </p>
                           </div>
                  </div>



         </div>
</template>

<style scoped>
.fluid-title {
         font-size: clamp(2.3rem, 2.5vw, 8rem);
         font-family: 'Bricolage Grotesque', sans-serif;
         font-weight: 700;
}

.fluid-title-blur {
         font-size: clamp(2.3rem, 2vw, 8rem);
         font-family: 'Bricolage Grotesque', sans-serif;
         font-weight: 700;
}

.fluid-subtitle {
         font-size: clamp(1.5rem, 1vw, 8rem);
         font-family: 'Bricolage Grotesque', sans-serif;
         font-weight: 300;
}

.animate-fade-in {
         animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-up {
         animation: fadeInUp 0.5s ease-out;
}

.animation-delay-200 {
         animation-delay: 200ms;
}

@keyframes fadeIn {
         from {
                  opacity: 0;
         }

         to {
                  opacity: 1;
         }
}

@keyframes fadeInUp {
         from {
                  opacity: 0;
                  transform: translateY(20px);
         }

         to {
                  opacity: 1;
                  transform: translateY(0);
         }
}
</style>

<script setup>
import logoImage from "~/assets/images/logo-complet.png";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";
import { useForm, useField } from 'vee-validate';
import { defineRule } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const router = useRouter();
const authStore = useAuthStore();

// Définition du schéma de validation avec Zod
const registerSchema = toTypedSchema(z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('L\'adresse email n\'est pas valide'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
    ),
  confirmPassword: z.string().min(1, 'La confirmation du mot de passe est requise')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
}));

const form = useForm({
  validationSchema: registerSchema,
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  validateOnMount: false,
  validateOnBlur: true,
  validateOnInput: true,
});

const { handleSubmit, errors, values, resetForm, meta } = form;
const serverError = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);

const { value: firstName, errorMessage: firstNameError, touched: firstNameTouched } = useField('firstName');
const { value: lastName, errorMessage: lastNameError, touched: lastNameTouched } = useField('lastName');
const { value: email, errorMessage: emailError, touched: emailTouched } = useField('email');
const { value: password, errorMessage: passwordError, touched: passwordTouched } = useField('password');
const { value: confirmPassword, errorMessage: confirmPasswordError, touched: confirmPasswordTouched } = useField('confirmPassword');

// Vérification de l'initialisation de meta
const isFieldTouched = (field) => meta.value && meta.value.touched && meta.value.touched[field];

const onSubmit = handleSubmit(async (formValues) => {
  try {
    loading.value = true;
    serverError.value = '';

    await authStore.register(
      formValues.email,
      formValues.password,
      formValues.firstName,
      formValues.lastName
    );

    // Réinitialisation du formulaire après succès
    resetForm();
    router.push('/auth/confirm-email-sent');
  } catch (error) {
    console.error("Register error:", error);
    if (error.response?.data?.message) {
      serverError.value = error.response.data.message;
    } else {
      serverError.value = 'Une erreur est survenue lors de l\'inscription';
    }
  } finally {
    loading.value = false;
  }
});

// Réinitialisation des erreurs lors de la modification des champs
const resetFieldError = (field) => {
  if (errors.value[field]) {
    errors.value[field] = '';
  }
  if (serverError.value) {
    serverError.value = '';
  }
};

const handleGoogleLogin = async () => {
         try {
                  // TODO: Implémenter la connexion Google
                  console.log('Google login attempt')
         } catch (error) {
                  console.error('Google login error:', error)
         }
}

const handleLinkedInLogin = async () => {
         try {
                  // TODO: Implémenter la connexion LinkedIn
                  console.log('LinkedIn login attempt')
         } catch (error) {
                  console.error('LinkedIn login error:', error)
         }
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Colonne gauche : visuel -->
    <div
      class="hidden md:flex flex-col justify-center items-center w-1/2 bg-purple-300 border-r border-gray-100"
    >
      <img
        src="@/assets/images/onbording.png"
        alt="Onboarding visuel"
        class="w-180 h-180 object-contain mb-8"
      />
      <div class="fluid-title font-bold text-purple-900">
        Bienvenue sur Keylity
      </div>
      <div class="mt-2 text-center text-white font-extrabold max-w-xs">
        Votre assistant pour simplifier toutes vos démarches administratives.
      </div>
    </div>
    <!-- Colonne droite : formulaire -->
    <div
      class="flex flex-1 flex-col justify-center items-left px-20 sm:px-20 md:px-15 bg-white"
    >
      <!-- Stepper juste au-dessus du formulaire -->
      <h2 class="fluid-title font-bold">À propos de vous</h2>
      <p class="fluid-subtitle text-gray-500 mb-10 max-w-xl">
        Nous avons besoins de quelque information afin de vous permettre de
        profiter de nos services.
      </p>
      <div class="flex items-center justify-left gap-4 mb-9 w-full">
        <template v-for="n in 3" :key="n">
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg transition-all duration-300',
              step === n
                ? 'bg-purple-600 text-white scale-110 ring-4 ring-purple-200'
                : step > n
                  ? 'bg-purple-300 text-white'
                  : 'bg-gray-200 text-gray-400',
            ]"
          >
            {{ n }}
          </div>
          <div
            v-if="n < 3"
            class="w-12 h-1 rounded transition-all duration-300"
            :class="step > n ? 'bg-purple-400' : 'bg-gray-200'"
          ></div>
        </template>
      </div>
      <!-- Formulaire multistep -->
      <form
        @submit.prevent="handleNext"
        class="w-full max-w-lg animate-fade-in"
      >
        <div v-if="step === 1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div class="relative group">
              <input
                v-model="form.genre"
                type="text"
                id="genre"
                class="input-fancy peer"
                placeholder="Genre "
              />
              <label for="genre" class="label-fancy">Genre</label>
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                  />
                  <path
                    d="M6.343 17.657A8 8 0 1117.657 6.343 8 8 0 016.343 17.657z"
                  /></svg
              ></span>
            </div>
            <div class="relative group">
              <input
                v-model="form.nationalite"
                type="text"
                id="nationalite"
                class="input-fancy peer"
                placeholder="Nationnalité "
              />
              <label for="nationalite" class="label-fancy">Nationalité</label>
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 010 20" />
                  <path d="M12 2a15.3 15.3 0 000 20" /></svg
              ></span>
            </div>
            <div class="relative group">
              <input
                v-model="form.nom"
                type="text"
                id="nom"
                class="input-fancy peer"
                placeholder="Nom "
              />
              <label for="nom" class="label-fancy">Nom</label>
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                  />
                  <path
                    d="M6.343 17.657A8 8 0 1117.657 6.343 8 8 0 016.343 17.657z"
                  /></svg
              ></span>
            </div>
            <div class="relative group">
              <input
                v-model="form.prenom"
                type="text"
                id="prenom"
                class="input-fancy peer"
                placeholder="Prénom "
              />
              <label for="prenom" class="label-fancy">Prénom</label>
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                  />
                  <path
                    d="M6.343 17.657A8 8 0 1117.657 6.343 8 8 0 016.343 17.657z"
                  /></svg
              ></span>
            </div>
            <div class="relative group">
              <input
                v-model="form.naissance"
                type="date"
                id="naissance"
                class="input-fancy peer"
                placeholder="Date de naissance "
              />
              <label for="naissance" class="label-fancy"
                >Date de naissance</label
              >
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" /></svg
              ></span>
            </div>
            <div class="relative group">
              <input
                v-model="form.npa"
                type="text"
                id="npa"
                class="input-fancy peer"
                placeholder="NPA/Localité "
              />
              <label for="npa" class="label-fancy">NPA/Localité</label>
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  />
                  <circle cx="12" cy="9" r="2.5" /></svg
              ></span>
            </div>
            <div class="relative group">
              <input
                v-model="form.avs"
                type="text"
                id="avs"
                class="input-fancy peer"
                placeholder="Numéro AVS "
              />
              <label for="avs" class="label-fancy">Numéro AVS</label>
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 3v4M8 3v4" /></svg
              ></span>
            </div>
            <div class="relative group">
              <input
                v-model="form.profession"
                type="text"
                id="profession"
                class="input-fancy peer"
                placeholder="Profession "
              />
              <label for="profession" class="label-fancy">Profession</label>
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                  />
                  <path
                    d="M6.343 17.657A8 8 0 1117.657 6.343 8 8 0 016.343 17.657z"
                  /></svg
              ></span>
            </div>
          </div>
        </div>
        <div v-else-if="step === 2">
          <h2 class="text-xl font-bold mb-2">Adresse & Contact</h2>
          <div class="grid grid-cols-1 gap-y-4">
            <div class="relative group">
              <input
                v-model="form.adresse"
                type="text"
                id="adresse"
                class="input-fancy peer"
                placeholder="Adresse actuelle "
              />
              <label for="adresse" class="label-fancy">Adresse actuelle</label>
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  />
                  <circle cx="12" cy="9" r="2.5" /></svg
              ></span>
            </div>
            <div class="relative group">
              <input
                v-model="form.telephone"
                type="tel"
                id="telephone"
                class="input-fancy peer"
                placeholder="Téléphone "
              />
              <label for="telephone" class="label-fancy">Téléphone</label>
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22 16.92V21a1 1 0 01-1.09 1A19.91 19.91 0 013 5.09 1 1 0 014 4h4.09a1 1 0 011 .75l1.13 4.52a1 1 0 01-.29 1L8.21 12.21a16 16 0 007.58 7.58l1.94-1.94a1 1 0 011-.29l4.52 1.13a1 1 0 01.75 1V21z"
                  /></svg
              ></span>
            </div>
            <div class="relative group">
              <input
                v-model="form.email"
                type="email"
                id="email"
                class="input-fancy peer"
                placeholder="Email "
              />
              <label for="email" class="label-fancy">Email</label>
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M22 6l-10 7L2 6" /></svg
              ></span>
            </div>
          </div>
        </div>
        <div v-else-if="step === 3">
          <h2 class="text-xl font-bold mb-6">Profil & Confirmation</h2>
          <div class="flex flex-col items-left gap-4">
            <div class="relative group w-28 h-28 mb-2">
              <input type="file" id="photo" class="hidden" />
              <label
                for="photo"
                class="cursor-pointer w-full h-full flex flex-col items-center justify-center rounded-full bg-blue-300 shadow-lg hover:from-purple-300 hover:to-purple-500 transition-all duration-300"
              >
                <svg
                  width="41"
                  height="45"
                  viewBox="0 0 41 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.1426 23.3674C26.5712 23.3674 31.8263 18.1123 31.8263 11.6837C31.8263 5.25508 26.5712 0 20.1426 0C13.714 0 8.45898 5.25508 8.45898 11.6837C8.45898 18.1123 13.7141 23.3674 20.1426 23.3674Z"
                    fill="#A9DDFF"
                  />
                  <path
                    d="M40.1944 32.7042C39.8882 31.9388 39.4801 31.2246 39.0209 30.5613C36.674 27.0919 33.0516 24.796 28.9699 24.2347C28.4598 24.1838 27.8986 24.2857 27.4904 24.5919C25.3475 26.1735 22.7965 26.9898 20.1434 26.9898C17.4903 26.9898 14.9393 26.1735 12.7964 24.5919C12.3882 24.2857 11.827 24.1327 11.3168 24.2347C7.23518 24.796 3.56175 27.0919 1.26585 30.5613C0.806667 31.2246 0.398464 31.9899 0.0924097 32.7042C-0.0606177 33.0103 -0.00964116 33.3674 0.143386 33.6736C0.551589 34.3879 1.06175 35.1022 1.52093 35.7144C2.23518 36.6838 3.00051 37.5511 3.8679 38.3674C4.58216 39.0817 5.39846 39.745 6.21487 40.4083C10.2454 43.4185 15.0924 45.0001 20.0924 45.0001C25.0924 45.0001 29.9394 43.4184 33.9699 40.4083C34.7863 39.7961 35.6026 39.0817 36.3169 38.3674C37.1332 37.5511 37.9495 36.6838 38.6639 35.7144C39.174 35.0511 39.6333 34.3879 40.0414 33.6736C40.2964 33.3674 40.3474 33.0102 40.1944 32.7042Z"
                    fill="#A9DDFF"
                  />
                </svg>

                <span class="text-sm text-center mt-2 text-white font-semibold"
                  >Choisir une photo</span
                >
              </label>
            </div>
            <div class="w-full mt-2 relative group">
              <select
                v-model="form.etatCivil"
                id="etatCivil"
                class="input-fancy peer"
              >
                <option value="" disabled selected hidden></option>
                <option>Célibataire</option>
                <option>En couple</option>
                <option>Divorcé(e)</option>
                <option>Veuf/veuve</option>
                <option>Autre</option>
              </select>
              <label for="etatCivil" class="label-fancy">État civil</label>
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" /></svg
              ></span>
            </div>
            <div class="w-full mt-2 relative group">
              <input
                v-model="form.domicilieDepuis"
                type="date"
                id="domicilieDepuis"
                class="input-fancy peer"
                placeholder="Domicilié depuis le "
              />
              <label for="domicilieDepuis" class="label-fancy"
                >Domicilié depuis</label
              >
              <span class="icon-input"
                ><svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" /></svg
              ></span>
            </div>
            <div class="w-full mt-2">
              <label class="block text-sm font-medium mb-1">Résumé</label>
              <div
                class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-gray-700 text-sm shadow-lg"
              >
                <div class="mb-1">
                  <b>Nom :</b> {{ form.nom }} {{ form.prenom }}
                </div>
                <div class="mb-1"><b>Email :</b> {{ form.email }}</div>
                <div class="mb-1"><b>Téléphone :</b> {{ form.telephone }}</div>
                <div class="mb-1"><b>Adresse :</b> {{ form.adresse }}</div>
                <div class="mb-1">
                  <b>Profession :</b> {{ form.profession }}
                </div>
                <div class="mb-1">
                  <b>Nationalité :</b> {{ form.nationalite }}
                </div>
                <div class="mb-1"><b>Numéro AVS :</b> {{ form.avs }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-start mt-6 gap-2">
          <button
            v-if="step > 1"
            type="button"
            @click="step--"
            class="px-6 py-2 rounded bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition"
          >
            Retour
          </button>
          <button
            type="submit"
            class="px-6 py-2 rounded bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-purple-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          >
            {{ step < 3 ? "Suivant" : "Terminer" }}
          </button>
        </div>
      </form>
      <div class="flex justify-center items-left">
        <h1>test</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fluid-title {
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: clamp(2.3rem, 2vw, 8rem);
}
.fluid-subtitle {
  font-size: 1.1rem;
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 400;
}
.input-fancy {
  width: 100%;
  border-radius: 0.75rem;
  border: 1.5px solid #e5e7eb;
  background: #f9fafb;
  color: #3b0764;
  font-size: 1.08rem;
  padding: 1.1rem 2.5rem 1.1rem 1.1rem;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background 0.2s;
  box-shadow: 0 2px 8px 0 #a78bfa11;
}
.input-fancy:focus {
  border-color: #a78bfa;
  background: #fff;
  box-shadow: 0 4px 16px 0 #a78bfa22;
}
.label-fancy {
  position: absolute;
  left: 1.1rem;
  top: 1.1rem;
  color: #a78bfa;
  font-size: 1.08rem;
  font-weight: 500;
  pointer-events: none;
  background: transparent;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.input-fancy:focus + .label-fancy,
.input-fancy:not(:placeholder-shown) + .label-fancy,
.input-fancy:valid + .label-fancy,
select.input-fancy:focus + .label-fancy,
select.input-fancy:not([value=""]) + .label-fancy {
  top: -0.7rem;
  left: 0.9rem;
  font-size: 0.92rem;
  color: #7c3aed;
  background: #fff;
  padding: 0 0.3rem;
  border-radius: 0.4rem;
  box-shadow: 0 2px 8px 0 #a78bfa11;
}
.icon-input {
  position: absolute;
  right: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a78bfa;
  pointer-events: none;
  opacity: 0.7;
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
<script setup>
import { ref } from "vue";

const step = ref(1);
const form = ref({
  genre: "",
  nationalite: "",
  nom: "",
  prenom: "",
  naissance: "",
  npa: "",
  avs: "",
  profession: "",
  adresse: "",
  telephone: "",
  email: "",
  etatCivil: "",
  domicilieDepuis: "",
});

function handleNext() {
  if (step.value < 3) {
    step.value++;
  } else {
    // TODO: Envoyer les données ou rediriger
    alert("Onboarding terminé !");
  }
}
</script>

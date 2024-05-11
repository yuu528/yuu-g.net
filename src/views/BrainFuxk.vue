<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <v-textarea
          label="Code"
          name="code"
          v-model="codeModel"
          clearable
        ></v-textarea>

        <v-container>
          <v-row>
            <v-col
              v-for="btn in btns"
              cols="6"
            >
              <v-btn
                :prepend-icon="btn.icon"
                color="primary"
                block
                :disabled="btn.disabled"
                @click="btn.fn()"
              >
                {{ btn.text }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col>
              <v-sheet class="d-flex align-stretch">
                <v-chip
                  class="mt-2"
                  :prepend-icon="statusIcon"
                >
                  {{ statusMsg }}
                </v-chip>
                <v-text-field
                  id="input-field"
                  class="mx-4"
                  label="Input"
                  v-model="inputModel"
                  density="compact"
                  maxlength="1"
                  :disabled="currentState !== State.WAITING_INPUT"
                  @update:modelValue="updateInput()"
                  @keydown.enter="machineInput()"
                ></v-text-field>
                <v-checkbox
                  label="Auto Enter"
                  color="primary"
                  density="compact"
                  v-model="autoEnter"
                  hide-details
                  @click="updateAutoEnter()"
                >
                </v-checkbox>
                <v-btn
                  class="mt-2"
                  :disabled="inputModel === '' || autoEnter"
                  @click="machineInput()"
                >
                  Enter
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12" lg="6">
        <v-textarea
          label="Output"
          name="output"
          v-model="outputModel"
          variant="outlined"
          auto-grow
          readonly
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';

import { BFMachine } from '@/scripts/brainfuxk/BFMachine';
import { Status } from '@/scripts/brainfuxk/BFStatus';

// Form
const codeModel = ref('');
const inputModel = ref('');
const autoEnter = ref(false);
const outputModel = ref('');

// Machine
const machine = new BFMachine();

const machineMem = computed(() => machine.mem);

// Page
const enum State {
  HALTED,
  RUNNING,
  WAITING_INPUT
}

const currentState = ref(State.HALTED);

const statusMsg = computed(() => ({
  [State.HALTED]: 'Halted',
  [State.RUNNING]: 'Running',
  [State.WAITING_INPUT]: 'Waiting for input'
}[currentState.value]));

const statusIcon = computed(() => ({
  [State.HALTED]: 'mdi-stop',
  [State.RUNNING]: 'mdi-play',
  [State.WAITING_INPUT]: 'mdi-pause'
}[currentState.value]));

const btns = ref([
  {
    icon: 'mdi-play',
    text: 'Run',
    fn: () => {
      // Load code
      machine.reset();

      let result = machine.load(codeModel.value);

      if(result === true) {
        outputModel.value = '';
        autoStep();
      } else {
        outputModel.value = 'Error: ' + result.error.toString();
      }
    },
    disabled: computed(() =>
      currentState.value !== State.HALTED || codeModel.value === ''
    )
  },
  {
    icon: 'mdi-stop',
    text: 'Halt',
    fn: () => {
      currentState.value = State.HALTED;
    },
    disabled: computed(() =>
      currentState.value === State.HALTED
    )
  }
]);

// Watchers
watch(currentState, (newState, oldState) => {
  switch(newState) {
    case State.HALTED:
    case State.RUNNING:
      inputModel.value = '';
      break;

    case State.WAITING_INPUT:
      nextTick(() => {
        document.getElementById('input-field').focus();
      });
      break;
  }
})

function updateInput() {
  if(autoEnter.value) {
    machineInput();
  }
}

function updateAutoEnter() {
  inputModel.value = '';
}

function machineInput() {
  machine.store(inputModel.value);
  setTimeout(() => autoStep(), 0);
}

function autoStep() {
  let status = machine.step();

  switch(status.id) {
    case Status.RUNNING:
      outputModel.value += status.stdout;

      currentState.value = State.RUNNING;
      setTimeout(() => autoStep(), 0);
      break;

    case Status.HALTED:
      outputModel.value += status.stdout;
      currentState.value = State.HALTED;
      break;

    case Status.WAITING_INPUT:
      currentState.value = State.WAITING_INPUT;
      break;
  }
}
</script>

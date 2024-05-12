<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <v-textarea
          label="Code"
          name="code"
          v-model="codeModel"
          :disabled="currentState !== State.HALTED"
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
          <v-row>
            <v-col
              v-for="setting in memViewSettings"
              cols="6"
            >
              <v-select
                :label="setting.label"
                :items="setting.items"
                v-model="setting.model"
              ></v-select>
            </v-col>
          </v-row>
          <v-row v-if="machineMemRef.length > 0">
            <v-col>
              <v-sheet
                class="d-flex"
                elevation="2"
                rounded
                style="width: fit-content;"
              >
                <v-sheet
                  class="text-center"
                >
                  <span class="mx-2">
                    Address
                  </span>
                  <v-divider></v-divider>
                  <span class="mx-2">
                    Value
                  </span>
                </v-sheet>
                <v-divider vertical></v-divider>
                <template v-for="(mem, index) in machineMem">
                  <v-sheet
                    class="text-center"
                    :color="index === machinePtrRef ? 'red-lighten-4' : ''"
                  >
                    <span class="mx-2">
                      {{ mem[0] }}
                    </span>
                    <v-divider></v-divider>
                    <span class="mx-2">
                      {{ mem[1] }}
                    </span>
                  </v-sheet>
                  <v-divider vertical></v-divider>
                </template>
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
import { ref, computed, reactive, watch, nextTick } from 'vue';

import { BFMachine } from '@/scripts/brainfuxk/BFMachine';
import { Status } from '@/scripts/brainfuxk/BFStatus';

// Input
const codeModel = ref('');
const inputModel = ref('');

// Output
const outputModel = ref('');

// Settings
const autoEnter = ref(false);

const bases = ['Dec', 'Hex', 'Oct', 'Bin'];
const memViewSettings = ref([
  {
    label: 'Address Base',
    items: bases,
    model: ref(bases[0])
  },
  {
    label: 'Value Base',
    items: bases,
    model: ref(bases[0])
  },
])

// Controls
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

        disableNextStep.value = false;
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
      disableNextStep.value = true;
      currentState.value = State.HALTED;
    },
    disabled: computed(() =>
      currentState.value === State.HALTED
    )
  }
]);

// Machine
const machine = new BFMachine();

// Page
const forceUpdateMem = ref(false);
const machineMemRef = ref(machine.mem);
const machineMem = computed({
  get() {
    // Dummy access to force update
    forceUpdateMem.value;

    const base = {
      [bases[0]]: {
        base: 10,
        prefix: ''
      },
      [bases[1]]: {
        base: 16,
        prefix: '0x'
      },
      [bases[2]]: {
        base: 8,
        prefix: '0o'
      },
      [bases[3]]: {
        base: 2,
        prefix: '0b'
      }
    };

    return machineMemRef.value.map((mem, index) => {
      const indexBase = base[memViewSettings.value[0].model];
      const memBase = base[memViewSettings.value[1].model];

      return [
        indexBase.prefix + index.toString(indexBase.base),
        memBase.prefix + mem.toString(memBase.base)
      ]
    })
  },
  set(value) {
    machineMemRef.value = value;
    forceUpdateMem.value = !forceUpdateMem.value;
  }
});

const forceUpdatePtr = ref(false);
const machinePtrRef = ref(machine.ptr);
const machinePtr = computed({
  get() {
    return machinePtrRef.value;
  },
  set(value) {
    machinePtrRef.value = value;
    forceUpdatePtr.value = !forceUpdatePtr.value;
  }
})

const enum State {
  HALTED,
  RUNNING,
  WAITING_INPUT
}

const currentState = ref(State.HALTED);

const disableNextStep = ref(false);

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
});

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
  if(disableNextStep.value) {
    disableNextStep.value = false;
    return;
  }

  let status = machine.step();
  machineMem.value = machine.mem;
  machinePtrRef.value = machine.ptr;

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

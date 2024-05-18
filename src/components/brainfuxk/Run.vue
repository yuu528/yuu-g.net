<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <v-container>
          <v-row>
            <v-col>
              <v-textarea
                label="Code"
                name="code"
                v-model="codeModel"
                :variant="currentState !== State.HALTED ? 'outlined' : 'filled'"
                :readonly="currentState !== State.HALTED"
                clearable
              ></v-textarea>
            </v-col>
          </v-row>

          <!-- Mark Config -->
          <v-row no-gutters>
            <v-col>
              <v-expansion-panels>
                <v-expansion-panel
                  title="Instruction Settings"
                >
                  <v-expansion-panel-text>
                    <v-container>
                      <v-row no-gutters>
                        <v-select
                          label="Instruction Preset"
                          :items="markPresets.map(p => p.name)"
                          v-model="selectedPreset"
                        ></v-select>
                      </v-row>

                      <v-row no-gutters>
                        <v-col
                          v-for="setting in markSettings"
                          cols="3"
                        >
                          <v-text-field
                            :label="setting.label"
                            density="compact"
                            class="mx-1"
                            :variant="currentState !== State.HALTED || selectedPreset !== 'Custom' ? 'outlined' : 'filled'"
                            :readonly="currentState !== State.HALTED || selectedPreset !== 'Custom'"
                            v-model="setting.model"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <v-btn
                            color="primary"
                            :disabled="currentState !== State.HALTED || selectedPreset !== 'Custom'"
                            @click="updateMarks()"
                            block
                          >Update Marks</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col cols="12" lg="6">
        <v-container>
          <!-- Output -->
          <v-row>
            <v-col>
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

          <!-- Memory View Config -->
          <v-row no-gutters>
            <v-col
              v-for="setting in memViewSettings"
              cols="6"
            >
              <v-select
                :label="setting.label"
                :items="setting.items"
                density="compact"
                class="mx-1"
                v-model="setting.model"
              ></v-select>
            </v-col>
          </v-row>

          <!-- Memory View -->
          <v-row v-if="machineMem.length > 0" no-gutters>
            <v-col>
              <v-sheet
                class="d-flex flex-wrap"
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
                <v-sheet
                  v-for="(mem, index) in machineMem"
                  class="text-center"
                  :color="index === machinePtr ? 'red-lighten-4' : ''"
                >
                  <span class="mx-2">
                    {{ mem[0] }}
                  </span>
                  <v-divider></v-divider>
                  <span class="mx-2">
                    {{ mem[1] }}
                  </span>
                </v-sheet>
              </v-sheet>
            </v-col>
          </v-row>

          <!-- Controls -->
          <v-row>
            <v-col
              v-for="btn in btns"
              :cols="btn.cols || 6"
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

          <!-- Input -->
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
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';

import { BFMachine } from '@/scripts/brainfuxk/BFMachine';
import { BFError } from '@/scripts/brainfuxk/BFError';
import { MarkSpec } from '@/scripts/brainfuxk/MarkSpec';
import { Status } from '@/scripts/brainfuxk/BFStatus';

import { AsyncCall } from '@/scripts/brainfuxk/AsyncCall';

import { newMarkSettingsRef, markPresets } from '@/scripts/brainfuxk/MarkSettingsVue';

AsyncCall.initialize();

// Machine
const machine = new BFMachine();

// States
const enum State {
  HALTED,
  RUNNING,
  WAITING_INPUT,
  PAUSED
}

const currentState = ref(State.HALTED);

const disableNextStep = ref(false);

const statusMsg = computed(() => ({
  [State.HALTED]: 'Halted',
  [State.RUNNING]: 'Running',
  [State.WAITING_INPUT]: 'Waiting for input',
  [State.PAUSED]: 'Paused'
}[currentState.value]));

const statusIcon = computed(() => ({
  [State.HALTED]: 'mdi-stop',
  [State.RUNNING]: 'mdi-play',
  [State.WAITING_INPUT]: 'mdi-pen',
  [State.PAUSED]: 'mdi-pause'
}[currentState.value]));

const stepping = ref(false);

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
]);

const markSettings = newMarkSettingsRef();

const selectedPreset = ref(markPresets[0].name);
updateMarksFromMachine();

// Controls
/*
  Decision Table

                                                disabled
    currentState  | stepping | codeModel |  Run  | Step  | Pause | Halt
  ----------------+----------+-----------+-------+-------+-------|------
          *       |    *     |   empty   | true  | true  | true  |  *
        HALTED    |    *     |    *      | false | false | true  | true
       RUNNING    |  false   |    *      | true  | true  | false | false
    WAITING_INPUT |    *     |    *      | true  | true  | true  | false
        PAUSED    |    *     |    *      | false | false | true  | false
*/
const btns = ref([
  {
    icon: 'mdi-play',
    text: 'Run',
    fn: () => {
      if(currentState.value === State.HALTED) {
        run();
      } else {
        stepping.value = false;
        step();
      }
    },
    disabled: computed(() =>
      codeModel.value === ''
        || currentState.value === State.WAITING_INPUT
        || (currentState.value === State.RUNNING && !stepping.value)
    ),
    cols: 3
  },
  {
    icon: 'mdi-step-forward',
    text: 'Step',
    fn: () => {
      if(currentState.value === State.HALTED) {
        run(true);
      } else {
        stepping.value = true;
        step();
      }
    },
    disabled: computed(() =>
      codeModel.value === ''
        || currentState.value === State.WAITING_INPUT
        || (currentState.value === State.RUNNING && !stepping.value)
    ),
    cols: 3
  },
  {
    icon: 'mdi-pause',
    text: 'Pause',
    fn: () => {
      disableNextStep.value = true;
      currentState.value = State.PAUSED;
    },
    disabled: computed(() =>
      currentState.value !== State.RUNNING || stepping.value
    ),
    cols: 3
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
    ),
    cols: 3
  }
]);

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
    });
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

// Watchers
watch(currentState, (newState, oldState) => {
  switch(newState) {
    case State.HALTED:
    case State.RUNNING:
    case State.PAUSED:
      inputModel.value = '';
      break;

    case State.WAITING_INPUT:
      inputModel.value = '';
      nextTick(() => {
        document.getElementById('input-field').focus();
      });
      break;
  }
});

watch(selectedPreset, (newPreset, oldPreset) => {
  updateMarksByPreset(newPreset);
});

function updateMarksFromMachine() {
  [
    'inc',
    'dec',
    'incVal',
    'decVal',
    'output',
    'input',
    'loopStart',
    'loopEnd'
  ].forEach((key, index) => {
      markSettings.value[index].model = machine.mark[key];
    });
}

function updateMarksByPreset(name: string) {
  if(name === 'Custom') return;

  machine.setMark(markPresets.find(preset => preset.name === name).markSpec);
  updateMarksFromMachine();
}

function updateMarks() {
  machine.setMark(new MarkSpec({
    inc: markSettings.value[0].model,
    dec: markSettings.value[1].model,
    incVal: markSettings.value[2].model,
    decVal: markSettings.value[3].model,
    output: markSettings.value[4].model,
    input: markSettings.value[5].model,
    loopStart: markSettings.value[6].model,
    loopEnd: markSettings.value[7].model
  }));
}

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
  step();
}

function errorHandle(error: BFError) {
  outputModel.value = 'Error: ' + error.error.toString();
}

function run(enableStep?: boolean) {
  // Load code
  machine.reset();

  let result = machine.load(codeModel.value);

  if(result === true) {
    outputModel.value = '';

    disableNextStep.value = false;

    stepping.value = enableStep || false;
    step();
  } else {
    errorHandle(result);
  }
}

function step() {
  if(disableNextStep.value) {
    disableNextStep.value = false;
    return;
  }

  let status = machine.step();
  machineMem.value = machine.mem;
  machinePtr.value = machine.ptr;

  if(status.error !== undefined) {
    errorHandle(status.error);
    currentState.value = State.HALTED;
    return;
  }

  switch(status.id) {
    case Status.RUNNING:
      outputModel.value += status.stdout;

      currentState.value = State.RUNNING;

      if(!stepping.value) {
        AsyncCall.asyncCall(step);
      } else {
        currentState.value = State.PAUSED;
      }
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

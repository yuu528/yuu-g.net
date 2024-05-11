<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <v-textarea
          label="Code"
          name="code"
          v-model="codeModel"
          clearable
          @update:modelValue="updateCode()"
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
                  :disabled="inputDisabled"
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
import { ref, computed, nextTick } from 'vue';

import { BFMachine } from '@/scripts/brainfuxk/BFMachine';
import { Status } from '@/scripts/brainfuxk/BFStatus';

const codeModel = ref('');
const inputModel = ref('');
const autoEnter = ref(false);
const outputModel = ref('');

const statusMsg = ref('Halted');
const statusIcon = ref('mdi-stop');

const inputDisabled = ref(true);

const machine = new BFMachine();

const machineMem = computed(() => machine.mem);

const btns = ref([
  {
    icon: 'mdi-play',
    text: 'Run',
    fn: () => {
      machine.reset();

      let result = machine.load(codeModel.value);

      if(result === true) {
        outputModel.value = '';
        autoStep();
      } else {
        outputModel.value = 'Error: ' + result.error.toString();
      }
    },
    disabled: true
  },
  {
    icon: 'mdi-stop',
    text: 'Halt',
    fn: () => {
      machineHalt();
    },
    disabled: false
  }
]);

function updateCode() {
  btns.value[0].disabled = codeModel.value === '';
}

function updateInput() {
  if(autoEnter.value) {
    machineInput();
  }
}

function updateAutoEnter() {
  inputModel.value = '';
}

function enableInput() {
  inputDisabled.value = false;

  nextTick(() => {
    document.getElementById('input-field').focus();
  });
}

function disableInput() {
  inputDisabled.value = true;
  inputModel.value = '';
}

function machineInput() {
  machine.store(inputModel.value);

  disableInput();

  setTimeout(() => autoStep(), 0);
}

function machineHalt() {
  disableInput();

  statusMsg.value = 'Halted';
  statusIcon.value = 'mdi-stop';
}

function autoStep() {
  let status = machine.step();

  switch(status.id) {
    case Status.RUNNING:
      outputModel.value += status.stdout;

      statusMsg.value = 'Running';
      statusIcon.value = 'mdi-play';

      setTimeout(() => autoStep(), 0);
      break;

    case Status.HALTED:
      outputModel.value += status.stdout;
      machineHalt();
      break;

    case Status.WAITING_INPUT:
      statusMsg.value = 'Waiting for input';
      statusIcon.value = 'mdi-pause';

      enableInput();
      break;
  }
}
</script>

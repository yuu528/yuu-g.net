<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <v-container>
          <v-row>
            <v-col>
              <v-textarea
                label="String"
                name="code"
                v-model="inputModel"
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
                            :variant="selectedPreset !== 'Custom' ? 'outlined' : 'filled'"
                            :readonly="selectedPreset !== 'Custom'"
                            v-model="setting.model"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn
                color="primary"
                block
                @click="convert()"
              >
                Convert
              </v-btn>
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
          <v-row>
            <v-col>
              <v-btn
                color="primary"
                block
                @click="copyOutput()"
              >
                Copy
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>

  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
  >{{ snackbarText }}</v-snackbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { Util } from '@/scripts/brainfuxk/Util';
import { newMarkSettingsRef, markPresets } from '@/scripts/brainfuxk/MarkSettingsVue';

const inputModel = ref('');
const outputModel = ref('');

const snackbar = ref(false);
const snackbarColor = ref('success');
const snackbarText = ref('');

const enum markIndex {
  INC,
  DEC,
  INCVAL,
  DECVAL,
  OUTPUT,
  INPUT,
  LOOPSTART,
  LOOPEND
}

const markSettings = newMarkSettingsRef();

const selectedPreset = ref(markPresets[0].name);
updateMarksByPreset(markPresets[0].name);

watch(selectedPreset, (newPreset, oldPreset) => {
  updateMarksByPreset(newPreset);
});

function updateMarksByPreset(name: string) {
  if(name === 'Custom') return;

  const selected = markPresets.find(p => p.name === name);

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
      markSettings.value[index].model = selected.markSpec[key];
    });
}

function convert() {
  outputModel.value = '';

  const chars = inputModel.value.split('');

  let beforeChar = '';

  chars.forEach((char: string, i: number) => {
    if(beforeChar === char) {
      outputModel.value += markSettings.value[markIndex.OUTPUT].model;
    } else {
      if(i > 0) {
        outputModel.value += markSettings.value[markIndex.INC].model;
      }

      beforeChar = char;

      const charCodeFactor = Util.factor(char.charCodeAt(0));

      charCodeFactor.forEach((factor: number, j: number) => {
        outputModel.value += markSettings.value[markIndex.INCVAL].model.repeat(factor);

        if(j < charCodeFactor.length - 1) {
          outputModel.value += [
            markSettings.value[markIndex.LOOPSTART].model,
            markSettings.value[markIndex.INC].model
          ].join('');
        }
      });

      outputModel.value += [
        markSettings.value[markIndex.DEC].model,
        markSettings.value[markIndex.DECVAL].model,
        markSettings.value[markIndex.LOOPEND].model
      ].join('').repeat(charCodeFactor.length - 1);

      outputModel.value += [
        markSettings.value[markIndex.INC].model.repeat(charCodeFactor.length - 1),
        markSettings.value[markIndex.OUTPUT].model
      ].join('');
    }
  });
}

function copyOutput() {
  if(Util.copyToClipboard(outputModel.value)) {
    snackbarText.value = 'Success';
    snackbar.value = true;
  } else {
    snackbarText.value = 'Failed';
    snackbarColor.value = 'error';
    snackbar.value = true;
  }
}
</script>

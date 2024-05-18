import { ref } from 'vue';

import { MarkSpec } from './MarkSpec';

export const newMarkSettingsRef = () =>
  ref([
    {
      label: 'Inc. Ptr.',
      model: ref('')
    },
    {
      label: 'Dec. Ptr.',
      model: ref('')
    },
    {
      label: 'Inc. Value',
      model: ref('')
    },
    {
      label: 'Dec. Value',
      model: ref('')
    },
    {
      label: 'Output',
      model: ref('')
    },
    {
      label: 'Input',
      model: ref('')
    },
    {
      label: 'Loop Start',
      model: ref('')
    },
    {
      label: 'Loop End',
      model: ref('')
    }
  ]
);

export const markPresets = [
  {
    name: 'Brainfuxk',
    markSpec: new MarkSpec()
  },
  {
    name: 'Ook!',
    markSpec: new MarkSpec(MarkSpec.PRESETS.Ook)
  },
  {
    name: 'Nyaruko',
    markSpec: new MarkSpec(MarkSpec.PRESETS.Nyaruko)
  },
  {
    name: 'Kemono',
    markSpec: new MarkSpec(MarkSpec.PRESETS.Kemono)
  },
  {
    name: 'Jojo',
    markSpec: new MarkSpec(MarkSpec.PRESETS.Jojo)
  },
  {
    name: 'BF-BASIC\'n',
    markSpec: new MarkSpec(MarkSpec.PRESETS.BFBASICn)
  },
  {
    name: 'Misa',
    markSpec: new MarkSpec(MarkSpec.PRESETS.Misa)
  },
  {
    name: 'BrainHakke',
    markSpec: new MarkSpec(MarkSpec.PRESETS.BrainHakke)
  },
  {
    name: 'Gochiusa',
    markSpec: new MarkSpec(MarkSpec.PRESETS.Gochiusa)
  },
  {
    name: 'NekoMimiFu*k',
    markSpec: new MarkSpec(MarkSpec.PRESETS.NekoMimi)
  },
  {
    name: 'nico-lang',
    markSpec: new MarkSpec(MarkSpec.PRESETS.YazawaNico)
  },
  {
    name: 'EiMun!',
    markSpec: new MarkSpec(MarkSpec.PRESETS.Eimun)
  },
  {
    name: 'Custom'
  }
];

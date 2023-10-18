import { JMacro } from './Types';
import macro from './macro.json';

macro as Array<JMacro>;

function findByName(name: string): JMacro | null {
  for (const m of macro) {
    if (m.cmd_zh.length > 0 && m.cmd_zh === name) {
      return m;
    }
    if (m.cmd_en.length > 0 && m.cmd_en === name) {
      return m;
    }
    if (m.cmd_zh_abbr.length > 0 && m.cmd_zh_abbr === name) {
      return m;
    }
    if (m.cmd_en_abbr.length > 0 && m.cmd_en_abbr === name) {
      return m;
    }
  }
  return null;
}

export { findByName }
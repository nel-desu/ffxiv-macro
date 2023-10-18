import FFXIV_Confirm from '../assets/sound/FFXIV_Confirm.mp3';
import FFXIV_Cancel from '../assets/sound/FFXIV_Cancel.mp3';
import FFXIV_Enter_Chat from '../assets/sound/FFXIV_Enter_Chat.mp3';
import SE_1 from '../assets/sound/se_1.mp3';
import SE_2 from '../assets/sound/se_2.mp3';
import SE_3 from '../assets/sound/se_3.mp3';
import SE_4 from '../assets/sound/se_4.mp3';
import SE_5 from '../assets/sound/se_5.mp3';
import SE_6A from '../assets/sound/se_6_a.mp3';
import SE_6B from '../assets/sound/se_6_b.mp3';
import SE_7 from '../assets/sound/se_7.mp3';
import SE_8 from '../assets/sound/se_8.mp3';
import SE_9 from '../assets/sound/se_9.mp3';
import SE_10 from '../assets/sound/se_10.mp3';
import SE_11 from '../assets/sound/se_11.mp3';
import SE_12 from '../assets/sound/se_12.mp3';
import SE_13 from '../assets/sound/se_13.mp3';
import SE_14 from '../assets/sound/se_14.mp3';
import SE_15 from '../assets/sound/se_15.mp3';
import SE_16 from '../assets/sound/se_16.mp3';
import { SoundType } from '../types/SoundType';

let volume = 0;

export function setVolume(v: number) {
  volume = v;
}

export function playSound(type: SoundType) {
  switch (type) {
    case SoundType.CONFIRM:
      playConfirm();
      break;
    case SoundType.CANCEL:
      playCancel();
      break;
    case SoundType.ENTER_CHAT:
      playEnterChat();
      break;
    case SoundType.SE_01:
      playSE_01();
      break;
    case SoundType.SE_02:
      playSE_02();
      break;
    case SoundType.SE_03:
      playSE_03();
      break;
    case SoundType.SE_04:
      playSE_04();
      break;
    case SoundType.SE_05:
      playSE_05();
      break;
    case SoundType.SE_06:
      playSE_06();
      break;
    case SoundType.SE_07:
      playSE_07();
      break;
    case SoundType.SE_08:
      playSE_08();
      break;
    case SoundType.SE_09:
      playSE_09();
      break;
    case SoundType.SE_10:
      playSE_10();
      break;
    case SoundType.SE_11:
      playSE_11();
      break;
    case SoundType.SE_12:
      playSE_12();
      break;
    case SoundType.SE_13:
      playSE_13();
      break;
    case SoundType.SE_14:
      playSE_14();
      break;
    case SoundType.SE_15:
      playSE_15();
      break;
    case SoundType.SE_16:
      playSE_16();
      break;
    default:
      break;
  }
}

export function playConfirm() {
  play(FFXIV_Confirm);
}

export function playCancel() {
  play(FFXIV_Cancel);
}

export function playEnterChat() {
  play(FFXIV_Enter_Chat);
}

export function playSE_01() {
  play(SE_1);
}

export function playSE_02() {
  play(SE_2);
}

export function playSE_03() {
  play(SE_3);
}

export function playSE_04() {
  play(SE_4);
}

export function playSE_05() {
  play(SE_5);
}

export async function playSE_06() {
  if (volume <= 0) {
    return;
  }
  const audio_a = new Audio(SE_6A);
  const audio_b = new Audio(SE_6B);
  audio_a.volume = volume;
  audio_b.volume = volume;

  async function play(audio: HTMLAudioElement, delay: number) {
    return setTimeout(() => {
      audio.currentTime = 0;
      audio.play();
    }, delay);
  }
  let time = 0;
  await play(audio_a, time);
  await play(audio_b, time += 300);
  await play(audio_b, time += 200);
  await play(audio_a, time += 200);
  await play(audio_b, time += 300);
  await play(audio_b, time += 200);
}

export function playSE_07() {
  play(SE_7);
}

export function playSE_08() {
  play(SE_8);
}

export function playSE_09() {
  play(SE_9);
}

export function playSE_10() {
  play(SE_10);
}

export function playSE_11() {
  play(SE_11);
}

export function playSE_12() {
  play(SE_12);
}

export function playSE_13() {
  play(SE_13);
}

export function playSE_14() {
  play(SE_14);
}

export function playSE_15() {
  play(SE_15);
}

export function playSE_16() {
  play(SE_16);
}

function play(url: string) {
  if (volume <= 0) {
    return;
  }
  const audio = new Audio(url);
  audio.volume = volume;
  audio.play();
}
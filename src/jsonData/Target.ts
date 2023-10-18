import { JTarget } from './Types';
import target from './target.json';

target as Array<JTarget>;

const targetMap = new Map([
  ['<t>', '发条太阳'],
  ['<tt>', '发条月亮'],
  ['<me>', 'You'],
  ['<r>', '仙子人偶'],
  ['<1>', '梦魇'],
  ['<2>', '独角兽'],
  ['<3>', '火妖马埃驮恩'],
  ['<4>', '风妖马刻桑图司'],
  ['<5>', '土妖马古尔法克西'],
  ['<6>', '水妖马艾恩巴尔'],
  ['<7>', '雷妖马玛卡布'],
  ['<8>', '冰妖马玻瑞阿斯'],
  ['<f>', '猴面雀儿'],
  ['<lt>', '祭礼鲶鱼精'],
  ['<le>', '小小魔精'],
  ['<la>', '魔界花骨朵'],
  ['<c>', '胖陆行鸟'],
  ['<p>', '朝日小仙女'],
  ['<attack1>', '柔柔之力 普库啦·普奇'],
  ['<attack2>', '绵绵之音 普库嘻·皮叩'],
  ['<attack3>', '茸茸之愈 库普洛·奇普'],
  ['<attack4>', '绒绒之壁 库普迪·库普'],
  ['<attack5>', '软软之弓 库普括·叩吉'],
  ['<bind1>', '黑涡团巧儿陆行鸟'],
  ['<bind2>', '双蛇党巧儿陆行鸟'],
  ['<bind3>', '恒辉队巧儿陆行鸟'],
  ['<stop1>', '卡尔克'],
  ['<stop2>', '布莉娜'],
  ['<square>', '恶魔砖块'],
  ['<circle>', '爆弹仔'],
  ['<cross>', '幼小仙人掌'],
  ['<triangle>', '本本石'],
  ['<mo>', '胖儿陆行鸟'],
  ['<hp>', '65535/65535'],
  ['<hpp>', '100%'],
  ['<mp>', '10000/10000'],
  ['<mpp> ', '100%'],
  ['<job>', '召唤师(90)'],
  ['<pos>', '薰衣草苗圃 ( 13.5  , 15.9 )'],
  ['<buddyhp>', '48094/48094'],
  ['<buddyhpp>', '100%'],
  ['<targethpp>', '100%'],
  ['<targetclass>', '暗黑骑士'],
  ['<focusclass>', '暗黑骑士'],
  ['<flag>', '西拉诺西亚 ( 12.0  , 36.7 )'],
]);


export function findByName(name: string): JTarget | null {
  for (const m of target) {
    if (m.cmd_zh.length > 0 && m.cmd_zh === name) {
      return m;
    }
    if (m.cmd_en.length > 0 && m.cmd_en === name) {
      return m;
    }
  }
  return null;
}

export function setTargetName(cmd_en: string, name: string) {
  targetMap.set(cmd_en, name);
}

export function getTargetName(cmd_en: string): string {
  const name = targetMap.get(cmd_en);
  return name ? name : '';
}

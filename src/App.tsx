import { useEffect, useState, } from 'react'
import { Col, Row, message as antdMsg } from 'antd';
import { say, replace } from './linkshell/Linkshell'
import Window from './component/Window';
import MyCheckBox from './component/MyCheckBox';
import MyTextArea from './component/MyTextArea';
import MyButton from './component/MyButton';
import ChatRoom from './component/ChatRoom';
import ChatInput from './component/ChatInput';
import ChatChannel from './component/ChatChannel';
import MyDivider from './component/MyDivider';
import { playConfirm, playSound, setVolume } from './util/Sound';
import { ChannelType } from './types/ChannelType';
import { Message } from './cmd/Message';
import { SoundType } from './types/SoundType';
import { getTargetName } from './jsonData/Target';
import { createStyles } from 'antd-style';
import MyLink from './component/MyLink';
import './App.css'
import './ffxiv.css'

/**
 * 记录最后一个宏的执行时间
 * 防止多个宏同时执行
 */
let macroExecTime: number = 0;

const useStyles = createStyles(({ token }) => ({
  linkTitle: {
    fontSize: '20px',
    color: token.groupTextColor,
    marginTop: '10px'
  },
}));

function App() {

  const initMessage = [
    Message.createMessage(ChannelType.SYSTEM, '欢迎来到艾欧泽亚！'),
    Message.createMessage(ChannelType.SYSTEM, '感谢您对于最终幻想14的支持，如有问题欢迎使用客服电话和论坛服务。'),
    Message.createMessage(ChannelType.SYSTEM, '请勿相信游戏内任何礼包、福袋性质的网址，谨防被骗。'),
    Message.createMessage(ChannelType.SYSTEM, '发现游戏内玩家使用外挂、代打、出售土地、买卖游戏币、使用非官方允许的第三方软件等违规行为，请及时举报。'),
    Message.createMessage(ChannelType.SYSTEM, '举报方式：官网的违规处理平台进行举报。'),
    Message.createMessage(ChannelType.SYSTEM, '最终幻想14官网：ff.web.sdo.com'),
    Message.createMessage(ChannelType.ECHO, '进入了休息区。'),
    Message.createMessage(ChannelType.ECHO, '当前共有117个队伍正在招募队员，其中有117个队伍符合搜索条件。'),
    Message.createMessage(ChannelType.ECHO, '当前共有115个队伍正在招募队员，其中有115个队伍符合搜索条件。'),
    Message.createMessage(ChannelType.ECHO, '当前共有109个队伍正在招募队员，其中有115个队伍符合搜索条件。'),
    Message.createMessage(ChannelType.EMOTE, `${getTargetName('<me>')}打了个盹。`),
    Message.createMessage(ChannelType.ECHO, '一段时间内没有进行任何操作，已经自动切换为离开状态。'),
    Message.createMessage(ChannelType.ECHO, '当前共有112个队伍正在招募队员，其中有112个队伍符合搜索条件。'),
    Message.createMessage(ChannelType.ECHO, '当前共有102个队伍正在招募队员，其中有102个队伍符合搜索条件。'),
    Message.createMessage(ChannelType.ECHO, '当前共有107个队伍正在招募队员，其中有107个队伍符合搜索条件。'),
    Message.createMessage(ChannelType.ECHO, '当前共有110个队伍正在招募队员，其中有110个队伍符合搜索条件。'),
    Message.createMessage(ChannelType.ECHO, '离开状态已经解除。'),
    Message.createMessage(ChannelType.EMOTE, `${getTargetName('<me>')}伸了个懒腰。`),
  ];

  const initText = '/a 夹击夹击！<se.11><se.11>';

  useEffect(() => {
    setMessages(initMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { styles } = useStyles();

  const [width, setWidth] = useState<string | number>('100%');
  const [inputMacro, setInputMacro] = useState('');
  const [textAreaMacro, setAreaMacro] = useState(initText);
  const [selectedChannel, updateChannel] = useState<ChannelType>(ChannelType.SAY);
  const [messages, setMessages] = useState<Array<Message>>([]);

  // 修改宽度
  const widthChange = (checked: boolean) => {
    playConfirm();
    checked ? setWidth('100%') : setWidth('50%');
  };

  // 打开音效
  const openSE = (checked: boolean) => {
    if (checked) {
      setVolume(0.4);
      playConfirm();
    } else {
      setVolume(0);
    }
  };

  const handleSubmitInput = () => {
    handleMacro(inputMacro);
    setInputMacro('');
  }

  // 执行宏
  const handleExecute = () => {
    handleMacro(textAreaMacro);
  }

  const handleMacro = async (macro: string) => {
    const execTime = new Date().getTime()
    macroExecTime = execTime;

    try {
      const msg = say(macro);
      for (const m of msg) {
        if (execTime !== macroExecTime) {
          return;
        }
        setMessages((prevMessages) => [...prevMessages, m]);
        await handleMessage(m);
      }
    } catch (error) {
      antdMsg.error((error as Error).message)
      console.log(error);
    }
  }

  const handleMessage = async (m: Message) => {
    function wait(timeout: number) {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    }

    if (m.clear) {
      setMessages(() => [...initMessage]);
      return;
    }

    // 修改发言频道
    if (m.checkChannel !== ChannelType.HOLD) {
      updateChannel(m.checkChannel);
      return;
    }
    if (m.channel === ChannelType.HOLD) {
      m.channel = selectedChannel;
    }
    const me = getTargetName('<me>');
    switch (m.channel) {
      case ChannelType.SAY:
      case ChannelType.YELL:
      case ChannelType.SHOUT:
        m.content = `${me}：` + m.content;
        break;
      case ChannelType.PARTY:
      case ChannelType.ALLIANCE:
      case ChannelType.FREECOMPANY:
      case ChannelType.PVPTEAM:
      case ChannelType.LINKSHELL_1:
      case ChannelType.CWLINKSHELL_1:
        m.content = `[${m.channel}]<${me}> ` + m.content;
        break;
      case ChannelType.BEGINNER:
        m.content = `[${m.channel}]${me}：` + m.content;
        break
      case ChannelType.EMOTE:
        m.content = me + m.content;
        break
      default:
        break;
    }

    // 播放音效，同一种音效不能重复三次，总数不能大于 16 个
    if (m.sound.length > 0) {
      m.sound.length = m.sound.length > Message.MAX_SOUND ? Message.MAX_SOUND : m.sound.length;
      const sounds = new Array<SoundType>();
      const soundMap = new Map<SoundType, number>();
      for (const s of m.sound) {
        const num = soundMap.get(s);
        if (num === undefined) {
          soundMap.set(s, 1);
          sounds.push(s);
        } else if (num < 3) {
          soundMap.set(s, num + 1);
          sounds.push(s);
        }
      }

      if (m.channel === ChannelType.PARTY || m.channel === ChannelType.ALLIANCE) {
        for (const s of sounds) {
          playSound(s);
        }
      }
    }

    // 延时
    await wait(m.wait <= 0 ? 20 : m.wait);
  }

  // 将宏替换为当前频道
  const handleReplace = () => {
    const replacedStr = replace(textAreaMacro, selectedChannel);
    setAreaMacro(replacedStr);
  }

  return (
    <>
      <Window
        header={<div>用户宏指令</div>}
        content={
          <div>
            <Row justify="center">
              <Col flex={1} style={{ textAlign: 'left', padding: '0px 10px', marginTop: '10px' }}>
                <ChatRoom width={width} messages={messages} />
                <ChatInput width={width} value={inputMacro} onChange={(e) => setInputMacro(e.currentTarget.value)} onPressEnter={handleSubmitInput} />
                <ChatChannel width={width} onChannelChange={(c) => updateChannel(c)} channel={selectedChannel} />
              </Col>
              <Col flex={1} style={{ textAlign: 'left', padding: '0px 10px', marginTop: '10px' }}>
                <MyTextArea height={430} width={width} value={textAreaMacro} onTextChange={(t) => setAreaMacro(t)} />
                <div style={{ marginTop: '10px' }}>
                  <MyButton onClick={handleExecute} text='执行' width={80} />
                  <MyButton onClick={handleReplace} text='替换为当前频道' width={150} />
                </div>
              </Col>
            </Row>
          </div >
        }
      />
      <Window
        header={<div>系统设置</div>}
        content={
          <div>
            <div>
              <MyCheckBox text='开启音效' onChange={openSE} />
            </div>
          </div>
        }
        contentStyle={{ textAlign: 'left' }}
      />
      <Window
        header={<div>关于</div>}
        content={
          <div>
            <div className={styles.linkTitle}>宏相关</div>
            <MyDivider />
            <MyLink
              tip=' WIKI 用户宏  '
              url='https://ff14.huijiwiki.com/wiki/%E7%94%A8%E6%88%B7%E5%AE%8F'
              content='https://ff14.huijiwiki.com/wiki/用户宏'
            />
            <MyLink
              tip=' WIKI 文本指令  '
              url='https://ff14.huijiwiki.com/wiki/%E6%96%87%E6%9C%AC%E6%8C%87%E4%BB%A4'
              content='https://ff14.huijiwiki.com/wiki/文本指令'
            />
            <MyLink
              tip=' NGA 宏学(第三版)  '
              url='https://nga.178.com/read.php?tid=22108275'
              content='https://nga.178.com/read.php?tid=22108275'
            />
            <div className={styles.linkTitle}>网页资源</div>
            <MyDivider />
            <MyLink
              tip=' 官方铃声  '
              url='https://ff.web.sdo.com/special/maverickplay.html'
              content='https://ff.web.sdo.com/special/maverickplay.html'
            />
            <MyLink
              tip=' 网页特殊字符  '
              url='https://github.com/thewakingsands/ffxiv-axis-font-icons'
              content='https://github.com/thewakingsands/ffxiv-axis-font-icons'
            />
          </div>
        }
        contentStyle={{ textAlign: 'left' }}
      />
    </>
  );
}

export default App;

import React, { useState } from 'react';
import { Modal } from 'antd';
import { createStyles } from 'antd-style';
import { ChannelType } from '../types/ChannelType';
import { playCancel, playConfirm } from '../util/Sound';
import selectChannel from '/src/assets/select-channel.png';

const MODAL_WIDTH = 200;

type ChatChannelProps = {
  width: number | string,
  channel: ChannelType;
  onChannelChange: (channelType: ChannelType) => void;
}

const useStyles = createStyles(({ token }) => ({
  channelContainer: {
    marginTop: '10px',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  channelText: {
    display: 'inline',
    height: '28px',
    lineHeight: '28px',
    color: token.glowTextColor,
    textShadow: token.glowTextShadow,
    margin: '0px 0px 0px 5px',
  },
  channelImage: {
    width: '24px',
    height: '24px',
    marginRight: '10px',
    boxShadow: '0px 0px 3px #000000',
    borderRadius: '12px',
    cursor: 'pointer',
  },
  // 选择频道的弹窗背景颜色
  channelModalBg: {
    width: `${MODAL_WIDTH}px`,
    padding: '5px 5px',
    backgroundColor: token.modalBackground,
    borderRadius: '5px',
    boxShadow: token.modalShadow,
    cursor: 'pointer',
    color: '#eee1c5',
    lineHeight: '28px',
    textShadow: token.textShadow,
    pointerEvents: 'auto',
  },
  // 频道名的左边空出一段距离，用来打勾
  channelSelectHeader: {
    width: '8%',
    display: 'inline-block',
  },
  // 被选择的频道的背景
  channelSelectedBg: {
    width: '80%',
    display: 'inline-block',
    paddingLeft: '8px',
    marginLeft: '-5px',
    borderRadius: '12px',
    backgroundImage: token.channelSelectBg,
  },
  // 未被选择的频道的背景
  channelUnSelectedBg: {
    width: '80%',
    display: 'inline-block',
    paddingLeft: '8px',
    marginLeft: '-5px',
    borderRadius: '12px',
    ':hover': {
      backgroundImage: token.channelHoverBg,
    }
  },
}));

function ChatChannel(props: ChatChannelProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { styles, cx } = useStyles();

  const handleClickChannel = (c: ChannelType) => {
    playConfirm();
    setIsModalOpen(false);
    props.onChannelChange(c);
  }

  const showModal = () => {
    playConfirm();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    playCancel();
    setIsModalOpen(false);
  };

  const modal: () => React.ReactNode = () => {
    const channels: ChannelType[] = [
      ChannelType.SAY,
      ChannelType.PARTY,
      ChannelType.ALLIANCE,
      ChannelType.YELL,
      ChannelType.SHOUT,
      ChannelType.FREECOMPANY,
      ChannelType.BEGINNER,
      ChannelType.LINKSHELL_1,
      ChannelType.CWLINKSHELL_1
    ];

    return (
      <div className={styles.channelModalBg}>
        {channels.map((v, i) => (
          <div key={i} onClick={() => handleClickChannel(v)}>
            <span className={styles.channelSelectHeader}>{props.channel === v ? <>√</> : <></>}</span>
            <span className={props.channel === v ?
              styles.channelSelectedBg :
              styles.channelUnSelectedBg
            }>
              {v}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className={styles.channelContainer} style={{ width: props.width }}>
        <img className={styles.channelImage} src={selectChannel} onClick={showModal} />
        <i className={cx('xiv ime-chs', styles.channelText)} />
        <span className={styles.channelText}>{props.channel}</span>
      </div>

      <Modal
        width={MODAL_WIDTH}
        open={isModalOpen}
        onCancel={handleCancel}
        closeIcon={null}
        footer={null}
        modalRender={modal}
      ></Modal>
    </div>

  );
}

export default ChatChannel;

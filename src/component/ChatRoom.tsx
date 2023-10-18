import { useEffect, useRef, useState } from "react";
import { List } from "antd";
import { createStyles } from "antd-style";
import Scrollbar, { Scrollbars } from "react-custom-scrollbars-2";
import { getChannelColor } from "../cmd/ChannelColor";
import { Message } from "../cmd/Message";

type ChatRoomProps = {
  width: number | string;
  messages: Message[];
}

const useStyles = createStyles(({ token }) => ({
  chatRoomLine: {
    whiteSpace: 'pre-wrap',
    '::selection': {
      backgroundColor: token.textSelection,
    },
  },
}));

function ChatRoom(props: ChatRoomProps) {

  const { styles, theme } = useStyles()
  const scrollbarRef = useRef<Scrollbars | null>(null);
  const [data, setData] = useState<Array<React.ReactElement>>([]);

  useEffect(() => {
    const newData = new Array<React.ReactElement>();
    for (const m of props.messages) {
      newData.push(
        <span
          className={styles.chatRoomLine}
          style={{ color: getChannelColor(m.channel) }}
        >
          {m.content}
        </span>
      )
    }
    setData(newData);
  }, [props.messages]);

  // data 更新时滚动到底部
  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, [data])

  /**
   * 用 css in js 的方式似乎有些问题
   * 所以这里都直接在 style 里写了
   */
  const containerStyle: React.CSSProperties = {
    width: props.width,
    height: '400px',
    backgroundColor: '#00000060',
    boxShadow: '0px 0px 15px #000000d0',
    display: 'inline-block',
    borderRadius: 10,
  };

  // 聊天栏的一行信息
  const lineStyle: React.CSSProperties = {
    margin: '0px',
    padding: '0px 15px',
    width: '100%',
    lineHeight: '24px',
    textAlign: 'left',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    textShadow: theme.textShadow,
  };

  return (
    <Scrollbar
      style={containerStyle}
      ref={scrollbarRef}
      // 滚动条栏内部样式
      renderTrackVertical={
        () => <div style={{
          width: '8px',
          padding: '10px 0px',
          position: 'absolute',
          top: '0', left: '0', right: '0', bottom: '0',
          overflow: 'hidden',
        }} {...props} />
      }
      // 滚动条的样式
      renderThumbVertical={
        () => <div style={{
          height: '20px',
          width: '5px',
          margin: '0px 2px 0px 1px',
          cursor: 'pointer',
          backgroundColor: '#ffffff',
          border: '1px solid #a7834e',
          boxShadow: '0px 0px 10px #87630e',
        }} {...props} />
      }
    >
      <List
        bordered={false}
        dataSource={data}
        locale={{ emptyText: <></> }}
        renderItem={(item, i) => (
          <List.Item
            key={i}
            style={lineStyle}>
            {item}
          </List.Item>
        )}
      />
    </Scrollbar>

  );
}

export default ChatRoom;

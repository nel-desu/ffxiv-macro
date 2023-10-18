import { Input } from "antd";
import { createStyles } from "antd-style";
import { playCancel, playEnterChat } from "../util/Sound";

type ChatInputProps = {
  width: number | string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onPressEnter: () => void,
}

const useStyles = createStyles(({ token }) => ({
  chatInput: {
    height: '30px',
    margin: '0px',
    textAlign: 'left',
    padding: '0px 10px',
    color: token.normalTextColor,
    backgroundColor: '#00000060',
    border: '1px solid #ffffff20',
    boxShadow: '0px 0px 0px #000000d0',
    textShadow: token.textShadow,
    '::selection': {
      backgroundColor: token.textSelection,
    },
    ':hover': {
      border: '1px solid #ffffff20',
      boxShadow: '0px 0px 0px #000000d0',
    },
    ':focus': {
      border: '1px solid #ffffff20',
      boxShadow: '0px 0px 0px #000000d0',
    },
  },
}));

function ChatInput(props: ChatInputProps) {

  const { styles } = useStyles();

  const handlePressEnter = () => {
    props.onPressEnter ? props.onPressEnter() : undefined;
  };

  return (
    <div>
      <Input
        className={styles.chatInput}
        style={{ width: props.width }}
        onFocus={() => playEnterChat()}
        onBlur={() => playCancel()}
        value={props.value}
        onChange={props.onChange}
        onPressEnter={handlePressEnter} />
    </div>
  );
}

export default ChatInput;

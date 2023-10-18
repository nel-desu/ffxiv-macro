import { createStyles } from "antd-style";
import { playCancel, playEnterChat } from "../util/Sound";

type TextAreaProps = {
  height: number;
  width: number | string;
  maxLength?: number;
  value: string;
  onTextChange: (text: string) => void;
};

const useStyles = createStyles(({ token }) => ({
  textArea: {
    height: '430px',
    width: '100%',
    padding: '5px 10px',
    color: token.normalTextColor,
    borderRadius: '5px',
    textShadow: token.textShadow,
    lineHeight: '20px',
    fontFamily: token.fontFamily,
    border: `1px solid ${token.textareaBg}`,
    backgroundColor: token.textareaBg,
    resize: 'none',
    outline: '0px',
    ':focus': {
      border: '1px solid #ffffff',
      boxShadow: '0px 0px 1px #d3a83a, 0 0 8px #d3a83a, 0 0 10px #4a4231',
    },
    ':not(:focus)': {
      border: `1px solid ${token.textareaBg}`,
    },
    '::selection': {
      backgroundColor: token.textSelection,
    },
  },
}), { hashPriority: 'high' });

function MyTextArea(props: TextAreaProps) {

  const { styles } = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onTextChange ? props.onTextChange(e.currentTarget.value) : undefined;
  };

  return (
    <textarea
      className={styles.textArea}
      maxLength={props.maxLength ? props.maxLength : 1000}
      value={props.value}
      onChange={handleChange}
      onFocus={() => playEnterChat()}
      onBlur={() => playCancel()}
    />
  );
}

export default MyTextArea;

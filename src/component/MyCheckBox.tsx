import { useRef, useState } from "react";
import { createStyles } from "antd-style";

type CheckboxProps = {
  text: string;
  onChange?: (checked: boolean) => void;
}

const useStyles = createStyles(({ token }) => ({
  box: {
    cursor: 'pointer',
  },
  checkBoxContainer: {
    width: 12,
    height: 13,
    position: 'relative',
    display: 'inline-block',
  },
  checkBox: {
    width: 13,
    height: 12,
    position: 'absolute',
    backgroundImage: 'linear-gradient(to bottom, #232121 0%, #403c3b 5%, #827c7c 100%)',
    border: '2px solid #5f5d5c',
    boxShadow: '0px 0px 2px #5f5d5c',
    cursor: 'pointer',
    zIndex: 1,
  },
  checkboxBottom: {
    width: 13,
    height: 1,
    position: 'absolute',
    top: 13,
    left: 0,
    backgroundColor: '#676563',
    zIndex: 1,
  },
  effect: {
    width: 9,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 2,
    background: '#ffdf41',
    border: '1px solid #ad822b',
    boxShadow: '0px 0px 5px #ad822b',
    pointerEvents: 'none',
    visibility: 'hidden',
    zIndex: 3,
  },
  text: {
    marginLeft: 5,
    color: token.infoTextColor,
    lineHeight: '40px',
    textShadow: token.textShadow,
  },
}));

function MyCheckBox(props: CheckboxProps) {

  const { styles } = useStyles();
  const [checked, check] = useState(false);
  const checkbox = useRef<HTMLDivElement | null>(null);
  const effect = useRef<HTMLDivElement | null>(null);

  const onclick = () => {
    const isChecked = !checked;

    if (effect.current !== null) {
      if (isChecked) {
        effect.current.style.visibility = 'visible';
      } else {
        effect.current.style.visibility = 'hidden';
      }
    }
    check(isChecked);

    props.onChange ? props.onChange(isChecked) : undefined;
  }

  return (
    <span className={styles.box} ref={checkbox} onClick={onclick}>
      <div className={styles.checkBoxContainer}>
        <div className={styles.checkBox}></div>
        <div className={styles.checkboxBottom}></div>
        <div className={styles.effect} ref={effect}></div>
      </div>
      <span className={styles.text}>{props.text}</span>
    </span>

  );
}

export default MyCheckBox;

import * as React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const TextTransformsComponent: React.FC = () => {
  const [activeTodoList, setActiveTodoList] = React.useState(0);
  const prevNameRef = React.useRef("");

  const LISTS = [
    { id: 0, color: "#1A88F8", name: "Circular" },
    { id: 1, color: "#34C759", name: "Circa" },
    { id: 2, color: "#FF9500", name: "Curial" },
    { id: 3, color: "#AF52DE", name: "Rural" },
    { id: 4, color: "#FF2D55", name: "Auric" },
    { id: 5, color: "#5AC8FA", name: "Lunar" },
  ];

  const [activeList, setActiveList] = React.useState(LISTS[0].name);
  const [previousActiveList, setPreviousActiveList] = React.useState("");

  const letterMatches = React.useMemo(() => {
    if (!activeList) return [];

    const currentChars = activeList.split("");
    const prevChars = previousActiveList.split("");
    const usedIndices = new Set<number>();

    return currentChars.map((char, index) => {
      let matchIndex = -1;

      if (char !== " ") {
        matchIndex = prevChars.findIndex(
          (pc, i) =>
            pc.toLowerCase() === char.toLowerCase() && !usedIndices.has(i),
        );
      }

      let id: string;
      let isShared = false;

      if (matchIndex !== -1) {
        id = `letter-${char.toLowerCase()}-${matchIndex}`;
        usedIndices.add(matchIndex);
        isShared = true;
      } else {
        id = `new-${index}-${char.toLowerCase()}-${Math.random()}`;
      }

      return { char, id, isShared };
    });
  }, [activeList, previousActiveList]);

  React.useEffect(() => {
    const currentName = LISTS[activeTodoList].name;
    if (prevNameRef.current !== currentName) {
      setPreviousActiveList(prevNameRef.current);
      setActiveList(currentName);
      prevNameRef.current = currentName;
    }
  }, [activeTodoList, LISTS]);

  return (
    <StyledContainer>
      <StyledListsContainer>
        {LISTS.map((y) => (
          <motion.div
            key={y.id}
            layout
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
            }}
            style={{ flexShrink: 0, position: "relative" }}
          >
            <TodoListItem
              id={y.id}
              name={y.name}
              color={y.color}
              isActive={activeTodoList === y.id}
              setActiveTodoList={setActiveTodoList}
            />
          </motion.div>
        ))}
      </StyledListsContainer>
      <StyledTextContainer>
        <AnimatedText letterMatches={letterMatches} />
      </StyledTextContainer>
    </StyledContainer>
  );
};

type TodoListProps = {
  id: number;
  name: string;
  color: string;
  isActive: boolean;
  setActiveTodoList: (id: number) => void;
  isEditing?: boolean;
};

const TodoListItem: React.FC<TodoListProps> = (props) => {
  return (
    <StyledTodoListItem
      onClick={() => !props.isEditing && props.setActiveTodoList(props.id)}
    >
      {props.isActive && (
        <ActiveBackground
          layoutId="active-pill"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <TextWrapper isActive={props.isActive}>
        <span>{props.name}</span>
      </TextWrapper>
    </StyledTodoListItem>
  );
};

const springConfig = {
  type: "spring",
  stiffness: 280,
  damping: 32,
  mass: 0.8,
};

const AnimatedText: React.FC<{ letterMatches: any[] }> = ({
  letterMatches,
}) => {
  return (
    <TextContainer>
      <AnimatePresence mode="popLayout" initial={false}>
        {letterMatches.map((item) => (
          <LetterSpan
            key={item.id}
            layout="position"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={springConfig}
          >
            <span>{item.char}</span>
          </LetterSpan>
        ))}
      </AnimatePresence>
    </TextContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 80px;
  background-color: #f5f5f7;
`;

const StyledListsContainer = styled.div`
  display: flex;
  background: #e5e5e7;
  padding: 6px;
  border-radius: 12px;
  gap: 4px;
`;

const StyledTodoListItem = styled(motion.div)`
  position: relative;
  display: flex;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  height: 38px;
  align-items: center;
  justify-content: center;
`;

const ActiveBackground = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: #fff;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const TextWrapper = styled.div<{ isActive: boolean }>`
  position: relative;
  z-index: 2;
  span {
    font-weight: 450;
    font-size: 14px;
    color: ${(props) => (props.isActive ? "#000" : "#86868b")};
    transition: color 0.2s ease;
  }
`;

const StyledTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const TextContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LetterSpan = styled(motion.span)`
  display: inline-block;
  white-space: pre;
  font-size: 80px;
  font-weight: 450;
  color: var(--black);
  letter-spacing: -0.02em;
  will-change: transform, opacity, filter;
`;

export default TextTransformsComponent;

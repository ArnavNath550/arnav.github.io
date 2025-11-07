import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

const TodoComponent: React.FC = () => {
  const [todos, setTodos] = React.useState<
    { todoId: number; todoName: string; completed: boolean }[]
  >([]);
  const [input, setInput] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const todoListRef = React.useRef<HTMLDivElement>(null);
  const deleteTimersRef = React.useRef<
    Map<number, ReturnType<typeof setTimeout>>
  >(new Map());

  const handleSubmit = () => {
    if (!input.trim()) return;
    setIsSubmitting(true);

    const newTodo = {
      todoId: Date.now(),
      todoName: input.trim(),
      completed: false,
    };

    setTimeout(() => {
      setTodos((prev) => [...prev, newTodo]);
      setInput("");
      setIsSubmitting(false);

      setTimeout(() => {
        if (todoListRef.current) {
          todoListRef.current.scrollTop = todoListRef.current.scrollHeight;
        }
        inputRef.current?.focus();
      }, 100);
    }, 100);
  };

  const toggleTodo = (todoId: number) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.todoId === todoId) {
          const newCompleted = !todo.completed;

          // If marking as completed, set timer to delete
          if (newCompleted) {
            const timer = setTimeout(() => {
              setTodos((current) => current.filter((t) => t.todoId !== todoId));
              deleteTimersRef.current.delete(todoId);
            }, 800);
            deleteTimersRef.current.set(todoId, timer);
          } else {
            // If unchecking, clear the delete timer
            const existingTimer = deleteTimersRef.current.get(todoId);
            if (existingTimer) {
              clearTimeout(existingTimer);
              deleteTimersRef.current.delete(todoId);
            }
          }

          return { ...todo, completed: newCompleted };
        }
        return todo;
      }),
    );
  };

  const handleDelete = (todoId: number) => {
    // Clear any pending delete timer
    const existingTimer = deleteTimersRef.current.get(todoId);
    if (existingTimer) {
      clearTimeout(existingTimer);
      deleteTimersRef.current.delete(todoId);
    }

    setTodos((prev) => prev.filter((todo) => todo.todoId !== todoId));
    setIsDeleting(null);
  };

  const handleBackFromDelete = () => {
    setIsDeleting(null);
  };

  // Cleanup timers on unmount
  React.useEffect(() => {
    return () => {
      deleteTimersRef.current.forEach((timer) => clearTimeout(timer));
      deleteTimersRef.current.clear();
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        when: "beforeChildren" as const,
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Container>
      <TodoList ref={todoListRef}>
        <AnimatePresence>
          {todos.map((todo) => (
            <StyledTodoItem
              key={todo.todoId}
              layout
              layoutId={`todo-${todo.todoId}`}
              $completed={todo.completed}
              initial={{ opacity: 0.85, scale: 0.95, y: 10 }}
              animate={{
                opacity: todo.completed ? 0.5 : 1,
                scale: 1,
                y: 0,
              }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 50,
              }}
            >
              <AnimatePresence mode="wait">
                {isDeleting === todo.todoId ? (
                  <motion.div
                    key="delete-mode"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    initial={{ opacity: 0, filter: "blur(2px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(2px)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <StyledTodoIcon
                      fill="#555"
                      width="18px"
                      height="18px"
                      viewBox="0 0 256 256"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ transform: "rotate(-90deg)", cursor: "pointer" }}
                      onClick={handleBackFromDelete}
                    >
                      <path d="M208,172a11.96187,11.96187,0,0,1-8.48535-3.51465L128,96.9707,56.48535,168.48535a12.0001,12.0001,0,0,1-16.9707-16.9707l80-80a11.99975,11.99975,0,0,1,16.9707,0l80,80A12,12,0,0,1,208,172Z"></path>
                    </StyledTodoIcon>
                    <DestructiveButton
                      onClick={() => handleDelete(todo.todoId)}
                    >
                      Remove
                    </DestructiveButton>
                  </motion.div>
                ) : (
                  <motion.div
                    key="normal-mode"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    initial={{ opacity: 0, filter: "blur(2px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(2px)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <StyledCircle
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => toggleTodo(todo.todoId)}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="21.5"
                        stroke="#555"
                        strokeWidth="5"
                        initial={{ fill: "transparent" }}
                        animate={{
                          fill: todo.completed ? "#1e1e1e" : "transparent",
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      />
                      <motion.path
                        d="M14 24 L20 30 L34 16"
                        stroke="#ffffff"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: todo.completed ? 1 : 0,
                          opacity: todo.completed ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                      />
                    </StyledCircle>
                    <StyledTodoIcon
                      strokeLinejoin="round"
                      viewBox="0 0 16 16"
                      onClick={() => setIsDeleting(todo.todoId)}
                      style={{ cursor: "pointer" }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z"
                        fill="#555"
                      ></path>
                    </StyledTodoIcon>
                  </motion.div>
                )}
              </AnimatePresence>
              <TodoText>
                {todo.todoName}
                <Strikethrough
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: todo.completed ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                />
              </TodoText>
            </StyledTodoItem>
          ))}
        </AnimatePresence>
        {todos.length === 0 ? (
          <StyledTodoEmptyContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/*@ts-ignore*/}
            <StyledTodoEmptyHeading variants={textVariants}>
              (Back to Basics)
            </StyledTodoEmptyHeading>
            {/*@ts-ignore*/}
            <StyledTodoEmptyDescription variants={textVariants}>
              A basic, smoothly animated todo list.. <br /> because sometimes we
              need to go back to basics.
            </StyledTodoEmptyDescription>
          </StyledTodoEmptyContainer>
        ) : null}
      </TodoList>

      <StyledTodoInputContainer
        layoutId="input-container"
        animate={{
          opacity: isSubmitting ? 0.5 : 1,
          scale: isSubmitting ? 0.98 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 50,
        }}
      >
        <StyledTodoInput
          ref={inputRef}
          placeholder="Type something interesting here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={isSubmitting}
        />
        {!isSubmitting && (
          <StyledTodoSubmit
            onClick={handleSubmit}
            whileTap={{ scale: 0.95 }}
            whileHover={{ opacity: 0.85 }}
          >
            <svg
              fill="#fff"
              width="18px"
              height="18px"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M208,172a11.96187,11.96187,0,0,1-8.48535-3.51465L128,96.9707,56.48535,168.48535a12.0001,12.0001,0,0,1-16.9707-16.9707l80-80a11.99975,11.99975,0,0,1,16.9707,0l80,80A12,12,0,0,1,208,172Z" />
            </svg>
          </StyledTodoSubmit>
        )}
      </StyledTodoInputContainer>
    </Container>
  );
};

export default TodoComponent;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  position: relative;
  overflow: hidden;
`;

const TodoList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 120px;
  padding-top: 20px;
  gap: 10px;
  overflow-y: auto;
  flex: 1;
`;

const sharedBoxStyle = `
  background-color: #fff;
  border-radius: 9999px;
  max-width: 450px;
  width: 90%;
  height: 60px;
  border: 1px solid #e5e5e5;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 15px;
  font-weight: 450;
  text-align: center;
  max-height: 55px;
  height: auto;
  flex-shrink: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  gap: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;

const StyledTodoInputContainer = styled(motion.div)`
  background-color: #fff;
  padding: 14px 18px;
  border-radius: 9999px;
  max-width: 450px;
  width: 90%;
  height: 60px;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%) !important;
  bottom: 40px;
  z-index: 10;
`;

const StyledTodoInput = styled.input`
  outline: none;
  width: 90%;
  font-family: var(--primaryFont);
  border: none;
  font-size: 15px;
  font-weight: 450;
  background: transparent;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledTodoSubmit = styled(motion.div)`
  background-color: #1e1e1e;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTodoItem = styled(motion.div)<{ $completed: boolean }>`
  ${sharedBoxStyle}
  font-size: 15px;
  font-weight: 450;
  text-align: center;
  min-height: 60px;
  height: auto;
  flex-shrink: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  pointer-events: ${(props) => (props.$completed ? "none" : "auto")};
`;

const StyledCircle = styled(motion.svg)`
  cursor: pointer;
  transition: ease 0.2s all;
  &:hover {
    opacity: 0.7;
  }
`;

const TodoText = styled(motion.div)`
  position: relative;
  flex: 1;
  text-align: left;
  padding-left: 10px;
`;

const Strikethrough = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: -85px;
  right: -25px;
  height: 2px;
  background-color: #acacac;
  transform-origin: left;
`;

const StyledTodoIcon = styled.svg`
  width: 18px;
  height: 18px;
  transition: ease 0.2s all;
  &:hover {
    opacity: 0.7;
  }
`;

const DestructiveButton = styled.button`
  background-color: #ec0606;
  color: #fff;
  height: 45px;
  border: 0px;
  border-radius: 999px;
  padding-left: 15px;
  padding-right: 15px;
  font-weight: 480;
  font-family: var(--primaryFont);
  transition: ease 0.2s all;
  cursor: pointer;
  &:hover {
    background-color: #d50404;
  }
  &:active {
    background-color: #b50303;
  }
`;

const StyledTodoEmptyContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 450px;
  gap: 10px;
`;

const StyledTodoEmptyHeading = styled(motion.div)`
  font-size: 1rem;
  font-weight: 500;
  color: #0d0d0d;
  font-family: var(--monoFont);
`;

const StyledTodoEmptyDescription = styled(motion.div)`
  font-size: 1rem;
  color: #555;
  line-height: 25px;
  font-family: var(--monoFont);
  font-weight: 400;
`;

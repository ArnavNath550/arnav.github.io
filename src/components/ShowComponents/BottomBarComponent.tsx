import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

const BottomBarComponent: React.FC = () => {
  const [hoverX, setHoverX] = React.useState(0);
  const [hoverWidth, setHoverWidth] = React.useState(40);
  const [isHovered, setIsHovered] = React.useState(false);

  const barRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const [BAR_WIDTH, setBarWidth] = React.useState(280);
  const [BAR_HEIGHT, setBarHeight] = React.useState(48);
  const [BAR_RADIUS, setBarRadius] = React.useState(50);

  const items = ["Home", "Deployments", "Inbox"];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;

    const { left } = barRef.current.getBoundingClientRect();
    const x = e.clientX - left;

    let closestItemIndex: number | null = null;
    let closestDistance = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const center = rect.left + rect.width / 2 - left;
      const distance = Math.abs(center - x);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestItemIndex = index;
      }
    });

    const SNAP_THRESHOLD = 40;

    if (
      closestItemIndex !== null &&
      itemRefs.current[closestItemIndex] &&
      closestDistance < SNAP_THRESHOLD
    ) {
      const rect = itemRefs.current[closestItemIndex]!.getBoundingClientRect();
      const { left } = barRef.current.getBoundingClientRect();
      const center = rect.left + rect.width / 2 - left;
      setHoverX(center);
      setHoverWidth(rect.width);
    } else {
      setHoverX(x);
      setHoverWidth(40);
    }

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [commandMenuOpen, setCommandMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [menuItems] = React.useState([
    {
      headerName: "Developer",
      items: [
        { name: "Search Projects...", shortcuts: ["CMD", "P"] },
        { name: "Create new Project", shortcuts: ["CMD", "N"] },
        { name: "Search Repositories", shortcuts: ["CMD", "S"] },
        { name: "Create New Repositories", shortcuts: ["CMD", "ALT", "N"] },
      ],
    },
    {
      headerName: "Teams",
      items: [
        { name: "Search Teams...", shortcuts: ["CMD", "T"] },
        { name: "Create New Team", shortcuts: ["CMD", "ALT", "T"] },
      ],
    },
  ]);

  // Derived filtered items based on search
  const filteredMenuItems = React.useMemo(() => {
    if (searchQuery.trim() === "") return menuItems;
    const lower = searchQuery.toLowerCase();

    return menuItems
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.name.toLowerCase().includes(lower),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery, menuItems]);

  // Adjust BAR_HEIGHT dynamically based on number of results
  React.useEffect(() => {
    if (!commandMenuOpen) {
      setBarWidth(280);
      setBarHeight(48);
      setBarRadius(50);
      return;
    }

    const totalItems = filteredMenuItems.reduce(
      (acc, section) => acc + section.items.length,
      0,
    );

    if (searchQuery.trim() === "") {
      setBarHeight(450);
    } else {
      const minHeight = 200;
      const itemHeight = 40;
      const newHeight = Math.min(
        500,
        Math.max(minHeight, totalItems * itemHeight + 150),
      );
      setBarHeight(newHeight);
    }

    setBarWidth(450);
    setBarRadius(20);
  }, [commandMenuOpen, filteredMenuItems, searchQuery]);

  // ✅ Keyboard shortcuts: Cmd/Ctrl + K to open, Esc to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd + K (Mac) or Ctrl + K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandMenuOpen(true);
      }

      // Escape to close
      if (e.key === "Escape") {
        setCommandMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Container>
      <StyledBottomBar
        ref={barRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ width: 0, height: 0 }}
        animate={{
          width: BAR_WIDTH,
          height: BAR_HEIGHT,
          borderRadius: BAR_RADIUS,
        }}
        transition={{
          duration: 0.25,
          type: "spring",
          stiffness: 260,
          damping: 30,
        }}
      >
        <AnimatePresence mode="wait">
          {!commandMenuOpen && (
            <StyledBottomBarContent
              as={motion.div}
              key="bottom-bar"
              variants={{
                hidden: { opacity: 1 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 },
                },
                exit: {
                  opacity: 0,
                  transition: { staggerChildren: 0.05 },
                },
              }}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {items.map((item, index) => (
                <StyledBottomBarItem
                  key={item}
                  ref={(el) => (itemRefs.current[index] = el)}
                  as={motion.div}
                  variants={{
                    hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)" },
                    exit: { opacity: 0, y: 10, filter: "blur(5px)" },
                  }}
                >
                  {item}
                </StyledBottomBarItem>
              ))}
            </StyledBottomBarContent>
          )}

          {commandMenuOpen && (
            <StyledCommandMenuInterface key="command-menu">
              <StyledCommandMenuInputContainer
                initial={{ y: 8, filter: "blur(5px)" }}
                animate={{ y: 0, filter: "blur(0px)" }}
                exit={{ y: 8, filter: "blur(5px)" }}
                transition={{ duration: 0.2 }}
              >
                <StyledCommandMenuInput
                  placeholder="Search for a command"
                  value={searchQuery}
                  autoFocus={true}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </StyledCommandMenuInputContainer>

              <StyledCommandMenuList
                initial={{ y: 0, filter: "blur(5px)" }}
                animate={{ y: 0, filter: "blur(0px)" }}
                exit={{ y: 0, filter: "blur(5px)" }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                {filteredMenuItems.length > 0 ? (
                  filteredMenuItems.map((section) => (
                    <div
                      key={section.headerName}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        marginTop: 15,
                      }}
                    >
                      <StyledHeaderName>{section.headerName}</StyledHeaderName>
                      {section.items.map((item) => (
                        <StyledCommandMenuListItem key={item.name}>
                          <div>{item.name}</div>
                          <StyledCommandMenuShortcuts>
                            {item.shortcuts.map((key) => (
                              <StyledCommandMenuShortcut key={key}>
                                {key === "CMD" ? (
                                  <span>⌘</span>
                                ) : key === "ALT" ? (
                                  <span>⌥</span>
                                ) : (
                                  <span>{key}</span>
                                )}
                              </StyledCommandMenuShortcut>
                            ))}
                          </StyledCommandMenuShortcuts>
                        </StyledCommandMenuListItem>
                      ))}
                    </div>
                  ))
                ) : (
                  <StyledNoResults>No matching commands</StyledNoResults>
                )}
              </StyledCommandMenuList>
            </StyledCommandMenuInterface>
          )}
        </AnimatePresence>

        {!commandMenuOpen && (
          <StyledBottomOverlayGradient
            animate={{
              opacity: isHovered ? 1 : 0,
              left: hoverX - hoverWidth / 2,
              width: hoverWidth,
            }}
            transition={{ type: "spring", stiffness: 80, duration: 0.2 }}
          />
        )}
      </StyledBottomBar>
    </Container>
  );
};

export default BottomBarComponent;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const StyledBottomBar = styled(motion.div)`
  background-color: #0d0d0d;
  position: relative;
  overflow: hidden;
  box-shadow: 1px 3px 5px 1px #ccc;
`;

const StyledBottomBarContent = styled(motion.div)`
  padding: 10px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  z-index: 2;
  position: relative;
`;

const StyledBottomBarItem = styled(motion.div)`
  color: #fff;
  font-size: 15px;
  font-weight: 450;
  padding: 5px;
  cursor: pointer;
  position: relative;
  z-index: 3;
`;

const StyledBottomOverlayGradient = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, #0d0d0d, #3b3b3b, #0d0d0d);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
`;

const StyledCommandMenuInterface = styled(motion.div)`
  height: 100%;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 0 auto;
  position: relative;
`;

const StyledCommandMenuInputContainer = styled(motion.div)`
  width: 100%;
  border: 0px;
  border-bottom: 1px solid #2c2c2c;
  padding-bottom: 15px;
  margin-top: 5px;
  padding-left: 30px;
  padding-right: 30px;
`;

const StyledCommandMenuInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: 0px;
  font-size: 1.2rem;
  outline: none;
  color: #fff;
  font-family: "Inter Variable", sans-serif;
`;

const StyledCommandMenuList = styled(motion.div)`
  padding-left: 30px;
  padding-right: 30px;
`;

const StyledHeaderName = styled.span`
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
  font-weight: 480;
  color: #aeaeae;
`;

const StyledCommandMenuListItem = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 420;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #d0cdcd;
  &:hover {
    background-color: #151515;
    color: #fff;
  }
`;

const StyledCommandMenuShortcuts = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const StyledCommandMenuShortcut = styled.div`
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #252525;
  padding: 2.5px 5px;
  font-weight: 400;
  box-shadow: 0px 2px 2px #000;
`;

const StyledNoResults = styled.div`
  color: #888;
  font-size: 14px;
  padding: 20px 10px;
  text-align: center;
`;

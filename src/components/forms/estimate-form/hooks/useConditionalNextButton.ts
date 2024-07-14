const useConditionalNextButton = (tab: number, tabCount: number) => {
  const lastIndex = tabCount - 1;
  if (tab !== lastIndex) {
    return true;
  }
  return false;
};

export default useConditionalNextButton;

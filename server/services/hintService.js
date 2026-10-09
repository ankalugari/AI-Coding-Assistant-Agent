function getHintInstruction(message, oldMessages) {
  let hintLevel = 1;
  const currentMessage = message.toLowerCase();
  const asksForMore =
    currentMessage.includes('another hint') ||
    currentMessage.includes('more hint') ||
    currentMessage.includes('next hint') ||
    currentMessage.includes('one more') ||
    currentMessage.includes('next level');

  let lastHintLevel = 0;
  for (let i = 0; i < oldMessages.length; i++) {
    const item = oldMessages[i];

    if (
      item.role === 'assistant' &&
      item.content.includes('[HINT_LEVEL:')
    ) {
      const match = item.content.match(
        /\[HINT_LEVEL:(\d+)\]/
      );

      if (match) {
        lastHintLevel = Number(match[1]);
      }
    }
  }

  if (asksForMore) {
    hintLevel = lastHintLevel + 1;
  } else if (lastHintLevel > 0) {
    hintLevel = lastHintLevel;
  }

  if (hintLevel > 4) {
    hintLevel = 4;
  }

  const instructions = {
    1: 'Give a conceptual hint. Explain what to think about without revealing the algorithm.',
    2: 'Give an approach hint. Explain the general strategy without code.',
    3: 'Give an algorithm hint in clear steps. Do not provide complete code.',
    4: 'Give an implementation hint. Explain suitable data structures and important steps, but do not provide the full solution.',
  };

  return {
    hintLevel,
    instruction: instructions[hintLevel],
  };
}

module.exports = {
  getHintInstruction,
};

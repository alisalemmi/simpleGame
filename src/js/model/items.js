const state = {
  samples: [],
  items: [],
  total: 0,
  score: {
    correct: 0,
    wrong: 0
  }
};

/**
 * select 3 different item randomly and return them
 */
export const selectSample = () => {
  while (state.samples.length < 3) {
    const r = Math.floor(Math.random() * 8 + 1);
    if (!state.samples.includes(r)) state.samples.push(r);
  }

  return state.samples;
};

/**
 * select item randomly for filling in puzzle
 * @param {Number} n number of item in puzzle
 */
export const selectItem = (n = 36) => {
  for (let i = 0; i < n; i++) {
    const r = Math.floor(Math.random() * 8 + 1);
    state.items.push({ type: r, select: false });

    if (state.samples.includes(r)) state.total++;
  }

  if (state.total !== 0) return state.items;
  return selectItem();
};

/**
 * check that item whith this index is selected before
 * @param {Number} index index of item
 */
export const isSelected = index => state.items[index].select;

/**
 * select item with this index.
 * return [isCorrect, score].
 * second item in array is either number of correct or wrong.
 * @param {Number} index index of item
 */
export const select = index => {
  state.items[index].select = true;

  if (state.samples.includes(state.items[index].type)) {
    return [true, ++state.score.correct];
  } else {
    return [false, ++state.score.wrong];
  }
};

/**
 * check that all of item is found.
 * return an array that first item is an array and second item is final score of game.
 */
export const checkFinish = () => {
  if (state.total === state.score.correct)
    return [
      true,
      Math.floor(
        ((state.score.correct - state.score.wrong / 3) / state.total) * 10000
      ) / 100
    ];
  else return [false];
};

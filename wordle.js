const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
//const dictionary = require("./dictionary.json");

const allWords = require("./words.json");
const length = 5;
const exclude = argv.exclude ? argv.exclude.split(",") : [];
const excludeRegex = exclude.length
  ? new RegExp(`^[^${exclude.join("")}]+$`)
  : null;
const include = argv.include ? argv.include.split(",") : [];
const includeRegex = include.length
  ? new RegExp(`^${include.map((c) => `(?=.*${c})`).join("")}.+`)
  : null;
const order = argv.order
  ? argv.order.split(",").reduce((carry, char, index) => {
      if (char !== "") {
        carry[index] = char;
      }
      return carry;
    }, {})
  : {};
const seen = argv.seen ? argv.seen.split(",") : [];

function isCorrectLength(word) {
  return word.length === length;
}

function hasExcludedLetters(word) {
  return !!excludeRegex && !excludeRegex.test(word);
}

function hasAllIncludedLetters(word) {
  return !includeRegex || includeRegex.test(word);
}

function hasLettersInCorrectOrder(word) {
  if (Object.keys(order) < 1) {
    return true;
  }

  return Object.keys(order).every((letterIndex) => {
    return word[letterIndex] === order[letterIndex];
  });
}

function hasWordBeenSeen(word) {
  return seen.includes(word);
}

function filterWords(words) {
  return words.filter((word) => {
    if (!isCorrectLength(word)) {
      return false;
    }

    if (hasExcludedLetters(word)) {
      return false;
    }

    if (!hasAllIncludedLetters(word)) {
      return false;
    }

    if (!hasLettersInCorrectOrder(word)) {
      return false;
    }

    if (hasWordBeenSeen(word)) {
      return false;
    }

    return true;
  });
}

function buildLetterValues(words) {
  const letterValues = words.reduce(
    (carry, word) => {
      let seen = {};
      word.split("").forEach((letter, index) => {
        if (!seen[letter]) {
          carry[letter].total++;
        }

        carry[letter][index]++;
        seen[letter] = true;
      });
      return carry;
    },
    {
      a: {
        char: "a",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      b: {
        char: "b",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      c: {
        char: "c",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      d: {
        char: "d",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      e: {
        char: "e",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      f: {
        char: "f",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      g: {
        char: "g",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      h: {
        char: "h",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      i: {
        char: "i",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      j: {
        char: "j",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      k: {
        char: "k",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      l: {
        char: "l",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      m: {
        char: "m",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      n: {
        char: "n",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      o: {
        char: "o",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      p: {
        char: "p",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      q: {
        char: "q",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      r: {
        char: "r",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      s: {
        char: "s",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      t: {
        char: "t",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      u: {
        char: "u",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      v: {
        char: "v",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      w: {
        char: "w",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      x: {
        char: "x",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      y: {
        char: "y",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      z: {
        char: "z",
        total: 0,
        value: 1,
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    }
  );

  const allLetters = Object.keys(letterValues);
  allLetters.sort((a, b) => {
    const aVal = letterValues[a].total;
    const bVal = letterValues[b].total;

    if (aVal < bVal) {
      return -1;
    } else if (aVal > bVal) {
      return 1;
    } else {
      return 0;
    }
  });

  allLetters.forEach((letter, index) => {
    const letterValue = index + 1;
    letterValues[letter].value = letterValue;
  });

  return letterValues;
}

function buildCommonLetterPositions(letterValues) {
  return Object.values(letterValues).reduce(
    (carry, letterValue) => {
      return carry.map((currChar, index) => {
        const currValue = letterValues[currChar][index];
        const newValue = letterValue[index];

        if (newValue > currValue) {
          return letterValue.char;
        } else {
          return currChar;
        }
      });
    },
    ["a", "a", "a", "a", "a"]
  );
}

function buildWordValue(word, letterValues, commonLetterPositions) {
  const seen = {};

  return word.split("").reduce((carry, letter, index) => {
    let newTotal = carry;

    if (letter === commonLetterPositions[index]) {
      newTotal++;
    }

    if (!seen[letter]) {
      seen[letter] = true;
      newTotal += letterValues[letter].value;
    }

    return newTotal;
  }, 0);
}

function buildWordValues(words, letterValues, commonLetterPositions) {
  return words.reduce((carry, word) => {
    carry[word] = buildWordValue(word, letterValues, commonLetterPositions);
    return carry;
  }, {});
}

function buildSortFunction(wordValues) {
  return (a, b) => {
    const aVal = wordValues[a];
    const bVal = wordValues[b];

    if (aVal < bVal) {
      return 1;
    } else if (aVal > bVal) {
      return -1;
    } else {
      return 0;
    }
  };
}

function main() {
  const filteredWords = filterWords(allWords);
  const letterValues = buildLetterValues(filteredWords);
  const commonLetterPositions = buildCommonLetterPositions(letterValues);
  const wordValues = buildWordValues(
    filteredWords,
    letterValues,
    commonLetterPositions
  );
  const sortFunc = buildSortFunction(wordValues);

  filteredWords.sort(sortFunc);

  if (filteredWords.length > 0) {
    /*
    const topTen = filteredWords.slice(0, 10);
    console.log(
      topTen
        .map((word, index) => `${index + 1}) ${word} - ${wordValues[word]}`)
        .join("\n")
    );
    */
    console.log(filteredWords[0]);
  } else {
    console.log("No words found");
  }
}

main();

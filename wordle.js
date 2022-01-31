const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const dictionary = require("./dictionary.json");

const allWords = Object.keys(dictionary);
const length = argv.length || 5;
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
  return words.reduce(
    (carry, word) => {
      word.split("").forEach((letter) => {
        carry[letter]++;
      });
      return carry;
    },
    {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
      h: 0,
      i: 0,
      j: 0,
      k: 0,
      l: 0,
      m: 0,
      n: 0,
      o: 0,
      p: 0,
      q: 0,
      r: 0,
      s: 0,
      t: 0,
      u: 0,
      v: 0,
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    }
  );
}

function buildWordValue(word, letterValues) {
  const seen = {};

  return word.split("").reduce((carry, letter) => {
    if (!seen[letter]) {
      seen[letter] = true;
      return carry + letterValues[letter];
    } else {
      return carry;
    }
  }, 0);
}

function buildWordValues(words, letterValues) {
  return words.reduce((carry, word) => {
    carry[word] = buildWordValue(word, letterValues);
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
  const wordValues = buildWordValues(filteredWords, letterValues);
  const sortFunc = buildSortFunction(wordValues);

  filteredWords.sort(sortFunc);

  if (filteredWords.length > 0) {
    const word = filteredWords[0];
    console.log(`${word}\n\n${dictionary[word]}`);
  } else {
    console.log("No words found");
  }
}

main();

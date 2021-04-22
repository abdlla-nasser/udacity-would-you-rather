let users = (newUser = null) => {
  let localUsers = JSON.parse(localStorage.getItem("users"));
  if (newUser) {
    localUsers = { ...localUsers, ...newUser };
    localStorage.setItem("users", JSON.stringify(localUsers));
    return localUsers;
  }
  if (localUsers && Object.entries(localUsers)) {
    return localUsers;
  } else {
    let users = {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL: "",
        answers: {
          "8xf0y6ziyjabvozdd253nd": "optionOne",
          "6ni6ok3ym7mf1p33lnez": "optionTwo",
          am8ehyc8byjqgar0jgpub9: "optionTwo",
          loxhs1bqm25b708cmbf3g: "optionTwo",
        },
        questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
      },
      tylermcginnis: {
        id: "tylermcginnis",
        name: "Tyler McGinnis",
        avatarURL: "",
        answers: {
          vthrdm985a262al8qx3do: "optionOne",
          xj352vofupe1dqz9emx13r: "optionTwo",
        },
        questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
      },
      johndoe: {
        id: "johndoe",
        name: "John Doe",
        avatarURL: "",
        answers: {
          xj352vofupe1dqz9emx13r: "optionOne",
          vthrdm985a262al8qx3do: "optionTwo",
          "6ni6ok3ym7mf1p33lnez": "optionTwo",
        },
        questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
      },
    };
    localStorage.setItem("users", JSON.stringify(users));
    return users;
  }
};
let questions = (newQuestion) => {
  let localQuestions = JSON.parse(localStorage.getItem("questions"));
  if (newQuestion) {
    localQuestions = { ...localQuestions, ...newQuestion };
    localStorage.setItem("questions", JSON.stringify(localQuestions));
    return localQuestions;
  }
  if (localQuestions && Object.entries(localQuestions)) {
    return localQuestions;
  } else {
    let questions = {
      "8xf0y6ziyjabvozdd253nd": {
        id: "8xf0y6ziyjabvozdd253nd",
        author: "sarahedo",
        timestamp: 1467166872634,
        optionOne: {
          votes: ["sarahedo"],
          text: "have horrible short term memory",
        },
        optionTwo: {
          votes: [],
          text: "have horrible long term memory",
        },
      },
      "6ni6ok3ym7mf1p33lnez": {
        id: "6ni6ok3ym7mf1p33lnez",
        author: "johndoe",
        timestamp: 1468479767190,
        optionOne: {
          votes: [],
          text: "become a superhero",
        },
        optionTwo: {
          votes: ["johndoe", "sarahedo"],
          text: "become a supervillain",
        },
      },
      am8ehyc8byjqgar0jgpub9: {
        id: "am8ehyc8byjqgar0jgpub9",
        author: "sarahedo",
        timestamp: 1488579767190,
        optionOne: {
          votes: [],
          text: "be telekinetic",
        },
        optionTwo: {
          votes: ["sarahedo"],
          text: "be telepathic",
        },
      },
      loxhs1bqm25b708cmbf3g: {
        id: "loxhs1bqm25b708cmbf3g",
        author: "tylermcginnis",
        timestamp: 1482579767190,
        optionOne: {
          votes: [],
          text: "be a front-end developer",
        },
        optionTwo: {
          votes: ["sarahedo"],
          text: "be a back-end developer",
        },
      },
      vthrdm985a262al8qx3do: {
        id: "vthrdm985a262al8qx3do",
        author: "tylermcginnis",
        timestamp: 1489579767190,
        optionOne: {
          votes: ["tylermcginnis"],
          text: "find $50 yourself",
        },
        optionTwo: {
          votes: ["johndoe"],
          text: "have your best friend find $500",
        },
      },
      xj352vofupe1dqz9emx13r: {
        id: "xj352vofupe1dqz9emx13r",
        author: "johndoe",
        timestamp: 1493579767190,
        optionOne: {
          votes: ["johndoe"],
          text: "write JavaScript",
        },
        optionTwo: {
          votes: ["tylermcginnis"],
          text: "write Swift",
        },
      },
    };
    localStorage.setItem("questions", JSON.stringify(questions));
    return questions;
  }
};

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _saveNewUser({ id, name, avatarURL }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let newUser = {
        [id]: {
          id,
          name,
          avatarURL,
          answers: {},
          questions: [],
        },
      };
      let newUsers = users(newUser);
      localStorage.setItem("users", JSON.stringify(newUsers));
      resolve(newUsers);
    }, 1000);
  });
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ ...users() });
    }, 1000);
  });
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ ...questions() });
    }, 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function _saveQuestion(question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);
    setTimeout(() => {
      let newQuestions = questions({
        [formattedQuestion.id]: formattedQuestion,
      });
      localStorage.setItem("questions", JSON.stringify(newQuestions));
      let scopedUsers = users();
      let newUsers = {
        ...scopedUsers,
        [authedUser]: {
          ...scopedUsers[authedUser],
          questions: scopedUsers[authedUser].questions.concat([
            formattedQuestion.id,
          ]),
        },
      };
      localStorage.setItem("users", JSON.stringify(newUsers));
      res(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let scopedUsers = users();
      scopedUsers = {
        ...scopedUsers,
        [authedUser]: {
          ...scopedUsers[authedUser],
          answers: {
            ...scopedUsers[authedUser].answers,
            [qid]: answer,
          },
        },
      };
      localStorage.setItem("users", JSON.stringify(scopedUsers));

      let scopedQuestions = questions();

      scopedQuestions = {
        ...scopedQuestions,
        [qid]: {
          ...scopedQuestions[qid],
          [answer]: {
            ...scopedQuestions[qid][answer],
            votes: scopedQuestions[qid][answer].votes.concat([authedUser]),
          },
        },
      };
      localStorage.setItem("questions", JSON.stringify(scopedQuestions));

      res();
    }, 500);
  });
}

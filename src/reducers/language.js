import languages from '../languages';

const languageReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE': {
      return languages[action.language];
    }
    default: {
      return languages.en;
    }
  }
};

export default languageReducer;

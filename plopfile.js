const R = require("ramda");

const requireField = fieldName => {
  return value => {
    if (String(value).length === 0) {
      return fieldName + " is required";
    }
    return true;
  };
};

const capitalize = R.compose(
  R.join(""),
  R.juxt([
    R.compose(
      R.toUpper,
      R.head
    ),
    R.tail
  ])
);

const capitalizeOrNull = R.ifElse(R.equals(null), R.identity, capitalize);

const formatName = (name, isScreen = false) => {
  return isScreen ? capitalizeOrNull(name) + "Screen" : capitalizeOrNull(name);
};

const handlePath = (text, isScreen = false) => {
  let parts = R.split("/", text);
  let length = R.length(parts);
  if (R.length(parts) > 1) {
    let result = "";
    for (var i = 0; i < length - 1; i++) {
      result += R.toLower(parts[i]) + "/";
    }
    return result + formatName(parts[length - 1], isScreen);
  } else {
    return formatName(text, isScreen);
  }
};

const handleStyle = (text, isScreen = false) => {
  let parts = R.split("/", text);
  let length = R.length(parts);
  if (R.length(parts) > 1) {
    let result = "";
    for (var i = 0; i < length - 1; i++) {
      result += parts[i] + "/";
    }
    let name = formatName(parts[length - 1], isScreen);
    return result + `styles/${name}`;
  } else {
    let name = formatName(text, isScreen);
    return `styles/${name}`;
  }
};

const handleName = (text, isScreen = false) => {
  let parts = R.split("/", text);
  let length = R.length(parts);
  if (R.length(parts) > 1) {
    return formatName(parts[length - 1], isScreen);
  } else {
    return formatName(text, isScreen);
  }
};

const handleRawPath = text => {
  let parts = R.split("/", text);
  let length = R.length(parts);
  if (R.length(parts) > 1) {
    let result = "";
    for (var i = 0; i < length - 1; i++) {
      result += R.toLower(parts[i]) + "/";
    }
    return result;
  } else {
    return "";
  }
};

module.exports = plop => {
  plop.setHelper("pathCase", function(text) {
    return handleRawPath(text);
  });

  plop.setHelper("componentPathCase", function(text) {
    return handlePath(text, false);
  });
  plop.setHelper("stylePathCase", function(text) {
    return handleStyle(text, false);
  });
  plop.setHelper("nameCase", function(text) {
    return handleName(text, false);
  });

  plop.setHelper("screenPathCase", function(text) {
    return handlePath(text, true);
  });
  plop.setHelper("screenStylePathCase", function(text) {
    return handleStyle(text, true);
  });
  plop.setHelper("screenNameCase", function(text) {
    return handleName(text, true);
  });

  plop.setGenerator("component", {
    description: "Create a reusable component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
        validate: requireField("name")
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/Components/{{componentPathCase name}}.js",
        templateFile: "plop-templates/Component/Component.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Components/{{stylePathCase name}}.styles.js",
        templateFile: "plop-templates/Component/Component.styles.js.hbs",
        skipIfExists: true
      }
    ]
  });

  plop.setGenerator("container", {
    description: "Create a reusable container",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your container name?",
        validate: requireField("name")
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/Containers/{{componentPathCase name}}.js",
        templateFile: "plop-templates/Container/Container.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Containers/{{stylePathCase name}}.styles.js",
        templateFile: "plop-templates/Container/Container.styles.js.hbs",
        skipIfExists: true
      }
    ]
  });

  plop.setGenerator("screen", {
    description: "Create a reusable screen",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your screen name?",
        validate: requireField("name")
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/Screens/{{screenPathCase name}}.js",
        templateFile: "plop-templates/Screen/Screen.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Screens/{{screenStylePathCase name}}.styles.js",
        templateFile: "plop-templates/Screen/Screen.styles.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Screens/{{pathCase name}}index.js",
        templateFile: "plop-templates/injectable-index.js.hbs",
        skipIfExists: true
      },
      {
        type: "append",
        path: "src/Screens/{{pathCase name}}index.js",
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{screenNameCase name}} from './{{screenNameCase name}}';`
      },
      {
        type: "append",
        path: "src/Screens/{{pathCase name}}index.js",
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{screenNameCase name}},`
      }
    ]
  });
};

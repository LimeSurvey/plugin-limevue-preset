module.exports = [
    {
      type: 'input',
      name: 'appname',
      message: 'The main name of your limesurvey component.',
      validate: input => !!input,
      default: 'mynewlscomponent'
    },
  ]
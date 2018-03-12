module.exports = {
  helpers: {
    escape: function(value) {
      return value.replace(/'/g, '&apos;');
    }
  },
  prompts: {
    name: {
      'type': 'string',
      'required': true,
      'message': 'Landing name'
    }
  },
  completeMessage: '{{#inPlace}}To get started:\n\n  npm install # Or yarn\n  npm run dev{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install # Or yarn\n  npm run dev{{/inPlace}}'
};

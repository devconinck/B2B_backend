const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'] });
//adding different keywords and intents
manager.addDocument('en','hello','greeting');
manager.addDocument('en','hi','greeting');
manager.addDocument('en','hey there','greeting');
manager.addDocument('en','good morning','greeting');
manager.addDocument('en','good afternoon','greeting');
manager.addDocument('en','yow','greeting');

manager.addDocument('en','help', 'help');
manager.addDocument('en','Help me', 'help');
 
manager.addDocument('en','What can you do', 'info');
manager.addDocument('en','How can you help', 'info');
manager.addDocument('en','Tell me what to do', 'info');
manager.addDocument('en','Tell me what you do', 'info');


// Answers for different intents
manager.addAnswer('en','greeting','Hi, I am DelBot, your virtual assistent!');
manager.addAnswer('en','greeting','Hi, how can I help');
manager.addAnswer('en','greeting',"What's up? I'm  Delbot, your virtual assistent!");

manager.addAnswer('en','help','How can I help');

manager.addAnswer('en','info','I can help with FAQ\'s and provice information about invoices.');



module.exports = manager;
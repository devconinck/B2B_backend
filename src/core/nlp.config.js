const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'] });
/****************
 *   GREETINGS  *
 ***************/
manager.addDocument('en','hello','greeting');
manager.addDocument('en','hello there','greeting');
manager.addDocument('en','hi','greeting');
manager.addDocument('en','hey there','greeting');
manager.addDocument('en','good morning','greeting');
manager.addDocument('en','good afternoon','greeting');
manager.addDocument('en','yow','greeting');

// common typo's
manager.addDocument('en', 'helo', 'greeting');  // Common typo for "hello"
manager.addDocument('en', 'hlelo', 'greeting'); // Typo variation for "hello"
manager.addDocument('en', 'heyllo', 'greeting'); // Typo variation for "hello"
manager.addDocument('en', 'hii', 'greeting');   // Common typo for "hi"
manager.addDocument('en', 'hie', 'greeting');   // Typo variation for "hi"
manager.addDocument('en', 'hy', 'greeting');    // Typo variation for "hi"
manager.addDocument('en', 'hey tehre', 'greeting'); // Typo for "hey there"
manager.addDocument('en', 'hey thr', 'greeting'); // Typo for "hey there"
manager.addDocument('en', 'hey tehre', 'greeting'); // Typo for "hey there"
manager.addDocument('en', 'good mroning', 'greeting'); // Typo for "good morning"
manager.addDocument('en', 'god morning', 'greeting'); // Typo for "good morning"
manager.addDocument('en', 'good morinng', 'greeting'); // Typo for "good morning"
manager.addDocument('en', 'good afternon', 'greeting'); // Typo for "good afternoon"
manager.addDocument('en', 'good afternnon', 'greeting'); // Typo for "good afternoon"
manager.addDocument('en', 'godo afternoon', 'greeting'); // Typo for "good afternoon"
manager.addDocument('en', 'yoow', 'greeting');  // Typo for "yow"
manager.addDocument('en', 'ywo', 'greeting');   // Typo for "yow"
manager.addDocument('en', 'youw', 'greeting');  // Typo for "yow"
manager.addDocument('en', 'gow', 'greeting');   // Typo that might sound like "yow"
manager.addDocument('en', 'yoww', 'greeting');  // Typo for "yow"

/****************
 *     HELP     *
 ***************/
manager.addDocument('en','help', 'help');
manager.addDocument('en','Help me', 'help');

/****************
 *     INFO     *
 ***************/
manager.addDocument('en','What can you do', 'info');
manager.addDocument('en','How can you help', 'info');
manager.addDocument('en','Tell me what to do', 'info');
manager.addDocument('en','Tell me what you do', 'info');

/********************
 *  INVOICE STATUS  *
 *******************/
// Adding phrases to check invoice status
manager.addDocument('en', "Can you show me the current status of my invoices?", 'checkInvoiceStatus');
manager.addDocument('en', "I need to check the latest status on my invoices.", 'checkInvoiceStatus');
manager.addDocument('en', "Show me the status of my recent invoices.", 'checkInvoiceStatus');
manager.addDocument('en', "How to view the status of my outstanding invoices?", 'checkInvoiceStatus');
manager.addDocument('en', "What's the status of my latest invoice?", 'checkInvoiceStatus');
manager.addDocument('en', "Tell me how to check what's pending on my invoices.", 'checkInvoiceStatus');
manager.addDocument('en', "How do I find out about my invoice details?", 'checkInvoiceStatus');
manager.addDocument('en', "Can you help me access my invoice records?", 'checkInvoiceStatus');
manager.addDocument('en', "I want to review the status of my invoices, how do I do that?", 'checkInvoiceStatus');
manager.addDocument('en', "Please guide me on how to check my invoice status.", 'checkInvoiceStatus');
manager.addDocument('en', "How to get updates on my invoice payments?", 'checkInvoiceStatus');
manager.addDocument('en', "I'm looking to see the progress of my invoice payments, how can I do that?", 'checkInvoiceStatus');
manager.addDocument('en', "Guide me through checking my invoice status.", 'checkInvoiceStatus');
manager.addDocument('en', "Where do I go to see my invoice payment status?", 'checkInvoiceStatus');

manager.addAnswer('en', 'checkInvoiceStatus', "You can view the status and history of your invoices in your account dashboard under the 'Invoices' section.");
manager.addAnswer('en', 'checkInvoiceStatus', "To check your invoice status, please log into your account and navigate to the 'Invoices' tab where you can see all the details.");
manager.addAnswer('en', 'checkInvoiceStatus', "You can easily check the status of your invoices by accessing the 'My Invoices' area on our website.");
manager.addAnswer('en', 'checkInvoiceStatus', "Your invoice status and history are available online. Just visit the 'Invoices' section after logging into your account.");
manager.addAnswer('en', 'checkInvoiceStatus', "For details on your invoices' status and history, please go to the 'Invoices' section in your profile on our portal.");

manager.addDocument('en', "Where can I find my invoice history?", 'checkInvoiceHistory');
manager.addDocument('en', "How can I access the records of my past invoices?", 'checkInvoiceHistory');
manager.addDocument('en', "Is there a way to see all my previous invoices?", 'checkInvoiceHistory');
manager.addDocument('en', "Can I see the history of my payments and invoices?", 'checkInvoiceHistory');
manager.addDocument('en', "What is the process to check my invoice history on your platform?", 'checkInvoiceHistory');
manager.addDocument('en', "Help me understand where to find my past invoices.", 'checkInvoiceHistory');



// Answers for different intents
manager.addAnswer('en','greeting','Hi, I am DelBot, your virtual assistent!');
manager.addAnswer('en','greeting','Hi, how can I help');
manager.addAnswer('en','greeting',"What's up? I'm  Delbot, your virtual assistent!");
// Adding more responses to the greeting intent
manager.addAnswer('en', 'greeting', 'Hello! How can I assist you today?');
manager.addAnswer('en', 'greeting', 'Greetings! What can I do for you?');
manager.addAnswer('en', 'greeting', 'Good day! How may I help you?');
manager.addAnswer('en', 'greeting', 'Hey! Ready to help, just ask.');
manager.addAnswer('en', 'greeting', 'Hello there! Need any assistance?');
manager.addAnswer('en', 'greeting', 'Hi! What brings you here today?');
manager.addAnswer('en', 'greeting', 'Welcome! How can I make your day better?');
manager.addAnswer('en', 'greeting', 'Good to see you! What can I help you with today?');
manager.addAnswer('en', 'greeting', "Hey, how’s it going? Anything I can help with?");
manager.addAnswer('en', 'greeting', "Hi there! How’s everything?");
manager.addAnswer('en', 'greeting', 'Hello! Anything particular you need help with today?');
manager.addAnswer('en', 'greeting', 'Welcome back! How can I assist you further?');
manager.addAnswer('en', 'greeting', 'Good to have you here! How can I serve you today?');
manager.addAnswer('en', 'greeting', "Hi! Let me know if there's anything I can do for you.");
manager.addAnswer('en', 'greeting', "Hello! I’m here to help, just tell me what you need.");
manager.addAnswer('en', 'greeting', "Hey there! Looking for help? You’re in the right place.");
manager.addAnswer('en', 'greeting', 'Welcome! What information are you seeking today?');
manager.addAnswer('en', 'greeting', 'Hello! Feel free to ask me anything.');
manager.addAnswer('en', 'greeting', 'Hi, how are things? Let me know if you need help.');
manager.addAnswer('en', 'greeting', 'Good day to you! What assistance do you require?');


manager.addAnswer('en','help','How can I help');

manager.addAnswer('en','info','I can help with FAQ\'s and provice information about invoices.');



module.exports = manager;
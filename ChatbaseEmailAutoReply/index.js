function autoReply() {
  // Get the most recent thread in the inbox
  var threads = GmailApp.getInboxThreads(0, 5);
  // console.log("Threads: ",threads)
  for (var j = 0; j < threads.length; j++) {
    // Only proceed if the thread has unread messages
    let messagesTexts = [];
    var messages = threads[j].getMessages();
    // Iterate over the messages
    console.log("Messages General: ", messages);
    for (var i = 0; i < messages.length; i++) {
      // Only proceed if the message is unread
      console.log(
        "messages: ",
        messages[i].isUnread(),
        "NUmber: ",
        i,
        "Length: ",
        messages.length,
        "IS LAST: ",
        messages.length - 1 == i
      );
      if (messages[i].isUnread() && messages.length - 1 == i) {
        // Get the plain body of the message
        messagesTexts.push(messages[i].getPlainBody());
        console.log("LastMessagesBody: ", messagesTexts);

        // Get response from Chatbase
        var chatbaseResponse = getChatbaseResponse(messagesTexts);
        console.log("chatbaseResponse: ", chatbaseResponse);

        // Draft a reply with the Chatbase response
        messages[i].createDraftReplyAll(chatbaseResponse);

        // Mark the message as read after replying
        messages[i].markRead();
      } else if (messages[i].isUnread()) {
        messagesTexts.push(messages[i].getPlainBody());
        console.log("messagesBody: ", messagesTexts);
      }
    }
  }
}

function getChatbaseResponse(texts) {
  var messagesContent = texts.map(function (item) {
    return {
      content: item,
      role: "user",
    };
  });
  var url = "https://www.chatbase.co/api/v1/chat"; // Replace with actual endpoint
  var data = {
    messages: messagesContent,
    chatbotId: "pX3HF7VtsPkKldTrB3OxO",
    stream: false,
    temperature: 0,
    model: "gpt-3.5-turbo",
  };
  var options = {
    method: "POST",
    headers: {
      Authorization: "Bearer 73daa897-77be-4665-9224-232fc728193a",
    },
    payload: JSON.stringify(data),
  };

  // Send a POST request to the Chatbase API
  var response = UrlFetchApp.fetch(url, options);

  // Parse the JSON response
  var json = JSON.parse(response.getContentText());

  // Return the generated text
  return json.text;
}

function createTrigger() {
  // Trigger autoReply function every 5 minutes
  ScriptApp.newTrigger("autoReply").timeBased().everyMinutes(1).create();
}

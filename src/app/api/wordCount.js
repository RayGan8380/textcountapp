// wordCount.js

export const countWords = (fileContent) => {
    const chattiestUsers = {};
    const lines = fileContent.split('\n');
  
    for (const line of lines) {
      if (line.startsWith('<') && line.includes('>')) {
        const username = line.substring(1, line.indexOf('>')).trim();
        const words = line.split(/\s+/).filter((word) => word !== '').length;
  
        if (chattiestUsers.hasOwnProperty(username)) {
          chattiestUsers[username] += words;
        } else {
          chattiestUsers[username] = words;
        }
      }
    }
  
    const sortedUsers = Object.entries(chattiestUsers).sort((a, b) => b[1] - a[1]);
  
    return sortedUsers;
  };
  
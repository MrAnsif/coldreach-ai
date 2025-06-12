export const getTemplate = (type) => {
  const templates = {
    email: `Write a {tone} email from {senderName} ({senderTitle} at {senderCompany}) to {recipientName} ({recipientTitle} at {recipientCompany}).
    Context: {context}
    Key triggers: {triggers}
    CTA: {cta}
    Length: {length}
    Format: {format}`,
    
    linkedin: `Compose a {tone} LinkedIn message from {senderName} to {recipientName}.
    Context: {context}
    Connection: {connection}
    CTA: {cta}
    Length: {length}
    Format: {format}`,
    
    twitter: `Create a {tone} Twitter DM from {senderName} to {recipientName}.
    Context: {context}
    CTA: {cta}
    Length: {length}`
  };
  
  return templates[type] || templates.email;
};
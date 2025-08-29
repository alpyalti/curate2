import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ArrowLeft, Send } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: 'user' | 'seller';
  message: string;
  timestamp: string;
  senderName: string;
}

interface MessageDetail {
  id: string;
  subject: string;
  participants: string[];
  lastMessageDate: string;
  messages: ChatMessage[];
}

const mockMessageDetail: MessageDetail = {
  id: "1",
  subject: "Other question",
  participants: ["Kadir Alp Yaltı", "Reem Mall", "Beauty Solutions"],
  lastMessageDate: "Aug 21, 2025, 2:33 PM",
  messages: [
    {
      id: "1",
      sender: "user",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      timestamp: "Aug 21, 2025, 2:33 PM",
      senderName: "ME"
    },
    {
      id: "2", 
      sender: "seller",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      timestamp: "Aug 21, 2025, 3:15 PM",
      senderName: "Beauty Solutions"
    },
    {
      id: "3",
      sender: "user", 
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timestamp: "Aug 21, 2025, 3:45 PM",
      senderName: "ME"
    },
    {
      id: "4",
      sender: "seller",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      timestamp: "Aug 21, 2025, 4:20 PM", 
      senderName: "Beauty Solutions"
    }
  ]
};

export function MessageDetailPage() {
  const { messageId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");

  const handleBack = () => {
    navigate("/profile/messages");
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">Home</a>
            <span>/</span>
            <a href="/profile" className="hover:text-foreground">Profile</a>
            <span>/</span>
            <a href="/profile/messages" className="hover:text-foreground">Messages</a>
            <span>/</span>
            <span className="text-foreground font-medium">Message Detail</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Messages
            </Button>
          </div>

          <div className="space-y-2">
            <h1 className="text-lg md:text-2xl font-bold text-gray-900">
              {mockMessageDetail.subject} - {mockMessageDetail.lastMessageDate}
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Participants: {mockMessageDetail.participants.join(", ")}
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {/* Chat Messages */}
            <div className="p-6 space-y-4">
              {mockMessageDetail.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs md:max-w-lg lg:max-w-xl ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    {/* Sender Name */}
                    <div className={`text-xs text-gray-500 mb-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {message.senderName}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className="relative">
                      <div
                        className={`px-4 py-3 text-sm ${
                          message.sender === 'user'
                            ? 'bg-black text-white rounded-2xl rounded-tr-md'
                            : 'bg-gray-100 text-gray-900 rounded-2xl rounded-tl-md'
                        }`}
                      >
                        <div className="mb-2">{message.message}</div>
                        
                        {/* Timestamp and Delivery Info inside bubble */}
                        <div className={`text-xs ${message.sender === 'user' ? 'text-gray-300 text-right' : 'text-gray-500 text-left'} space-y-0.5`}>
                          <div>{message.timestamp}</div>
                          {message.sender === 'user' && (
                            <div>Sent to Beauty Solutions</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Area */}
            <div className="border-t p-6 space-y-4">
              <div>
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="min-h-20 resize-none"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-center">
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-8 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  ADD MESSAGE
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MessageDetailPage;

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Send,
  Mic,
  User,
  Bot,
  ChevronDown,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [theme, setTheme] = useState("light");

  const predefinedPrompts = [
    {
      title: "Write an article",
      description: "Create an engaging article on any topic",
      prompt: "Write an article about ",
      category: "Writing",
    },
    {
      title: "Analyze data",
      description: "Help with data analysis and insights",
      prompt: "Help me analyze this data: ",
      category: "Analysis",
    },
    {
      title: "Code review",
      description: "Review and improve your code",
      prompt: "Review this code: ",
      category: "Development",
    },
    {
      title: "Draft an email",
      description: "Help composing professional emails",
      prompt: "Help me write an email about ",
      category: "Writing",
    },
    {
      title: "Explain a concept",
      description: "Get clear explanations on any topic",
      prompt: "Explain this concept: ",
      category: "Learning",
    },
    {
      title: "Brainstorm ideas",
      description: "Generate creative ideas and solutions",
      prompt: "Help me brainstorm ideas for ",
      category: "Creativity",
    },
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newUserMessage = {
        role: "user",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, newUserMessage]);

      setTimeout(() => {
        const aiResponse = {
          role: "assistant",
          content: `This is a simulated response to jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj: "${inputMessage}"`,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);

      setInputMessage("");
    }
  };

  const handlePromptSelect = (prompt) => {
    setInputMessage(prompt.prompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Card className="w-full max-h-[60%]  overflow-y-scroll hide-scrollbar">
      <div
        className={`flex flex-col  ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        {/* Header */}
        <div
          className={`border-b ${
            theme === "dark"
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          } py-4 px-6`}
        >
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Nuzion AI Chat Assistant</h1>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 overflow-y-scroll hide-scrollbar py-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {messages.length === 0 && <div className="text-center py-20"></div>}
            {messages.map((message: any, index: any) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                )}
                <div className="flex flex-col max-w-[80%] lg:max-w-[70%]">
                  <div
                    className={`rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-white"
                        : theme === "dark"
                        ? "bg-gray-800"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    {message.content}
                  </div>
                  <span
                    className={`text-xs mt-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    } ${message.role === "user" ? "text-right" : "text-left"}`}
                  >
                    {message.timestamp}
                  </span>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center shrink-0">
                    <User className="w-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div
          className={`border-t ${
            theme === "dark"
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          } p-4`}
        >
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`${
                      theme === "dark"
                        ? "border-gray-700 hover:bg-gray-700"
                        : ""
                    }`}
                  >
                    Select Prompt <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={`w-64 ${
                    theme === "dark" ? "bg-gray-800 border-gray-700" : ""
                  }`}
                >
                  {predefinedPrompts.map((prompt, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => handlePromptSelect(prompt)}
                      className={`cursor-pointer ${
                        theme === "dark" ? "hover:bg-gray-700" : ""
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="font-medium">{prompt.title}</div>
                        <div
                          className={`text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {prompt.description}
                        </div>
                        <div
                          className={`text-xs ${
                            theme === "dark" ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          {prompt.category}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                disabled={true}
                className={`w-full pr-24 py-6 text-lg ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    : ""
                }`}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className={theme === "dark" ? "hover:bg-gray-700" : ""}
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className={
                    theme === "dark" ? "bg-primary hover:bg-primary/90" : ""
                  }
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;

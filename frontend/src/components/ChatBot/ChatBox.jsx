import React, { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Image, Plus, History, Trash2 } from "lucide-react";

export const ChatBox = () => {
  const [conversations, setConversations] = useState([
    { id: 1, name: "Đoạn chat 1", messages: [] },
    { id: 2, name: "Đoạn chat 2", messages: [] },
  ]);
  const [currentId, setCurrentId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Xin chào! Tôi là Trợ lý Sức khỏe Tim Mạch AI ❤️. Hãy nhập thông tin hoặc câu hỏi của bạn để bắt đầu chẩn đoán nhé!",
    },
    {
      id: 2,
      sender: "user",
      text: "Tôi muốn kiểm tra nguy cơ mắc bệnh tim.",
    },
    {
      id: 3,
      sender: "bot",
      text: "Vui lòng cung cấp các thông số cơ bản như: tuổi, giới tính, huyết áp, cholesterol, nhịp tim tối đa (thalach), và độ chênh ST (oldpeak).",
    },
  ]);

  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() && !image) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
      image: image,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setImage(null);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "🔍 Phân tích: Dựa trên dữ liệu bạn cung cấp, nguy cơ mắc bệnh tim của bạn **ở mức trung bình**.\n💡 Khuyến nghị: Duy trì chế độ ăn lành mạnh, tập thể dục đều đặn và kiểm tra định kỳ.\n\nNguồn: [WHO Heart Health](https://www.who.int/health-topics/cardiovascular-diseases)",
        },
      ]);
    }, 1000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleNewChat = () => {
    const newChat = { id: Date.now(), name: `Đoạn chat mới`, messages: [] };
    setConversations((prev) => [...prev, newChat]);
    setCurrentId(newChat.id);
    setMessages([]);
  };

  const handleDeleteChat = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentId === id) {
      setCurrentId(null);
      setMessages([]);
    }
  };

  const handleSelectChat = (id) => {
    setCurrentId(id);
    const chat = conversations.find((c) => c.id === id);
    setMessages(chat?.messages || []);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col p-6 shadow-lg">
        <div className="flex items-center gap-2 text-red-600 mb-8">
          <Bot className="w-6 h-6" />
          <h1 className="text-xl font-bold">HeartCare AI</h1>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg transition"
          >
            <Plus size={16} /> Cuộc trò chuyện mới
          </button>

          {conversations.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                currentId === chat.id
                  ? "bg-red-100 border border-red-300"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              <div
                className="flex items-center gap-2 flex-1"
                onClick={() => handleSelectChat(chat.id)}
              >
                <History size={16} className="text-gray-700" />
                <span className="truncate text-sm text-gray-800">
                  {chat.name}
                </span>
              </div>
              <Trash2
                size={14}
                className="text-gray-400 hover:text-red-500"
                onClick={() => handleDeleteChat(chat.id)}
              />
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mt-6 text-xs text-gray-400 text-center">
          © 2025 HeartCare AI
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-l-3xl shadow-2xl m-3">
        {/* Header */}
        <div className="flex items-center gap-2 border-b p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-tl-3xl">
          <Bot className="w-5 h-5" />
          <h2 className="font-semibold text-lg">Trợ lý Sức khỏe Tim Mạch AI</h2>
        </div>

        {/* Nội dung chat */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-gray-400 text-center mt-10 italic">
              💬 Chưa có tin nhắn. Hãy bắt đầu chẩn đoán nhé!
            </div>
          ) : (
            messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end ${
                    isUser ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  {!isUser && (
                    <div className="bg-red-100 p-2 rounded-full mr-2">
                      <Bot className="w-4 h-4 text-red-600" />
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line shadow-sm ${
                      isUser
                        ? "bg-rose-200 text-gray-800 rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="uploaded"
                        className="rounded-xl border border-gray-300 w-64 h-auto mb-2"
                      />
                    )}
                    <p>{msg.text}</p>
                  </div>

                  {isUser && (
                    <div className="bg-gray-100 p-2 rounded-full ml-2">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Ô nhập tin nhắn */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-3 border-t p-4 bg-white rounded-b-3xl"
        >
          <label className="cursor-pointer text-gray-500 hover:text-red-600 transition">
            <Image size={22} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập dữ liệu hoặc câu hỏi sức khỏe của bạn..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-red-300 outline-none transition"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-5 py-2 rounded-full flex items-center gap-1 shadow-sm transition"
          >
            <Send size={16} /> Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

//bo 5-9 12-29 53-64

import React, { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Image, Plus, History, Trash2 } from "lucide-react";

export const ChatBox = () => {
  const [conversations, setConversations] = useState([
    { id: 1, name: "Đoạn chat 1", messages: [] },
    { id: 2, name: "Đoạn chat 2", messages: [] },
  ]);
  const [currentId, setCurrentId] = useState(null);

  //data mẫu ban đầu
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

  // Tự động cuộn khi có tin nhắn mới
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

    // Giả lập phản hồi từ AI (phân tích sức khỏe tim mạch)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Phân tích: Dựa trên dữ liệu bạn cung cấp, nguy cơ mắc bệnh tim của bạn **ở mức trung bình**. Bạn nên duy trì chế độ ăn lành mạnh, tập thể dục đều đặn và kiểm tra định kỳ.\n\nNguồn: [WHO Heart Health](https://www.who.int/health-topics/cardiovascular-diseases).",
        },
      ]);
    }, 1000);
  };

  // Upload ảnh
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  //  Tạo cuộc hội thoại mới
  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: `Đoạn chat `,
      messages: [],
    };
    setConversations((prev) => [...prev, newChat]);
    setCurrentId(newChat.id);
    setMessages([]);
  };

  //  Xóa cuộc hội thoại
  const handleDeleteChat = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentId === id) {
      setCurrentId(null);
      setMessages([]);
    }
  };

  //  Chọn hội thoại để xem
  const handleSelectChat = (id) => {
    setCurrentId(id);
    const chat = conversations.find((c) => c.id === id);
    setMessages(chat?.messages || []);
  };

  return (
    <div className="flex h-screen bg-gray-100 mb-3 mt-3">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col p-5 mb-3 mt-3">
        <div className="flex items-center gap-2 text-red-600 mb-8">
          <Bot className="w-6 h-6" />
          <h1 className="text-xl font-bold">HeartCare AI</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div
            onClick={handleNewChat}
            className="flex items-center gap-2 text-red-600 cursor-pointer mb-4 hover:text-red-700"
          >
            <Plus size={16} /> Cuộc trò chuyện mới
          </div>

          <ul className="space-y-2">
            {conversations.map((chat) => (
              <li
                key={chat.id}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer border ${
                  currentId === chat.id
                    ? "bg-blue-100 border-blue-400"
                    : "hover:bg-gray-100 border-transparent"
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
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4 mt-6 text-xs text-gray-400">
          © 2025 HeartCare AI
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col bg-white rounded-l-3xl shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-2 border-b p-4 ">
          <Bot className="text-red-600" />
          <h2 className="font-semibold text-gray-800 text-lg">
            Trợ lý Sức khỏe Tim Mạch AI
          </h2>
        </div>

        {/* Nội dung chat */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-gray-400 text-center mt-10 italic">
              Chưa có tin nhắn. Hãy bắt đầu chẩn đoán nhé!
            </div>
          ) : (
            messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isUser ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  {!isUser && <Bot className="w-5 h-5 mt-1 text-red-600" />}
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl shadow text-sm whitespace-pre-line ${
                      isUser
                        ? "bg-pink-100 text-gray-800 rounded-br-none"
                        : "bg-blue-100 text-gray-800 rounded-bl-none"
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
                    <User className="w-5 h-5 ml-2 mt-1 text-gray-600" />
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
          className="flex items-center gap-3 border-t p-4 bg-white"
        >
          <label className="cursor-pointer text-gray-500 hover:text-red-600">
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
            placeholder="Nhập câu hỏi hoặc dữ liệu sức khỏe của bạn..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-red-300 outline-none"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-1"
          >
            <Send size={16} /> Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

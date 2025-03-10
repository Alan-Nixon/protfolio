"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { IContact } from "@/interfaces_types/interfaces_types";
import { getMessages, sendReply } from "@/app/(utils)/functions";

export default function ContactPage() {
  const [messages, setMessages] = useState<IContact[]>([]);

  const [replyTo, setReplyTo] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    getMessages().then(({ data }) => {
      setMessages(data);
    });
  }, []);

  const handleReply = (email: string) => {
    setReplyTo(email);
    setReplyMessage("");
    setShowReplyForm(true);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    sendReply({replyTo,replyMessage}).then(() => {
      setReplyTo("");
      setReplyMessage("");
      setShowReplyForm(false);
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

      <div className="space-y-6">
        {messages.map((message) => (
          <div key={message._id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{message.name}</h2>
                <p className="text-gray-600">{message.email}</p>
              </div>
              <p className="text-sm text-gray-500">
                {formatDate(message.createdAt + "")}
              </p>
            </div>
            <p className="text-gray-700 mb-4">{message.message}</p>
            <button
              onClick={() => handleReply(message.email)}
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Reply
            </button>
          </div>
        ))}
      </div>

      {showReplyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Reply to Message</h2>
              <button
                onClick={() => setShowReplyForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSendReply}>
              <div className="mb-4">
                <label
                  htmlFor="replyTo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  To
                </label>
                <input
                  type="email"
                  id="replyTo"
                  value={replyTo}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="replyMessage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="replyMessage"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Send Reply
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
